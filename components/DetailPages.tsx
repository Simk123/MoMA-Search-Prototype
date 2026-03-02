import React, { useState } from 'react';
import { ArrowRight, X, ChevronDown, Check, Play, Pause } from 'lucide-react';
import { SectionData } from '../types';

// --- Shared Components ---

const DetailHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  breadcrumbs?: string[];
  onBack: () => void;
}> = ({ title, subtitle, breadcrumbs, onBack }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 text-sm font-medium mb-6">
      <button onClick={onBack} className="hover:underline underline-offset-4">Home</button>
      {breadcrumbs?.map((crumb, i) => (
        <React.Fragment key={i}>
          <span className="text-gray-400">›</span>
          <span className={i === breadcrumbs.length - 1 ? "text-gray-500" : "hover:underline cursor-pointer"}>
            {crumb}
          </span>
        </React.Fragment>
      ))}
    </div>
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{title}</h1>
    {subtitle && <p className="text-2xl md:text-3xl font-medium text-gray-600">{subtitle}</p>}
  </div>
);

const SectionTitle: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="flex items-baseline justify-between border-b border-black pb-4 mb-8 mt-16">
    <h2 className="text-3xl font-bold">{title}</h2>
    {children}
  </div>
);

// --- Page Components ---

export const ArtistDetailPage: React.FC<{ data: SectionData; onBack: () => void }> = ({ data, onBack }) => {
  // Mock data for the full page view, falling back to props if available
  const artist = {
    name: data.content?.name || "Cindy Sherman",
    dates: data.content?.dates || "American, b. 1954",
    bio: data.content?.bio || "Cindy Sherman is one of the most influential artists of her generation. Working exclusively with photography, she creates invented personas and provocative tableaus that examine the construction of identity and the nature of representation.",
    image: data.content?.image || "https://picsum.photos/id/64/800/600"
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out_forwards]">
      <DetailHeader 
        title={artist.name} 
        subtitle={artist.dates}
        breadcrumbs={['Artists', artist.name]}
        onBack={onBack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-8">
          <img src={artist.image} alt={artist.name} className="w-full aspect-[4/3] object-cover mb-8 grayscale" />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg mb-4">Associated art terms include</h3>
                <div className="flex flex-wrap gap-2 mb-12">
                    {["Pictures Generation", "Feminist Art", "Conceptual Photography"].map(tag => (
                        <span key={tag} className="underline decoration-1 underline-offset-4 hover:bg-black hover:text-white transition-colors cursor-pointer px-1 -ml-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="space-y-4 font-bold text-lg">
                <a href="#" className="flex items-center gap-2 hover:gap-4 transition-all">Works <ArrowRight size={16} /></a>
                <a href="#" className="flex items-center gap-2 hover:gap-4 transition-all">Exhibitions <ArrowRight size={16} /></a>
                <a href="#" className="flex items-center gap-2 hover:gap-4 transition-all">Publications <ArrowRight size={16} /></a>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-4">
            <h3 className="font-bold text-xl mb-4">Biography</h3>
        </div>
        <div className="lg:col-span-8 text-xl leading-relaxed space-y-6">
            <p>{artist.bio}</p>
            <p>Sherman's early work, including the seminal "Untitled Film Stills" (1977–80), challenged the cultural stereotypes supported by the media. By photographing herself in various costumes and settings, she creates a myriad of characters that are at once familiar and unsettling.</p>
            <div className="mt-8">
                <button className="font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Read full biography <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>

      <SectionTitle title="Works">
        <span className="text-gray-500">12 works online</span>
      </SectionTitle>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24">
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 mb-3 overflow-hidden">
                    <img 
                        src={`https://picsum.photos/seed/${i + 100}/400/400`} 
                        alt="Artwork" 
                        className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div>
                    <div className="font-bold">{artist.name}</div>
                    <div className="italic text-gray-600">Untitled Film Still #{i + 10}</div>
                    <div className="text-sm text-gray-500">197{i}</div>
                </div>
            </div>
        ))}
      </div>

      <div className="bg-gray-100 p-8 md:p-12 -mx-6 md:-mx-12 mb-24">
         <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold mb-12">Audio</h2>
            <div className="bg-white p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" />
                </button>
                <div>
                    <div className="font-bold text-lg">Cindy Sherman on "Untitled Film Stills"</div>
                    <div className="text-gray-500">The artist discusses her early work and process.</div>
                </div>
                <div className="ml-auto font-mono text-sm text-gray-400">03:42</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export const OnViewDetailPage: React.FC<{ data: SectionData; onBack: () => void }> = ({ data, onBack }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out_forwards]">
      <DetailHeader 
        title="On view" 
        breadcrumbs={['Visit', 'On view']}
        onBack={onBack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
            <p className="text-2xl leading-relaxed mb-12">
                12 works by women photographers are currently displayed across 4 galleries, with 2 major exhibitions featuring women's photography.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {[
                    { floor: "Floor 4", title: "Collection 1940s–1970s", count: 5, desc: "Sherman's Film Stills and conceptual photography" },
                    { floor: "Floor 5", title: "Collection 1880s–1940s", count: 3, desc: "Pioneering Pictorialists alongside recent acquisitions" },
                    { floor: "Floor 2", title: "Contemporary Galleries", count: 16, desc: "Helen Levitt exhibition—images of New York street life" },
                    { floor: "Floor 6", title: "Special Exhibitions", count: 2, desc: "Surrealism Beyond Borders" }
                ].map((item, i) => (
                    <div key={i} className="border border-black p-6 hover:bg-black hover:text-white transition-colors cursor-pointer group h-full flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    {item.floor} <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <span className="font-mono text-sm">{item.count}</span>
                            </div>
                            <p className="font-medium mb-4">{item.title}</p>
                        </div>
                        <p className="text-sm opacity-80">{item.desc}</p>
                    </div>
                ))}
            </div>

            <SectionTitle title="Current Exhibitions" />
            
            <div className="space-y-12 mb-24">
                {[
                    { title: "Our Selves: Photographs by Women Artists", dates: "Through Oct 10", image: "https://picsum.photos/seed/ex1/800/500" },
                    { title: "Photographs of Women", dates: "Through Nov 30", image: "https://picsum.photos/seed/ex2/800/500" }
                ].map((ex, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-video overflow-hidden mb-4">
                            <img src={ex.image} alt={ex.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{ex.title}</h3>
                        <p className="text-gray-600 font-medium">{ex.dates}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Planning a visit?</h3>
                    <X size={20} className="cursor-pointer text-gray-400 hover:text-black" />
                </div>
                <div className="space-y-6">
                    <div className="pb-6 border-b border-gray-200">
                        <h4 className="font-bold mb-2">Helen Levitt Exhibition</h4>
                        <p className="text-sm text-gray-600 mb-2">Floor 2, Gallery 10 • Through March 15</p>
                        <p className="text-sm">Lyrical NYC street photography</p>
                    </div>
                    <div>
                        <a href="#" className="font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Group admission <ArrowRight size={16} />
                        </a>
                        <p className="text-sm text-gray-600 mt-2">
                            Professional art historians are available to provide guided Museum tours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const HistoryDetailPage: React.FC<{ data: SectionData; onBack: () => void }> = ({ data, onBack }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out_forwards]">
      <DetailHeader 
        title="History" 
        breadcrumbs={['Research', 'History']}
        onBack={onBack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed mb-8 font-medium">
                For much of photography's 170-year history, women have contributed to its development as both an art form and a means of communication, expanding its parameters by experimenting with every aspect of the medium.
            </p>
            <div className="prose max-w-none text-lg leading-relaxed text-gray-800 mb-16">
                <p className="mb-6">
                    MoMA's collection traces how women photographers fundamentally shaped modern photography—from the Pictorialists of the late 19th century through the documentary tradition of the Depression era, the conceptual revolution of the 1970s, and into the digital present.
                </p>
                <p>
                    Self-portraiture and representations of women by women practitioners recur throughout, from Julia Margaret Cameron's ethereal Victorian portraits to Cindy Sherman's interrogations of identity and media. The collection includes masterworks by luminaries such as Berenice Abbott, who originated documentary photography as a distinct practice; Dorothea Lange, whose "Migrant Mother" became photography's most reproduced image; Diane Arbus, whose 1972 MoMA retrospective was the most attended photography exhibition in the museum's history; and contemporary voices.
                </p>
            </div>

            <div className="space-y-12">
                {[
                    { title: "Photography at MoMA: 1840–1920", author: "Edited by Quentin Bajac", image: "https://picsum.photos/seed/b1/200/300" },
                    { title: "MoMA Now: Highlights from The Museum of Modern Art", author: "Introduction by Glenn D. Lowry", image: "https://picsum.photos/seed/b2/200/300" }
                ].map((book, i) => (
                    <div key={i} className="flex gap-8 items-start group cursor-pointer">
                        <div className="w-32 shadow-lg flex-shrink-0">
                            <img src={book.image} alt={book.title} className="w-full h-auto" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:underline">{book.title}</h3>
                            <p className="text-gray-600 mb-4">{book.author}</p>
                            <div className="flex items-center gap-1 font-bold text-sm">
                                Buy from the Design Store <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <SectionTitle title="Articles & Essays" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {[
                    { title: "The Ambition and Originality of Fotoclubismo", author: "Sarah Meister", date: "May 7, 2021", image: "https://picsum.photos/seed/a1/400/300" },
                    { title: "Self-Portraits by Women Artists", author: "Julia Fiore", date: "March 20, 2020", image: "https://picsum.photos/seed/a2/400/300" },
                    { title: "Anything We Want to Be: Tourmaline's Salacia", author: "T. Jean Lax", date: "June 25, 2020", image: "https://picsum.photos/seed/a3/400/300" }
                ].map((article, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-[3/2] overflow-hidden mb-4">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <h3 className="font-bold text-xl mb-2 leading-tight group-hover:underline">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.author}</p>
                        <p className="text-sm text-gray-400">{article.date}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-4">
            <div className="sticky top-8">
                <div className="flex justify-between items-center mb-6 border-b border-black pb-2">
                    <h3 className="font-bold text-lg">Explore next</h3>
                    <X size={20} className="cursor-pointer" />
                </div>
                <div className="space-y-4">
                    {[
                        { title: "1890s-1920s", subtitle: "Fighting for Recognition", count: 14, desc: "When women had to prove photography was art." },
                        { title: "1930s-1950s", subtitle: "Documentary Power", count: 14, desc: "How women used cameras for social change." },
                        { title: "1960s-1980s", subtitle: "Feminist Revolution", count: 14, desc: "When women reimagined photography to challenge norms." }
                    ].map((item, i) => (
                        <div key={i} className="border border-gray-300 p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                                    {item.title} <ArrowRight size={14} />
                                </h4>
                                <span className="text-xs font-mono text-gray-500">{item.count}</span>
                            </div>
                            <div className="font-bold mb-1">{item.subtitle}</div>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const CollectionDetailPage: React.FC<{ data: SectionData; onBack: () => void }> = ({ data, onBack }) => {
  const [filtersOpen, setFiltersOpen] = useState({
    category: true,
    classification: false,
    date: false,
    place: false
  });

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out_forwards]">
      <DetailHeader 
        title="Women photographers" 
        subtitle="Through portraiture"
        breadcrumbs={['Collection', 'Search: "women photographers"']}
        onBack={onBack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-9">
            <p className="text-xl leading-relaxed mb-12 max-w-4xl">
                Women photographers have fundamentally reshaped visual storytelling since the early 20th century. From documentary pioneers who challenged both artistic conventions and gender barriers, to contemporary artists questioning the very nature of representation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 mb-24">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-[4/5] bg-gray-100 mb-3 overflow-hidden">
                            <img 
                                src={`https://picsum.photos/seed/${i + 500}/400/500`} 
                                alt="Artwork" 
                                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <div>
                            <div className="font-bold">Cindy Sherman</div>
                            <div className="italic text-gray-600">Untitled Film Still #{i + 50}</div>
                            <div className="text-sm text-gray-500">1980</div>
                            <div className="text-xs font-bold text-gray-400 mt-1">Not on view</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-3">
            <div className="sticky top-8">
                <div className="flex justify-between items-center mb-6 border-b border-black pb-2">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <X size={20} className="cursor-pointer" />
                </div>
                
                <div className="space-y-4 mb-8">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 border border-black flex items-center justify-center bg-black text-white">
                            <Check size={14} />
                        </div>
                        <span className="font-bold group-hover:underline">Has image</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 border border-black flex items-center justify-center bg-black text-white">
                            <Check size={14} />
                        </div>
                        <span className="font-bold group-hover:underline">On view</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 border border-black flex items-center justify-center"></div>
                        <span className="font-bold group-hover:underline">Recent acquisition</span>
                    </label>
                </div>

                <div className="space-y-0 border-t border-black">
                    {['Category', 'Classification', 'Date', 'Place'].map((filter) => (
                        <div key={filter} className="border-b border-black py-4">
                            <button className="flex justify-between items-center w-full font-bold hover:opacity-70">
                                {filter}
                                <ChevronDown size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                
                <button className="mt-8 flex items-center gap-2 font-bold border-b-2 border-black pb-0.5 hover:border-gray-500 hover:text-gray-600 transition-colors">
                    <span className="text-lg">Save search</span>
                </button>

                <div className="mt-12 border border-gray-300 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold">Group admission <ArrowRight size={16} className="inline ml-1" /></h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        Professional art historians are available to provide guided Museum tours of masterworks.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
