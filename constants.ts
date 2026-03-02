import { SectionType, SectionData } from './types';

// Mock content based on OCR data

export const CINDY_SHERMAN_BIO = {
  name: "Cindy Sherman",
  dates: "(American, b. 1954)",
  description: `Cindy Sherman is one of the most influential artists of her generation. Working exclusively with photography, she creates invented personas and provocative tableaus that examine the construction of identity and the nature of representation in our increasingly image-saturated world. Masquerading as a myriad of characters in front of her own camera—from film noir heroines to Renaissance aristocrats, fashion victims to aging socialites—Sherman's work speaks to how we construct and consume images of ourselves and others. MoMA holds 105 works by the artist, spanning her entire career from the groundbreaking Untitled Film Stills (1977–80) to her recent society portraits.`,
  image: "https://picsum.photos/id/64/300/300",
  newOnView: [
    { title: "Untitled Film Still #4", year: "1977", gallery: "Gallery 402", image: "https://picsum.photos/id/237/200/200" },
    { title: "Untitled Film Still #62", year: "1977", gallery: "Gallery 402", image: "https://picsum.photos/id/238/200/200" },
    { title: "Untitled Film Still #3", year: "1977", gallery: "Not on view", image: "https://picsum.photos/id/239/200/200" },
  ]
};

export const RELATED_ART_CONTENT = {
  description: "For much of photography's 170-year history, women have contributed to its development as both an art form and a means of communication, expanding its parameters by experimenting with every aspect of the medium.",
  categories: [
    { name: "American", count: 14, description: "See how American women shaped documentary, street photography, and conceptual practices." },
    { name: "European", count: 14, description: "European women were early photography innovators, leading Pictorialism, Surrealism, and Bauhaus experimentation." },
    { name: "Contemporary", count: 14, description: "Today, women photographers bring diverse cultural viewpoints, addressing identity, migration, and technology." },
  ],
  artists: [
    { name: "Julia Margaret Cameron", image: "https://picsum.photos/id/65/100/100" },
    { name: "Gertrude Käsebier", image: "https://picsum.photos/id/66/100/100" },
    { name: "Margaret Watkins", image: "https://picsum.photos/id/67/100/100" },
  ],
  artworks: [
    { artist: "Cindy Sherman", title: "Untitled Film Still #57", year: "1980", status: "Not on view", image: "https://picsum.photos/id/100/300/200" },
    { artist: "Berenice Abbott", title: "James Joyce", year: "1926", status: "Not on view", image: "https://picsum.photos/id/101/300/200" },
    { artist: "Dorothea Lange", title: "Migrant Mother, Nipomo, California", year: "1936", status: "On view, Gallery 402", highlight: true, image: "https://picsum.photos/id/102/300/200" },
    { artist: "Diane Arbus", title: "A child crying, N.J.", year: "1967", status: "Not on view", image: "https://picsum.photos/id/103/300/200" },
    { artist: "Julia Margaret Cameron", title: "Madonna with Children", year: "1864", status: "Not on view", image: "https://picsum.photos/id/104/300/200" },
  ]
};

export const HISTORY_CONTENT = {
  intro: "A brief history on women photographers",
  periods: [
    { period: "1890s–1920s", count: 14, text: "See how early women fought for artistic recognition in Pictorialism, establishing photography's legitimacy." },
    { period: "1920s–1940s", count: 14, text: "Discover how women like Dorothea Lange used cameras to document the Depression and advocate for social change." },
    { period: "1950s–1960s", count: 14, text: "Explore how women photographers shifted from documentation to deeply personal, experimental work." },
    { period: "1970s–1980s", count: 14, text: "Understand how feminist artists like Cindy Sherman used photography to deconstruct gender and representation." },
  ],
  longText: `MoMA's collection traces how women photographers fundamentally shaped modern photography—from the Pictorialists of the late 19th century through the documentary tradition of the Depression era, the conceptual revolution of the 1970s, and into the digital present.
  
  Self-portraiture and representations of women by women practitioners recur throughout, from Julia Margaret Cameron's ethereal Victorian portraits to Cindy Sherman's interrogations of identity and media. The collection includes masterworks by luminaries such as Berenice Abbott, who originated documentary photography as a distinct practice; Dorothea Lange, whose "Migrant Mother" became photography's most reproduced image; Diane Arbus, whose 1972 MoMA retrospective was the most attended photography exhibition in the museum's history.`
};

export const ON_VIEW_CONTENT = {
  floors: [
    { floor: "Floor 4", count: 5, description: "Sherman's Film Stills and conceptual photography that challenged representation." },
    { floor: "Floor 5", count: 3, description: "Pioneering Pictorialists alongside recent acquisitions showing photography's ongoing evolution." },
    { floor: "Floor 6", count: 16, description: "Helen Levitt exhibition—images of New York street life from 1930s-1990s." },
  ],
  exhibitions: [
    { title: "Our Selves", subtitle: "Photographs by Women Artists from Helen Kornblum", dates: "Through Oct 10", image: "https://picsum.photos/id/338/600/400" },
    { title: "Photographs of Women", subtitle: "Through Nov 30", dates: "", image: "https://picsum.photos/id/342/600/400" },
  ]
};

export const BOOKS_CONTENT = [
  { title: "Photography at MoMA: 1840–1920", author: "Edited by Quentin Bajac", year: "2017", image: "https://picsum.photos/id/24/150/200" },
  { title: "MoMA Now: Highlights from The Museum of Modern Art", author: "Glenn D. Lowry", year: "2019", image: "https://picsum.photos/id/25/150/200" },
  { title: "The Ambition and Originality of Fotoclubismo", author: "Sarah Meister", year: "2021", image: "https://picsum.photos/id/26/150/200" },
  { title: "Self-Portraits by Women Artists", author: "Julia Fiore", year: "2020", image: "https://picsum.photos/id/27/150/200" },
];

export const THEMATIC_CONTENT = [
    { title: "Through portraiture", count: "34 works", description: "Discover how women photographers reclaimed agency by turning the camera on themselves.", image: "https://picsum.photos/id/40/300/200" },
    { title: "Documentary vision", count: "28 works", description: "Explore how photographers like Dorothea Lange and Margaret Bourke-White used the lens as a tool for social change.", image: "https://picsum.photos/id/41/300/200" },
    { title: "Conceptual practices", count: "45 works", description: "See how artists from the 1970s onward challenged photography itself—its truth claims, its politics.", image: "https://picsum.photos/id/42/300/200" }
]

export const OVERVIEW_CONTENT = "Women photographers have fundamentally reshaped visual storytelling since the early 20th century. From documentary pioneers who challenged both artistic conventions and gender barriers, to contemporary artists questioning the very nature of representation, MoMA's collection traces this revolutionary arc across 120+ works.";
