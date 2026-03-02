import "dotenv/config";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Pool } from "pg";
import pgvector from "pgvector/pg";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!DATABASE_URL) {
  console.warn("DATABASE_URL is not set. Postgres connection will fail without it.");
}

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set. Gemini API calls will fail without it.");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Register pgvector types for each new connection
pool.on("connect", async (client) => {
  await pgvector.registerTypes(client);
});

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function getEmbedding(text) {
  const response = await ai.models.embedContent({
   model: "models/gemini-embedding-001",
    contents: text,
  });

  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("No embedding values returned from Gemini.");
  }

  return embedding;
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, " ");
}

function buildCombinedText(item) {
  const parts = [];

  if (item.title) parts.push(item.title);
  if (item.summary) parts.push(item.summary);
  if (item.content) parts.push(item.content);

  const combined = stripHtml(parts.join("\n\n"));
  // Limit to 1000 characters
  return combined.slice(0, 1000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

async function loadData() {
  const dataPath = new URL("./museum_data_cleaned.json", import.meta.url);
  const raw = await readFile(dataPath, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("data.json must contain an array of items");
  }

  return parsed;
}

async function processBatch(items, batchIndex, totalBatches) {
  console.log(`Processing batch ${batchIndex + 1}/${totalBatches} (size: ${items.length})`);

  for (const item of items) {
    const combinedText = buildCombinedText(item);

    if (!combinedText) {
      console.log(`Skipping item ${item.id ?? "(no id)"}: no text content`);
      continue;
    }

    try {
      const embedding = await getEmbedding(combinedText);
      const vectorParam = pgvector.toSql(embedding);

      const sql = `
        INSERT INTO items (id, type, title, summary, image_url, content, embedding)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO NOTHING
      `;

      const values = [
        item.id,
        item.type,
        item.title,
        item.summary,
        item.image_url,
        item.content,
        vectorParam,
      ];

      const result = await pool.query(sql, values);

      if (result.rowCount === 0) {
        console.log(`Skipped existing item ${item.id}`);
      } else {
        console.log(`Inserted item ${item.id}`);
      }
    } catch (error) {
      console.error(`Error processing item ${item.id}:`, error);
    }
  }
}

async function main() {
  console.log("Starting ingest...");

  try {
    const items = await loadData();

    const totalBatches = Math.ceil(items.length / BATCH_SIZE);

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      const batchIndex = Math.floor(i / BATCH_SIZE);

      await processBatch(batch, batchIndex, totalBatches);

      if (i + BATCH_SIZE < items.length) {
        console.log(`Waiting ${BATCH_DELAY_MS}ms before next batch...`);
        await sleep(BATCH_DELAY_MS);
      }
    }

    console.log("Ingest complete.");
  } catch (error) {
    console.error("Fatal error during ingest:", error);
  } finally {
    await pool.end();
    console.log("Postgres pool closed.");
  }
}

// Run the script when executed directly
main();

