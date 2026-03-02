import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionData } from '../types';

// --- Helper Components ---

const SectionHeader: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 md:mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 max-w-sm">{title}</h2>
    <div className="md:max-w-2xl text-lg leading-relaxed">{children}</div>
  </div>
);

const CardArrowLink: React.FC<{ title: string; count?: number | string; children: React.ReactNode }> = ({ title, count, children }) => (
  <div className="border border-gray-300 p-6 flex flex-col justify-between hover:bg-gray-50 transition-colors h-full cursor-pointer group">
    <div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
          {title} <ArrowRight size={20} />
        </h3>
        {count && <span className="text-sm font-mono text-gray-500">{count}</span>}
      </div>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  </div>
);

// --- Section Components ---

export const OverviewSection: React.FC<{ data: SectionData }> = ({ data }) => {
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-12">
         <h2 className="text-4xl font-bold min-w-[200px]">Overview</h2>
         <p className="text-xl leading-relaxed max-w-4xl">{data.content}</p>
      </div>
    </section>
  );
};

export const ArtistBioSection: React.FC<{ data: SectionData; onNavigate?: () => void }> = ({ data, onNavigate }) => {
  const { name, dates, description, image, newOnView } = data.content;
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
        <div className="flex-shrink-0 cursor-pointer group" onClick={onNavigate}>
           <h2 className="text-4xl font-bold mb-8 group-hover:underline decoration-2 underline-offset-4">About the artist</h2>
           <img src={image} alt={name} className="w-48 h-48 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
        </div>
        <div className="flex-grow">
           <p className="text-xl font-medium mb-1">{name} <span className="text-gray-500 font-normal">{dates}</span></p>
           <p className="text-lg leading-relaxed mb-8">{description}</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {newOnView.map((item: any, idx: number) => (
               <div key={idx} className="group cursor-pointer">
                  <div className="overflow-hidden mb-3">
                    <img src={item.image} alt={item.title} className="w-full aspect-square object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="text-sm">
                    {item.gallery !== "Not on view" && <span className="text-[#d0021b] font-bold block mb-1">New on view</span>}
                    <div className="font-bold">{name}</div>
                    <div className="italic">{item.title}</div>
                    <div className="text-gray-600 mb-1">{item.year}</div>
                    {item.gallery !== "Not on view" ? (
                      <div className="text-[#d0021b] font-bold">{item.gallery}</div>
                    ) : (
                      <div className="text-gray-500 italic font-bold">More {name}</div>
                    )}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export const ThematicExplorationsSection: React.FC<{ data: SectionData; onNavigate?: () => void }> = ({ data, onNavigate }) => {
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
       <h2 
         className="text-4xl font-bold mb-12 cursor-pointer hover:underline decoration-2 underline-offset-4 inline-block"
         onClick={onNavigate}
       >
         Thematic Explorations
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {data.content.map((item: any, idx: number) => (
           <div key={idx} className="group cursor-pointer">
             <div className="border border-gray-200 p-4 h-full flex flex-col hover:shadow-lg transition-shadow">
               <div className="mb-4 overflow-hidden h-48">
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
               </div>
               <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                 {item.title} <ArrowRight size={18} />
               </h3>
               <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
               <div className="font-bold text-sm mt-auto border-t border-gray-100 pt-3">{item.count}</div>
             </div>
           </div>
         ))}
       </div>
    </section>
  );
};

export const RelatedArtSection: React.FC<{ data: SectionData; onNavigate?: () => void }> = ({ data, onNavigate }) => {
  const { description, categories, artists, artworks } = data.content;
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
      <div onClick={onNavigate} className="cursor-pointer group">
        <SectionHeader title={data.title || "Related art and artists"}>
          <p>{description}</p>
        </SectionHeader>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {categories.map((cat: any, idx: number) => (
          <CardArrowLink key={idx} title={cat.name} count={cat.count}>
            {cat.description}
          </CardArrowLink>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 items-end">
        {artists.map((artist: any, idx: number) => (
          <div key={idx} className="flex flex-col items-center text-center cursor-pointer group">
             <img src={artist.image} alt={artist.name} className="w-32 h-32 rounded-full object-cover grayscale mb-4 group-hover:grayscale-0 transition-all" />
             <p className="font-bold max-w-[120px]">{artist.name.split(" ").map((n: string) => <span key={n} className="block">{n}</span>)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
         {artworks.map((work: any, idx: number) => (
           <div key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-3 overflow-hidden">
                <img src={work.image} alt={work.title} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-sm">
                <div className="font-bold">{work.artist}</div>
                <div className="italic">{work.title}</div>
                <div className="text-gray-500 mb-1">{work.year}</div>
                {work.highlight ? (
                   <div className="text-[#d0021b] font-bold">{work.status}</div>
                ) : (
                   <div className="text-gray-400">{work.status}</div>
                )}
              </div>
           </div>
         ))}
          <div className="flex items-end justify-end">
            <a href="#" className="font-bold underline text-sm hover:text-gray-600">More art and artists</a>
          </div>
      </div>
    </section>
  );
};

export const HistorySection: React.FC<{ data: SectionData; onNavigate?: () => void }> = ({ data, onNavigate }) => {
  const { intro, periods, longText } = data.content;
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/4 cursor-pointer" onClick={onNavigate}>
          <h2 className="text-4xl font-bold leading-tight hover:underline decoration-2 underline-offset-4">{intro}</h2>
        </div>
        
        <div className="w-full md:w-3/4">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {periods.map((p: any, idx: number) => (
                <CardArrowLink key={idx} title={p.period} count={p.count}>
                  {p.text}
                </CardArrowLink>
              ))}
           </div>
           
           <div className="prose max-w-none text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {longText}
           </div>
           
           <div className="mt-6 text-right">
              <a href="#" className="font-bold underline text-sm hover:text-gray-600">More history</a>
           </div>
        </div>
      </div>
    </section>
  );
};

export const OnViewSection: React.FC<{ data: SectionData; onNavigate?: () => void }> = ({ data, onNavigate }) => {
  const { floors, exhibitions } = data.content;
  return (
    <section className="py-12 md:py-16 border-b border-gray-200">
       <h2 
         className="text-4xl font-bold mb-4 cursor-pointer hover:underline decoration-2 underline-offset-4 inline-block"
         onClick={onNavigate}
       >
         On view
       </h2>
       <p className="text-gray-600 mb-12">12 works by women photographers are currently displayed across 4 galleries.</p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {floors.map((floor: any, idx: number) => (
             <CardArrowLink key={idx} title={floor.floor} count={floor.count}>
                {floor.description}
             </CardArrowLink>
          ))}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {exhibitions.map((ex: any, idx: number) => (
             <div key={idx} className="group cursor-pointer">
                <div className="aspect-video bg-gray-200 mb-4 overflow-hidden relative">
                   <img src={ex.image} alt={ex.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   {/* Gradient overlay for text readability if needed, but MoMA style is usually clean */}
                </div>
                <h3 className="text-2xl font-bold mb-1">{ex.title}</h3>
                <p className="text-gray-700">{ex.subtitle}</p>
                {ex.dates && <p className="text-sm text-gray-500 mt-2">{ex.dates}</p>}
             </div>
          ))}
       </div>
       <div className="mt-8 text-right">
          <a href="#" className="font-bold underline text-sm hover:text-gray-600">More on view</a>
       </div>
    </section>
  );
};

export const BooksSection: React.FC<{ data: SectionData }> = ({ data }) => {
  return (
    <section className="py-12 md:py-16 border-b border-gray-200 bg-gray-50 -mx-6 md:-mx-12 px-6 md:px-12">
       <h2 className="text-4xl font-bold mb-12">Books and articles</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {data.content.map((book: any, idx: number) => (
           <div key={idx} className="flex gap-4 group cursor-pointer">
              <div className="w-24 flex-shrink-0 shadow-md">
                 <img src={book.image} alt={book.title} className="w-full h-auto object-cover" />
              </div>
              <div>
                 <h4 className="font-bold text-sm leading-tight mb-1 group-hover:underline">{book.title}</h4>
                 <p className="text-xs text-gray-600 mb-2">{book.author}, {book.year}</p>
                 <p className="text-xs font-bold flex items-center gap-1">
                    Buy from the Design Store <ArrowRight size={10} />
                 </p>
              </div>
           </div>
         ))}
       </div>
    </section>
  );
};
