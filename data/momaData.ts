// This file acts as your local database. 
// You can replace the content of MOMA_DATA with your own JSON structure.
// The search engine will use this data to generate narrative results.

export const MOMA_DATA = {
  artists: [
    {
      id: "a1",
      name: "Cindy Sherman",
      dates: "American, b. 1954",
      bio: "Cindy Sherman is one of the most influential artists of her generation. Working exclusively with photography, she creates invented personas and provocative tableaus that examine the construction of identity and the nature of representation.",
      image: "https://picsum.photos/id/64/300/300"
    },
    {
      id: "a2",
      name: "Pablo Picasso",
      dates: "Spanish, 1881–1973",
      bio: "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist, and stage designer who spent most of his adult life in France. He is one of the most influential artists of the 20th century.",
      image: "https://picsum.photos/id/65/300/300"
    },
    {
      id: "a3",
      name: "Frida Kahlo",
      dates: "Mexican, 1907–1954",
      bio: "Frida Kahlo was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.",
      image: "https://picsum.photos/id/66/300/300"
    },
    {
      id: "a4",
      name: "Vincent van Gogh",
      dates: "Dutch, 1853–1890",
      bio: "Vincent van Gogh is among the most famous and influential figures in the history of Western art. In just over a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.",
      image: "https://picsum.photos/id/67/300/300"
    },
    {
      id: "a5",
      name: "Andy Warhol",
      dates: "American, 1928–1987",
      bio: "Andy Warhol was a leading figure in the visual art movement known as pop art. His works explore the relationship between artistic expression, celebrity culture, and advertising that flourished by the 1960s.",
      image: "https://picsum.photos/id/68/300/300"
    }
  ],
  artworks: [
    {
      id: "w1",
      title: "Untitled Film Still #21",
      artist: "Cindy Sherman",
      year: "1978",
      medium: "Gelatin silver print",
      description: "In this iconic image, Sherman adopts the persona of a career girl in the big city, capturing the ambiguity and cinematic allure of 1950s film noir.",
      onView: true,
      location: "Gallery 402",
      image: "https://picsum.photos/id/237/400/300"
    },
    {
      id: "w2",
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: "1889",
      medium: "Oil on canvas",
      description: "Van Gogh's masterpiece, painted in the asylum at Saint-Rémy, depicts a night sky swirling with energy and emotion.",
      onView: true,
      location: "Gallery 501",
      image: "https://picsum.photos/id/238/400/300"
    },
    {
      id: "w3",
      title: "Les Demoiselles d'Avignon",
      artist: "Pablo Picasso",
      year: "1907",
      medium: "Oil on canvas",
      description: "This large oil painting portrays five nude female prostitutes in a brothel on d'Avinyó Street in Barcelona.",
      onView: true,
      location: "Gallery 503",
      image: "https://picsum.photos/id/239/400/300"
    },
    {
      id: "w4",
      title: "Campbell's Soup Cans",
      artist: "Andy Warhol",
      year: "1962",
      medium: "Synthetic polymer paint on canvas",
      description: "Warhol's Campbell's Soup Cans consists of thirty-two canvases, each painting a variety of soup offered by the company at the time.",
      onView: true,
      location: "Gallery 412",
      image: "https://picsum.photos/id/240/400/300"
    },
    {
      id: "w5",
      title: "Self-Portrait with Cropped Hair",
      artist: "Frida Kahlo",
      year: "1940",
      medium: "Oil on canvas",
      description: "Kahlo painted this self-portrait shortly after her divorce from Diego Rivera, depicting herself in a suit with short hair.",
      onView: false,
      location: "Not on view",
      image: "https://picsum.photos/id/241/400/300"
    }
  ],
  exhibitions: [
    {
      id: "e1",
      title: "Automania",
      dates: "Through Jan 2, 2026",
      description: "Automania examines the car as a modern industrial object, a mobile architectural space, and a transformer of our landscape.",
      image: "https://picsum.photos/id/111/600/400"
    },
    {
      id: "e2",
      title: "Surrealism Beyond Borders",
      dates: "Closed",
      description: "This exhibition reconsiders Surrealism as a global movement, extending far beyond its Parisian origins.",
      image: "https://picsum.photos/id/112/600/400"
    },
    {
      id: "e3",
      title: "Picasso in Fontainebleau",
      dates: "Coming Soon",
      description: "This exhibition reunites two monumental versions of Three Musicians and other works from the summer of 1921.",
      image: "https://picsum.photos/id/113/600/400"
    }
  ],
  publications: [
    {
      id: "b1",
      title: "Photography at MoMA: 1960 to Now",
      author: "Quentin Bajac",
      year: "2015",
      description: "A comprehensive survey of the Museum's collection of contemporary photography.",
      image: "https://picsum.photos/id/24/150/200"
    },
    {
      id: "b2",
      title: "Picasso Sculpture",
      author: "Ann Temkin",
      year: "2015",
      description: "This publication accompanies the major retrospective of Picasso's sculptures.",
      image: "https://picsum.photos/id/25/150/200"
    },
    {
      id: "b3",
      title: "Van Gogh: The Starry Night",
      author: "Richard Thomson",
      year: "2008",
      description: "This book explores the history and significance of Van Gogh's most famous painting.",
      image: "https://picsum.photos/id/26/150/200"
    }
  ],
  movements: [
    {
        name: "Surrealism",
        description: "Surrealism was a cultural movement which developed in Europe in the aftermath of World War I and was largely influenced by Dada.",
        key_artists: ["Salvador Dalí", "René Magritte", "Frida Kahlo"]
    },
    {
        name: "Abstract Expressionism",
        description: "Abstract Expressionism is a post–World War II art movement in American painting, developed in New York in the 1940s.",
        key_artists: ["Jackson Pollock", "Mark Rothko", "Willem de Kooning"]
    },
    {
        name: "Pop Art",
        description: "Pop art is an art movement that emerged in the United Kingdom and the United States during the mid- to late-1950s.",
        key_artists: ["Andy Warhol", "Roy Lichtenstein", "Claes Oldenburg"]
    },
    {
        name: "Post-Impressionism",
        description: "Post-Impressionism is a predominantly French art movement that developed roughly between 1886 and 1905, from the last Impressionist exhibition to the birth of Fauvism.",
        key_artists: ["Paul Cézanne", "Paul Gauguin", "Vincent van Gogh", "Georges Seurat"]
    }
  ]
};