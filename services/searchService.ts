import { GoogleGenAI, Type } from "@google/genai";
import { SectionType, SectionData, SearchResult } from '../types';
import * as DATA from '../constants';
import { MOMA_DATA } from '../data/momaData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate consistent placeholder images based on a seed string
const getImage = (seed: string, width = 600, height = 400) => 
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

// Define the response schema for Gemini
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            enum: [
              'OVERVIEW',
              'ARTIST_BIO',
              'THEMATIC_EXPLORATIONS',
              'RELATED_ART',
              'HISTORY',
              'ON_VIEW',
              'BOOKS'
            ]
          },
          title: { type: Type.STRING },
          content: {
            type: Type.OBJECT,
            properties: {
              // Overview / History Text
              text: { type: Type.STRING },
              intro: { type: Type.STRING },
              longText: { type: Type.STRING },
              
              // Artist Bio
              name: { type: Type.STRING },
              dates: { type: Type.STRING },
              description: { type: Type.STRING },
              newOnView: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    year: { type: Type.STRING },
                    gallery: { type: Type.STRING },
                    image: { type: Type.STRING }
                  }
                }
              },
              image: { type: Type.STRING },

              // Related Art
              relatedDescription: { type: Type.STRING },
              categories: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                     name: { type: Type.STRING },
                     count: { type: Type.NUMBER },
                     description: { type: Type.STRING }
                  }
                }
              },
              artists: {
                type: Type.ARRAY,
                items: {
                   type: Type.OBJECT,
                   properties: { 
                     name: { type: Type.STRING },
                     image: { type: Type.STRING }
                   }
                }
              },
              artworks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    artist: { type: Type.STRING },
                    title: { type: Type.STRING },
                    year: { type: Type.STRING },
                    status: { type: Type.STRING },
                    highlight: { type: Type.BOOLEAN },
                    image: { type: Type.STRING }
                  }
                }
              },

              // History Periods
              periods: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    count: { type: Type.NUMBER },
                    text: { type: Type.STRING }
                  }
                }
              },

              // On View
              floors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    floor: { type: Type.STRING },
                    count: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  }
                }
              },
              exhibitions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    dates: { type: Type.STRING },
                    image: { type: Type.STRING }
                  }
                }
              },

              // Thematic & Books (Generic Items)
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    count: { type: Type.STRING },
                    description: { type: Type.STRING },
                    author: { type: Type.STRING },
                    year: { type: Type.STRING },
                    image: { type: Type.STRING }
                  }
                }
              }
            }
          }
        },
        required: ['type', 'content']
      }
    }
  },
  required: ['sections']
};

const mapGeminiToSectionData = (geminiSection: any, query: string): SectionData => {
  const { type, content, title } = geminiSection;
  const id = `${type.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
  let finalContent: any = {};

  // Inject images if not provided by data, and format content based on type
  switch (type) {
    case SectionType.OVERVIEW:
      finalContent = content.text || content.description || "No overview available.";
      break;

    case SectionType.ARTIST_BIO:
      finalContent = {
        name: content.name,
        dates: content.dates,
        description: content.description,
        image: content.image || getImage(`${content.name} portrait`, 300, 300),
        newOnView: (content.newOnView || []).map((item: any) => ({
          ...item,
          image: item.image || getImage(`${item.title} art`, 200, 200)
        }))
      };
      break;

    case SectionType.RELATED_ART:
      finalContent = {
        description: content.relatedDescription || content.description,
        categories: content.categories || [],
        artists: (content.artists || []).map((a: any) => ({
          ...a,
          image: a.image || getImage(`${a.name} portrait`, 100, 100)
        })),
        artworks: (content.artworks || []).map((w: any) => ({
          ...w,
          image: w.image || getImage(`${w.title} ${w.artist}`, 300, 200)
        }))
      };
      break;

    case SectionType.HISTORY:
      finalContent = {
        intro: content.intro,
        periods: content.periods || [],
        longText: content.longText
      };
      break;

    case SectionType.ON_VIEW:
      finalContent = {
        floors: content.floors || [],
        exhibitions: (content.exhibitions || []).map((e: any) => ({
          ...e,
          image: e.image || getImage(`${e.title} exhibition`, 600, 400)
        }))
      };
      break;

    case SectionType.THEMATIC_EXPLORATIONS:
      finalContent = (content.items || []).map((item: any) => ({
        ...item,
        image: item.image || getImage(`${item.title} theme`, 300, 200)
      }));
      break;

    case SectionType.BOOKS:
      finalContent = (content.items || []).map((item: any) => ({
        ...item,
        image: item.image || getImage(`${item.title} book cover`, 150, 200)
      }));
      break;
      
    default:
      finalContent = content;
  }

  return { id, type, title, content: finalContent };
};

/**
 * Generates an adaptive, narrative-driven search result page using Gemini.
 */
export const search = async (query: string): Promise<SearchResult> => {
  try {
    // Serialize the local database to pass to the model
    // Using stringify to ensure we have a string representation
    const dbContext = JSON.stringify(MOMA_DATA || {});

    const prompt = `
      You are an expert curator and search engine for the Museum of Modern Art (MoMA).
      
      User Query: "${query}"
      
      CONTEXT DATA (Use this data to populate the response if applicable):
      ${dbContext}

      STEP 1: Check the CONTEXT DATA for any entries matching or related to the User Query.
      - Look for partial name matches (e.g. "picasso" should match "Pablo Picasso", "van gogh" should match "Vincent van Gogh").
      - Look for artwork title matches (e.g. "starry night").
      - Look for movement matches (e.g. "pop art").

      STEP 2: Determine the category of this query:
      - ARTIST (if the query matches an artist name or is about an artist)
      - MOVEMENT_OR_THEME (e.g., "Surrealism", "Love", "War", "Abstract Expressionism")
      - EXHIBITION (e.g., "Automania", "Surrealism Beyond Borders")
      - SPECIFIC_WORK (e.g., "Starry Night", "Photography at MoMA book", "Campbell's Soup Cans")

      STEP 3: Generate a list of 5-7 sections based on the category using the STRICT ORDERING rules below.
      
      IMPORTANT:
      - **PRIORITIZE CONTEXT DATA**: If you find the artist/work/exhibition in the CONTEXT DATA, you MUST use that data for bio, dates, description, and artworks.
      - If the exact query is not in CONTEXT DATA, use your general knowledge.
      - If generating images (not from CONTEXT DATA), use descriptive keywords for placeholders.

      STRICT ORDERING RULES:

      CASE: ARTIST
      1. ARTIST_BIO (Detailed bio from CONTEXT DATA if available, image of artist, new works on view)
      2. RELATED_ART (Artworks by this artist and their peers/influences)
      3. HISTORY (The artist's place in art history)
      4. ON_VIEW (Where to find their work in the museum)
      5. THEMATIC_EXPLORATIONS (Themes in their work)

      CASE: MOVEMENT_OR_THEME
      1. OVERVIEW (Broad introduction to the movement/theme)
      2. THEMATIC_EXPLORATIONS (Key concepts within this theme)
      3. HISTORY (Timeline and evolution)
      4. BOOKS (Scholarship on this topic)
      5. RELATED_ART (Key works defining this movement)
      6. ON_VIEW (Relevant galleries)

      CASE: EXHIBITION
      1. OVERVIEW (Description of the exhibition concept)
      2. ON_VIEW (Gallery location, what floor, specific exhibition details)
      3. RELATED_ART (Key works in the exhibition)
      4. HISTORY (Curatorial history or background)
      5. BOOKS (Exhibition catalog)

      CASE: SPECIFIC_WORK (Artwork or Book)
      1. [PRIMARY_SECTION]: 
         - If it is a BOOK: Start with a 'BOOKS' section featuring the specific book first.
         - If it is an ARTWORK: Start with a 'RELATED_ART' section (highlighting the specific work) OR an 'OVERVIEW' section dedicated to analyzing that work.
      2. OVERVIEW (Context about the specific work, if not used as primary)
      3. ARTIST_BIO (The creator)
      4. HISTORY (Provenance or historical significance)
      5. ON_VIEW (Location)

      STEP 4: Generate rich, art-historical content for each section.
      
      Return valid JSON matching the schema provided.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    const parsedData = JSON.parse(jsonText);
    const sections = parsedData.sections.map((s: any) => mapGeminiToSectionData(s, query));

    return { query, sections };

  } catch (error) {
    console.warn("AI Search failed, falling back to smart local data:", error);
    return fallbackSearch(query);
  }
};

// Smart fallback that queries local MOMA_DATA if AI fails
const fallbackSearch = async (query: string): Promise<SearchResult> => {
  const lowerQuery = query.toLowerCase();
  let sections: SectionData[] = [];

  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate slight network delay

  // 1. Try to find Artist in local DB
  const artist = MOMA_DATA.artists.find(a => 
    lowerQuery.includes(a.name.toLowerCase()) || a.name.toLowerCase().includes(lowerQuery)
  );

  if (artist) {
    // Artist Bio
    sections.push({
      id: `bio-${artist.id}`,
      type: SectionType.ARTIST_BIO,
      content: {
        name: artist.name,
        dates: artist.dates,
        description: artist.bio,
        image: artist.image,
        newOnView: MOMA_DATA.artworks
          .filter(w => w.artist === artist.name && w.onView)
          .map(w => ({
             title: w.title,
             year: w.year,
             gallery: w.location,
             image: w.image
          }))
      }
    });

    // Related Art (Artist's works)
    const works = MOMA_DATA.artworks.filter(w => w.artist === artist.name);
    if (works.length > 0) {
      sections.push({
        id: `works-${artist.id}`,
        type: SectionType.RELATED_ART,
        title: `Works by ${artist.name}`,
        content: {
          description: "Highlights from the collection.",
          categories: [],
          artists: [],
          artworks: works.map(w => ({
            artist: w.artist,
            title: w.title,
            year: w.year,
            status: w.location,
            highlight: w.onView,
            image: w.image
          }))
        }
      });
    }

    // Generic History/Overview based on movement if available
    const movement = MOMA_DATA.movements.find(m => m.key_artists.includes(artist.name));
    if (movement) {
        sections.push({
            id: `history-${artist.id}`,
            type: SectionType.HISTORY,
            content: {
                intro: movement.name,
                periods: [],
                longText: movement.description
            }
        });
    } else {
        // Fallback history if movement not found
        sections.push({
           id: 'history-generic',
           type: SectionType.HISTORY,
           content: {
              intro: `History of ${artist.name}`,
              periods: [],
              longText: `${artist.name} is a pivotal figure in modern art history.`
           }
        });
    }

    return { query, sections };
  }

  // 2. Try to find Artwork
  const artwork = MOMA_DATA.artworks.find(w => lowerQuery.includes(w.title.toLowerCase()));
  if (artwork) {
     sections.push({
        id: `overview-${artwork.id}`,
        type: SectionType.OVERVIEW,
        content: artwork.description
     });

     sections.push({
        id: `related-${artwork.id}`,
        type: SectionType.RELATED_ART,
        title: "The Artwork",
        content: {
            description: "View this work in our collection.",
            categories: [],
            artists: [],
            artworks: [{
                artist: artwork.artist,
                title: artwork.title,
                year: artwork.year,
                status: artwork.location,
                highlight: artwork.onView,
                image: artwork.image
            }]
        }
     });

     return { query, sections };
  }

  // 3. Existing Hardcoded Fallbacks for Cindy Sherman demo (only if query matches exactly)
  if (lowerQuery.includes("cindy") || lowerQuery.includes("sherman")) {
      return {
          query,
          sections: [
            { id: 'artist-bio', type: SectionType.ARTIST_BIO, content: DATA.CINDY_SHERMAN_BIO },
            { id: 'related-art', type: SectionType.RELATED_ART, title: "Related art and artists", content: DATA.RELATED_ART_CONTENT },
            { id: 'history', type: SectionType.HISTORY, content: DATA.HISTORY_CONTENT },
            { id: 'on-view', type: SectionType.ON_VIEW, title: "On view", content: DATA.ON_VIEW_CONTENT },
            { id: 'thematic', type: SectionType.THEMATIC_EXPLORATIONS, title: "Thematic Explorations", content: DATA.THEMATIC_CONTENT },
          ]
      };
  } else if (lowerQuery.includes("exhibition") || lowerQuery.includes("automania")) {
      return {
          query,
          sections: [
            { id: 'overview', type: SectionType.OVERVIEW, content: DATA.OVERVIEW_CONTENT },
            { id: 'on-view', type: SectionType.ON_VIEW, title: "On view", content: DATA.ON_VIEW_CONTENT },
            { id: 'related-art', type: SectionType.RELATED_ART, title: "Related art and artists", content: DATA.RELATED_ART_CONTENT },
            { id: 'history', type: SectionType.HISTORY, content: DATA.HISTORY_CONTENT },
          ]
      };
  }

  // 4. Default Generic Fallback if nothing found
  return {
    query,
    sections: [
       { 
         id: 'no-results', 
         type: SectionType.OVERVIEW, 
         content: `We couldn't find specific results for "${query}" in our local database sample. Try searching for "Cindy Sherman", "Picasso", "Van Gogh", or "Automania".` 
       },
       { id: 'books', type: SectionType.BOOKS, title: "Recommended Reading", content: DATA.BOOKS_CONTENT }
    ]
  };
};
