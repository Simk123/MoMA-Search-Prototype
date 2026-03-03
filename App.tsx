import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArtistItem {
  id?: string;
  type?: string;
  title: string;
  summary?: string;
  image_url?: string | null;
}

interface ArticleItem {
  id?: string;
  type?: string;
  title: string;
  summary?: string;
  image_url?: string | null;
}

interface ThematicExploration {
  title: string;
  description: string;
  count: number;
}

interface HistoryItem {
  period: string;
  description: string;
}

interface OnViewItem {
  floor: string;
  description: string;
  count: number;
}

interface EditorialResponse {
  layout_type: 'artist' | 'exhibition' | 'general';
  overview: string;
  artists: ArtistItem[];
  articles: ArticleItem[];
  thematic_explorations?: ThematicExploration[];
  history?: HistoryItem[];
  on_view?: OnViewItem[];
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

const MoMAHeader: React.FC<{
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isSearching: boolean;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  showSearchBar?: boolean;
  displayMode?: boolean; // shows query as large heading instead of editable input
}> = ({ query, setQuery, onSearch, isSearching, breadcrumbs, showSearchBar = true, displayMode = false }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <header className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-12 py-4">
        {/* Top bar: logo + nav + membership/tickets */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">MoMA</h1>
            <nav className="flex items-center gap-8 mt-4">
              {['Visit', 'Exhibitions and events', 'Art and artists', 'Store'].map(l => (
                <a key={l} href="#" className="text-base font-medium text-black hover:underline">{l}</a>
              ))}
              <Search size={18} className="text-black" />
            </nav>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-sm text-black cursor-pointer hover:underline">
              <span>Membership</span><ChevronDown size={14} />
            </div>
            <button className="bg-[#009ae4] text-white px-5 py-2 text-sm font-bold hover:bg-[#0077b3]">Tickets</button>
          </div>
        </div>

        {/* Display mode: large orange heading + search icon */}
        {displayMode && (
          <>
            <div className="flex items-center justify-between border-b-2 border-[#e35c1a] pb-2 mt-4 mb-3">
              <h2 className="text-5xl font-bold text-[#e35c1a] leading-tight">{query}</h2>
              <button onClick={() => setSearchOpen(v => !v)} className="text-[#e35c1a] hover:opacity-70 transition-opacity">
                <Search size={28} />
              </button>
            </div>
            {/* Inline search appears when icon is clicked */}
            {searchOpen && (
              <div className="mb-3 flex gap-3 items-center border border-gray-300 px-4 py-2">
                <input
                  autoFocus
                  type="text" value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { onSearch(query); setSearchOpen(false); } }}
                  className="flex-1 text-base text-black focus:outline-none"
                  placeholder="Search..."
                />
                <button onClick={() => { onSearch(query); setSearchOpen(false); }}>
                  {isSearching
                    ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                    : <Search size={18} className="text-black" />}
                </button>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              {breadcrumbs ? breadcrumbs.map((bc, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span>›</span>}
                  {bc.onClick
                    ? <button onClick={bc.onClick} className="hover:underline text-gray-500">{bc.label}</button>
                    : <span>{bc.label}</span>}
                </React.Fragment>
              )) : <><a href="#" className="hover:underline">Home</a><span>›</span><span>Search: "{query}"</span></>}
            </div>
          </>
        )}

        {/* Normal search bar mode */}
        {showSearchBar && !displayMode && (
          <>
            <div className="relative mb-3 border-b-2 border-[#e35c1a] mt-4">
              <input
                type="text" value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSearch(query)}
                className="w-full text-5xl font-bold text-[#e35c1a] bg-transparent pb-2 pr-12 focus:outline-none"
                placeholder="Search..."
              />
              <button onClick={() => onSearch(query)} className="absolute right-0 top-1/2 -translate-y-1/2">
                {isSearching
                  ? <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#e35c1a]" />
                  : <Search size={28} className="text-[#e35c1a]" />}
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              {breadcrumbs ? breadcrumbs.map((bc, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span>›</span>}
                  {bc.onClick
                    ? <button onClick={bc.onClick} className="hover:underline text-gray-500">{bc.label}</button>
                    : <span>{bc.label}</span>}
                </React.Fragment>
              )) : <><a href="#" className="hover:underline">Home</a><span>›</span><span>Search: "{query}"</span></>}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const MoMAFooter: React.FC = () => (
  <footer className="w-full bg-white border-t border-gray-200 mt-20 py-12">
    <div className="max-w-[1280px] mx-auto px-12">
      <div className="flex gap-8 text-sm text-gray-600 mb-8">
        {['About us', 'Support', 'Research', 'Teaching', 'Magazine', 'Log out'].map(l => (
          <a key={l} href="#" className="hover:underline">{l}</a>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8 text-sm mb-8">
        <div>
          <p className="font-bold">MoMA</p>
          <p>11 West 53 Street, Manhattan</p>
          <p className="text-gray-500">Open today, 10:30 a.m.–5:30 p.m.</p>
        </div>
        <div>
          <p className="font-bold">MoMA PS1</p>
          <p>22–25 Jackson Avenue, Queens</p>
          <p className="text-gray-500">Closed today</p>
        </div>
        <div>
          <p className="text-gray-600 mb-2 text-sm">Art and ideas in your inbox</p>
          <div className="flex border border-gray-300">
            <input type="email" placeholder="Email" className="px-3 py-1.5 text-sm flex-1 focus:outline-none" />
            <button className="px-3 py-1.5 bg-black text-white text-sm">→</button>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 border-t border-gray-100 pt-6">
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of use', 'Use high-contrast text'].map(l => (
            <a key={l} href="#" className="hover:underline">{l}</a>
          ))}
        </div>
        <p>© 2025 The Museum of Modern Art</p>
      </div>
    </div>
  </footer>
);

// Section: col 1 = sticky label/nav, cols 2–6 = content
const Section: React.FC<{ label: string; children: React.ReactNode; id?: string }> = ({ label, children, id }) => (
  <section id={id} className="max-w-[1280px] mx-auto px-12 py-14 border-b border-gray-100 scroll-mt-8">
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold text-black leading-tight sticky top-8">{label}</h2>
      </div>
      <div className="col-span-5">{children}</div>
    </div>
  </section>
);

// Overview renders as a standard Section to match the original mockup
const OverviewHero: React.FC<{ query: string; overview: string }> = ({ query, overview }) => (
  <Section label="Overview">
    <p className="text-base leading-relaxed text-black">{overview}</p>
  </Section>
);



// ─── Reusable Blocks ──────────────────────────────────────────────────────────

const Img: React.FC<{ src?: string | null; alt?: string; className?: string }> = ({ src, alt, className }) =>
  src ? <img src={src} alt={alt ?? ''} className={className} /> : <div className={`${className} bg-gray-200`} />;

const HistoryCards: React.FC<{ items: HistoryItem[]; onMore?: () => void; onSearch?: (q: string) => void }> = ({ items, onMore, onSearch }) => (
  <>
    <div className="grid grid-cols-2 gap-4 mb-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-300 p-5 cursor-pointer hover:border-black transition-colors group"
          onClick={() => { onSearch?.(item.period); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-black pr-2">{item.period} →</h3>
            <span className="text-xs text-gray-400 shrink-0">14</span>
          </div>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
    {onMore && <div className="text-right"><button onClick={onMore} className="text-sm font-semibold text-black hover:underline">More history →</button></div>}
  </>
);

const OnViewCards: React.FC<{ items: OnViewItem[]; articles?: ArticleItem[]; onMore?: () => void; onSearch?: (q: string) => void }> = ({ items, articles = [], onMore, onSearch }) => (
  <>
    <p className="text-sm text-black mb-6">{items.reduce((s, i) => s + i.count, 0)} works currently displayed across {items.length} galleries.</p>
    <div className="grid grid-cols-2 gap-4 mb-8">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-300 p-5 cursor-pointer hover:border-black transition-colors group"
          onClick={() => onMore?.()}
        >
          <div className="flex justify-between mb-2">
            <h3 className="text-base font-bold text-black">Floor {item.floor} →</h3>
            <span className="text-sm text-gray-400">{item.count}</span>
          </div>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
    {articles.length > 0 && (
      <div className="grid grid-cols-2 gap-8 mb-4">
        {articles.slice(0, 2).map((a, i) => (
          <div
            key={i}
            className="cursor-pointer group overflow-hidden"
            onClick={() => { onSearch?.(a.title); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
            <h3 className="text-lg font-bold text-black mb-1">{a.title}</h3>
            <p className="text-sm text-gray-500">Through {i === 0 ? 'Oct 10' : 'Nov 30'}</p>
          </div>
        ))}
      </div>
    )}
    {onMore && <div className="text-right mt-2"><button onClick={onMore} className="text-sm font-semibold text-black hover:underline">More on view →</button></div>}
  </>
);

const ArtistCircles: React.FC<{ artists: ArtistItem[]; articles?: ArticleItem[]; onViewArtist?: (a: ArtistItem) => void }> = ({ artists, articles = [], onViewArtist }) => (
  <div className="flex gap-8 mb-8">
    {artists.slice(0, 4).map((a, i) => (
      <div key={i} className="flex flex-col items-center text-center w-24 cursor-pointer" onClick={() => onViewArtist?.(a)}>
        <Img src={a.image_url || articles[i]?.image_url} alt={a.title} className="w-20 h-20 rounded-full object-cover mb-2" />
        <p className="text-xs text-gray-500">Artist</p>
        <p className="text-xs font-bold text-black leading-tight">{a.title}</p>
      </div>
    ))}
  </div>
);

const ArtworkGrid: React.FC<{ articles: ArticleItem[]; cols?: 3 | 5 }> = ({ articles, cols = 3 }) => (
  <div className={`grid grid-cols-${cols} gap-4`}>
    {articles.map((a, i) => (
      <div key={a.id ?? i} className="cursor-pointer group overflow-hidden">
        <Img src={a.image_url} alt={a.title} className={`${cols === 5 ? 'aspect-square' : 'aspect-[4/3]'} w-full object-cover mb-2 group-hover:scale-105 transition-transform duration-300`} />
        <p className="text-xs font-bold text-black leading-tight">{a.title}</p>
        {a.summary && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{a.summary}</p>}
      </div>
    ))}
  </div>
);

const ThematicCards: React.FC<{ items: ThematicExploration[]; articles?: ArticleItem[]; onViewTheme: (t: ThematicExploration) => void }> = ({ items, articles = [], onViewTheme }) => (
  <section className="max-w-[1280px] mx-auto px-12 py-12 border-b border-gray-100">
    <div className="grid grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 cursor-pointer hover:border-black transition-colors group overflow-hidden" onClick={() => onViewTheme(item)}>
          <Img src={articles[i]?.image_url} alt={item.title} className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="p-5">
            <h3 className="text-lg font-bold text-black mb-2">{item.title} →</h3>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <p className="text-sm font-semibold text-black">{item.count} works →</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BooksAndArticles: React.FC<{ articles: ArticleItem[] }> = ({ articles }) => (
  <Section label="Books and articles">
    <div className="space-y-8 mb-10">
      {articles.slice(0, 2).map((a, i) => (
        <div key={i} className="flex gap-5 items-start">
          <Img src={a.image_url} alt={a.title} className="w-20 h-24 object-cover shrink-0" />
          <div>
            <h3 className="text-base font-bold text-black mb-1">{a.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{a.summary || 'Edited by curators · Hardcover, 376 pages'}</p>
            <a href={`https://store.moma.org/search?q=${encodeURIComponent(a.title)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black hover:underline">Buy from the Design Store ↗</a>
          </div>
        </div>
      ))}
    </div>
    {articles.length > 2 && (
      <div className="grid grid-cols-2 gap-6">
        {articles.slice(2, 8).map((a, i) => (
          <div key={i} className="cursor-pointer group overflow-hidden">
            <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
            <h3 className="text-base font-bold text-black mb-1">{a.title}</h3>
            <p className="text-sm text-gray-500">{a.summary || 'March 20, 2020'}</p>
          </div>
        ))}
      </div>
    )}
  </Section>
);

const ArtAndArtistsSection: React.FC<{
  label?: string;
  overview?: string;
  artists: ArtistItem[];
  articles: ArticleItem[];
  thematicExplorations?: ThematicExploration[];
  onViewTheme?: (t: ThematicExploration) => void;
  onViewArtist?: (a: ArtistItem) => void;
}> = ({ label = 'Art and artists', overview, artists, articles, thematicExplorations, onViewTheme, onViewArtist }) => (
  <Section label={label}>
    {overview && <p className="text-base text-black mb-8">{overview}</p>}
    {thematicExplorations && thematicExplorations.length > 0 && (
      <div className="grid grid-cols-2 gap-4 mb-8">
        {thematicExplorations.map((item, i) => (
          <div key={i} className="border border-gray-300 p-5 cursor-pointer hover:border-black transition-colors group" onClick={() => onViewTheme?.(item)}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base font-bold text-black">{item.title} →</h3>
              <span className="text-sm text-gray-400">{item.count}</span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    )}
    {artists.length > 0 && <ArtistCircles artists={artists} articles={articles} onViewArtist={onViewArtist} />}
    {articles.length > 0 && (
      <>
        <ArtworkGrid articles={articles.slice(0, 5)} cols={5} />
        <div className="text-right mt-4">
          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-semibold text-black hover:underline">More art and artists →</button>
        </div>
      </>
    )}
  </Section>
);

// ─── Sub-pages ────────────────────────────────────────────────────────────────

const ArtistDetailPage: React.FC<{
  artist: ArtistItem; articles: ArticleItem[];
  query: string; setQuery: (q: string) => void; onSearch: (q: string) => void; isSearching: boolean;
  onBack: () => void;
}> = ({ artist, articles, query, setQuery, onSearch, isSearching, onBack }) => {
  const [wikiOpen, setWikiOpen] = React.useState(false);
  const [gettyOpen, setGettyOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching}
        breadcrumbs={[{ label: 'Home' }, { label: `Search: "${query}"`, onClick: onBack }, { label: artist.title }]} />

      <main className="max-w-[1280px] mx-auto px-12 py-12">

        {/* Name + circular photo */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-black mb-1">{artist.title}</h1>
            <p className="text-xl text-gray-500">American, 1908–1984</p>
          </div>
          <Img
            src={artist.image_url || articles[0]?.image_url}
            alt={artist.title}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Full-width hero artwork */}
        {articles[0]?.image_url && (
          <div className="w-full h-[400px] overflow-hidden mb-12">
            <img src={articles[0].image_url!} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Sidebar + bio */}
        <div className="grid grid-cols-6 gap-8 mb-16">

          {/* Col 1: sidebar nav */}
          <div className="col-span-1 text-sm">
            <div className="space-y-2 mb-8">
              {['Works', 'Exhibitions', 'Publications', 'Media'].map(item => (
                <p key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:underline">{item} ↓</a>
                </p>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400 mb-2">Associated art terms include</p>
              <a href="#" className="text-xs hover:underline text-black">Abstract Expressionism and Cubism.</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a href="#" className="text-xs hover:underline text-black">Read an interview with<br />{artist.title} ↗</a>
            </div>
          </div>

          {/* Cols 2–6: bio paragraphs */}
          <div className="col-span-5">
            {/* Split summary into paragraphs for visual richness */}
            {artist.summary ? (
              artist.summary.split('. ').reduce<string[][]>((acc, s, i) => {
                const chunk = Math.floor(i / 3);
                if (!acc[chunk]) acc[chunk] = [];
                acc[chunk].push(s);
                return acc;
              }, []).map((sentences, i) => (
                <p key={i} className="text-base leading-relaxed text-black mb-5">
                  {sentences.join('. ')}{sentences[sentences.length - 1].endsWith('.') ? '' : '.'}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed text-black mb-5">{artist.summary}</p>
            )}

            {/* Source credit line */}
            <p className="text-xs text-gray-400 mt-2 mb-8">Frances Further, Managing Editor, Creative Team</p>

            {/* Collapsible links */}
            <div className="border-t border-gray-200 pt-4 space-y-0">
              <button
                onClick={() => setWikiOpen(v => !v)}
                className="flex items-center justify-between w-full py-3 border-b border-gray-200 text-sm hover:text-[#e35c1a] transition-colors"
              >
                <span>Wikipedia entry</span>
                <ChevronDown size={14} className={`transition-transform ${wikiOpen ? 'rotate-180' : ''}`} />
              </button>
              {wikiOpen && (
                <div className="py-3 px-1 border-b border-gray-200 text-sm text-gray-500">
                  Wikipedia content would appear here.
                </div>
              )}
              <button
                onClick={() => setGettyOpen(v => !v)}
                className="flex items-center justify-between w-full py-3 border-b border-gray-200 text-sm hover:text-[#e35c1a] transition-colors"
              >
                <span>Getty record</span>
                <ChevronDown size={14} className={`transition-transform ${gettyOpen ? 'rotate-180' : ''}`} />
              </button>
              {gettyOpen && (
                <div className="py-3 px-1 border-b border-gray-200 text-sm text-gray-500">
                  Getty record content would appear here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Works */}
        <section id="works" className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-1">Works</h2>
          <p className="text-sm text-gray-400 mb-6">{articles.length} works online</p>
          <div className="grid grid-cols-5 gap-4 mb-2">
            {articles.slice(0, 5).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-square w-full object-cover mb-2 group-hover:scale-105 transition-transform duration-300" />
                <p className="text-xs font-bold text-black">{artist.title}</p>
                <p className="text-xs text-gray-600 italic line-clamp-1">{a.title}</p>
                <p className="text-xs text-black">1964</p>
                <p className="text-xs font-semibold text-[#e35c1a]">On view</p>
                <p className="text-xs text-[#e35c1a]">Gallery 402</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {articles.slice(5, 10).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-square w-full object-cover mb-2 group-hover:scale-105 transition-transform duration-300" />
                <p className="text-xs font-bold text-black">{artist.title}</p>
                <p className="text-xs text-gray-600 italic line-clamp-1">{a.title}</p>
                <p className="text-xs text-black">1964</p>
                <p className="text-xs text-gray-400">Not on view</p>
              </div>
            ))}
          </div>
          <button className="text-sm font-semibold text-black hover:underline">Show more results +</button>
        </section>

        {/* Exhibitions */}
        <section id="exhibitions" className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-6">Exhibitions</h2>
          <div className="grid grid-cols-4 gap-6 mb-2">
            {articles.slice(0, 4).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
                <p className="text-sm font-bold text-black">{a.title}</p>
                <p className="text-xs text-gray-500">Fall 2019–Summer 2021</p>
                <p className="text-xs text-gray-500">Collection gallery · MoMA</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-6 mb-6">
            {articles.slice(4, 8).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
                <p className="text-sm font-bold text-black">{a.title}</p>
                <p className="text-xs text-gray-500">Fall 2019–Summer 2021</p>
                <p className="text-xs text-gray-500">Collection gallery · MoMA</p>
              </div>
            ))}
          </div>
          <button className="text-sm font-semibold text-black hover:underline">View all 20 exhibitions +</button>
        </section>

        {/* Audio teaser */}
        <section id="audio" className="border-t border-gray-200 pt-12 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Audio</h2>
              <p className="text-sm text-gray-500">Audio guides and interviews related to {artist.title}'s work at MoMA.</p>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Related artist</p>
              <p className="text-base font-bold text-black">Constantin Brâncuși</p>
              <p className="text-sm text-gray-500">Endless Column</p>
              <p className="text-sm text-gray-400">1937</p>
            </div>
          </div>
        </section>

      </main>
      <MoMAFooter />
    </div>
  );
};

const OnViewPage: React.FC<{
  onViewItems: OnViewItem[]; articles: ArticleItem[];
  query: string; setQuery: (q: string) => void; onSearch: (q: string) => void; isSearching: boolean;
  onBack: () => void;
}> = ({ onViewItems, articles, query, setQuery, onSearch, isSearching, onBack }) => (
  <div className="min-h-screen bg-white">
    <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching}
      breadcrumbs={[{ label: 'Home' }, { label: `Search: "${query}"`, onClick: onBack }, { label: 'On view' }]} />
    <main className="max-w-[1280px] mx-auto px-12 py-12">
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <h1 className="text-4xl font-bold text-black mb-4">On view</h1>
          <p className="text-base text-black mb-8">{onViewItems.reduce((s, i) => s + i.count, 0)} works currently displayed across {onViewItems.length} galleries.</p>
          <div className="grid grid-cols-2 gap-4 mb-12">
            {onViewItems.map((item, i) => (
              <div key={i} className="border border-gray-300 p-6 cursor-pointer hover:border-black transition-colors group">
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-bold text-black">Floor {item.floor} →</h3>
                  <span className="text-sm text-gray-400">{item.count}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            {articles.slice(0, 4).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform" />
                <h3 className="text-xl font-bold text-black mb-1">{a.title}</h3>
                <p className="text-sm text-gray-500">Through {i === 0 ? 'Oct 10' : 'Nov 30'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="border border-gray-200 p-5 sticky top-6">
            <div className="flex justify-between mb-3">
              <h3 className="text-base font-bold text-black">Planning a visit?</h3>
              <X size={16} className="text-gray-400 cursor-pointer" />
            </div>
            <p className="text-sm text-gray-600 mb-4">{onViewItems.reduce((s, i) => s + i.count, 0)} works on display across {onViewItems.length} galleries.</p>
            <div className="border border-gray-200 p-4 mb-3">
              <p className="text-sm font-bold mb-1">Helen Levitt Exhibition</p>
              <p className="text-xs text-gray-600">Floor 2, Gallery 10 • Through March 15 • Lyrical NYC street photography</p>
            </div>
            <div className="border border-gray-200 p-4">
              <p className="text-sm font-bold mb-1">Group admission →</p>
              <p className="text-xs text-gray-600">Professional art historians available for guided Museum tours.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <MoMAFooter />
  </div>
);

const HistoryPage: React.FC<{
  historyItems: HistoryItem[]; articles: ArticleItem[];
  query: string; setQuery: (q: string) => void; onSearch: (q: string) => void; isSearching: boolean;
  onBack: () => void;
}> = ({ historyItems, articles, query, setQuery, onSearch, isSearching, onBack }) => (
  <div className="min-h-screen bg-white">
    <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching}
      breadcrumbs={[{ label: 'Home' }, { label: `Search: "${query}"`, onClick: onBack }, { label: 'History' }]} />
    <main className="max-w-[1280px] mx-auto px-12 py-12">
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <h1 className="text-4xl font-bold text-black mb-8">History</h1>
          <p className="text-base leading-relaxed text-black mb-6">For much of photography's 170-year history, women have contributed to its development as both an art form and a means of communication, expanding its parameters by experimenting with every aspect of the medium.</p>
          <p className="text-base leading-relaxed text-black mb-10">MoMA's collection traces how women photographers fundamentally shaped modern photography—from the Pictorialists of the late 19th century through the documentary tradition of the Depression era, the conceptual revolution of the 1970s, and into the digital present.</p>
          <div className="space-y-8 mb-12">
            {articles.slice(0, 3).map((a, i) => (
              <div key={i} className="flex gap-5 items-start">
                <Img src={a.image_url} alt={a.title} className="w-20 h-24 object-cover shrink-0" />
                <div>
                  <h3 className="text-base font-bold mb-1">{a.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{a.summary || 'Edited by curators · Hardcover'}</p>
                  <a href={`https://store.moma.org/search?q=${encodeURIComponent(a.title)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">Buy from the Design Store ↗</a>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            {articles.slice(3, 9).map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-3 group-hover:scale-105 transition-transform" />
                <h3 className="text-base font-bold mb-1">{a.title}</h3>
                <p className="text-sm text-gray-500">{a.summary || 'March 20, 2020'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="border border-gray-200 p-5 sticky top-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-base font-bold">Explore next:</h3>
              <X size={16} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-3">
              {historyItems.map((item, i) => (
                <div key={i} className="border border-gray-200 p-4 cursor-pointer hover:border-black transition-colors group">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-bold">{item.period} →</p>
                    <span className="text-xs text-gray-400">14</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    <MoMAFooter />
  </div>
);

const ThemeDetailPage: React.FC<{
  theme: ThematicExploration; articles: ArticleItem[];
  query: string; setQuery: (q: string) => void; onSearch: (q: string) => void; isSearching: boolean;
  onBack: () => void; onViewItems?: OnViewItem[];
}> = ({ theme, articles, query, setQuery, onSearch, isSearching, onBack, onViewItems }) => (
  <div className="min-h-screen bg-white">
    <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching}
      breadcrumbs={[{ label: 'Home' }, { label: `Search: "${query}"`, onClick: onBack }, { label: theme.title }]} />
    <main className="max-w-[1280px] mx-auto px-12 py-12">
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <h1 className="text-4xl font-bold mb-4">{theme.title}</h1>
          <p className="text-base leading-relaxed text-black mb-10">{theme.description}</p>
          <div className="grid grid-cols-3 gap-4">
            {articles.map((a, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden">
                <Img src={a.image_url} alt={a.title} className="aspect-square w-full object-cover mb-2 group-hover:scale-105 transition-transform" />
                <p className="text-xs font-bold leading-tight">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">Not on view</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="border border-gray-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</h3>
              <X size={16} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-3">
              {[{ label: 'Has image', checked: true }, { label: 'On view', checked: true }, { label: 'Recent acquisition', checked: false }].map(f => (
                <label key={f.label} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked={f.checked} className="accent-black" />{f.label}
                </label>
              ))}
              <div className="pt-3 space-y-2">
                {['Category', 'Classification', 'Date', 'Place'].map(f => (
                  <div key={f} className="flex justify-between items-center border border-gray-200 px-3 py-2 cursor-pointer hover:border-black">
                    <span className="text-sm">{f}</span><ChevronDown size={14} />
                  </div>
                ))}
              </div>
              <button className="text-sm hover:underline mt-2">↗ Save search</button>
            </div>
          </div>
          {onViewItems && onViewItems.length > 0 && (
            <div className="border border-gray-200 p-5">
              <div className="flex justify-between mb-3">
                <h3 className="text-base font-bold">Planning a visit?</h3>
                <X size={16} className="text-gray-400 cursor-pointer" />
              </div>
              <p className="text-xs text-gray-600 mb-4">{onViewItems.reduce((s, i) => s + i.count, 0)} works on display.</p>
              <div className="border border-gray-200 p-4 mb-3">
                <p className="text-sm font-bold mb-1">Helen Levitt Exhibition</p>
                <p className="text-xs text-gray-600">Floor 2, Gallery 10 • Through March 15</p>
              </div>
              <div className="border border-gray-200 p-4">
                <p className="text-sm font-bold mb-1">Group admission →</p>
                <p className="text-xs text-gray-600">Guided Museum tours available.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
    <MoMAFooter />
  </div>
);

// ─── Welcome / Landing Screen ─────────────────────────────────────────────────

const WelcomeScreen: React.FC<{
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isSearching: boolean;
}> = ({ query, setQuery, onSearch, isSearching }) => {
  const suggested = {
    Artists: ['Cindy Sherman', 'Lee Krasner', 'Dorothea Lange', 'Diane Arbus', 'Berenice Abbott'],
    Themes: ['Women photographers', 'Abstract expressionism', 'Fauvism', 'Surrealism', 'Contemporary art'],
    Exhibitions: ['Photography exhibitions', 'Our Selves', 'Femme Camp', 'Lively art', 'Drawings and prints'],
  };

  const featured = ['Cindy Sherman', 'Women photographers', 'Fauvism', 'Photography exhibitions', 'Abstract expressionism', 'Surrealism', 'Lee Krasner', 'Contemporary art'];

  return (
    <div className="min-h-screen bg-white">
      <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching} showSearchBar={false} />

      <div className="max-w-[1280px] mx-auto px-12 py-16">
        {/* Big search input */}
        <div className="mb-16">
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-medium">Search the collection</p>
          <div className="relative border-b-2 border-black pb-2 mb-3">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && query.trim() && onSearch(query)}
              className="w-full text-5xl font-bold text-black bg-transparent pr-12 focus:outline-none placeholder-gray-300"
              placeholder="Artist, theme, exhibition..."
              autoFocus
            />
            <button
              onClick={() => query.trim() && onSearch(query)}
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              {isSearching
                ? <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-black" />
                : <Search size={28} className="text-black" />}
            </button>
          </div>
          <p className="text-sm text-gray-400">Explore over 200,000 works, artists, and exhibitions from MoMA's collection.</p>
        </div>

        {/* Suggested searches — 3 columns */}
        <div className="grid grid-cols-3 gap-12 mb-16 border-t border-gray-100 pt-12">
          {Object.entries(suggested).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">{category}</p>
              <div className="space-y-3">
                {items.map(s => (
                  <button
                    key={s}
                    onClick={() => onSearch(s)}
                    className="block text-left text-base text-black hover:text-[#e35c1a] hover:underline transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured pill tags */}
        <div className="border-t border-gray-100 pt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Featured searches</p>
          <div className="flex flex-wrap gap-3">
            {featured.map(s => (
              <button
                key={s}
                onClick={() => onSearch(s)}
                className="px-4 py-2 border border-gray-300 text-sm text-black hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <MoMAFooter />
    </div>
  );
};

// ─── Main Search Results Page ─────────────────────────────────────────────────

const SearchResultsPage: React.FC<{
  query: string; setQuery: (q: string) => void; onSearch: (q: string) => void; isSearching: boolean;
  data: EditorialResponse;
  onViewArtist: (a: ArtistItem) => void;
  onViewOnView: () => void;
  onViewHistory: () => void;
  onViewTheme: (t: ThematicExploration) => void;
}> = ({ query, setQuery, onSearch, isSearching, data, onViewArtist, onViewOnView, onViewHistory, onViewTheme }) => {

  const header = <MoMAHeader query={query} setQuery={setQuery} onSearch={onSearch} isSearching={isSearching} displayMode={true} />;
  // Always have an artist object — fall back to query name so the More button never silently fails
  const artist: ArtistItem = data.artists?.[0] ?? {
    title: query,
    summary: data.overview,
    image_url: data.articles?.[0]?.image_url ?? null,
  };

  // ── ARTIST layout ──────────────────────────────────────────────────────────
  if (data.layout_type === 'artist') {
    return (
      <div className="min-h-screen bg-white">
        {header}
        <main>
          {/* 1. About the artist */}
          <Section label="About the artist">
            <div className="grid grid-cols-5 gap-6">
              <div className="col-span-1 flex flex-col items-center">
                <Img
                  src={artist.image_url || data.articles[0]?.image_url}
                  alt={artist.title}
                  className="w-28 h-28 rounded-full object-cover mb-2"
                />
                <p className="text-xs text-gray-500">Artist</p>
              </div>
              <div className="col-span-4">
                <p className="text-base leading-relaxed text-black mb-8">{artist.summary || data.overview}</p>
                <div className="grid grid-cols-3 gap-5 mb-5">
                  {data.articles?.slice(0, 3).map((a, i) => (
                    <div key={a.id ?? i}>
                      {i < 2 && <p className="text-xs font-semibold text-[#e35c1a] mb-1.5">New on view</p>}
                      <Img src={a.image_url} alt={a.title} className="aspect-[4/3] w-full object-cover mb-2" />
                      <p className="text-xs font-bold text-black">{artist.title}</p>
                      <p className="text-xs text-gray-600 italic line-clamp-1">{a.title}</p>
                      {i < 2 && <p className="text-xs font-semibold text-[#e35c1a]">On view · Gallery 402</p>}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <button
                    onClick={() => onViewArtist(artist)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-black text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
                  >
                    More →
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. Related art and artists */}
          <ArtAndArtistsSection
            label="Related art and artists"
            overview={data.overview}
            artists={data.artists}
            articles={data.articles}
            thematicExplorations={data.thematic_explorations}
            onViewTheme={onViewTheme}
            onViewArtist={onViewArtist}
          />

          {/* 3. Brief history */}
          {data.history && data.history.length > 0 && (
            <Section label={`A brief history on ${query}`}>
              <HistoryCards items={data.history} onMore={onViewHistory} onSearch={onSearch} />
            </Section>
          )}

          {/* 4. On view */}
          {data.on_view && data.on_view.length > 0 && (
            <Section label="On view">
              <OnViewCards items={data.on_view} articles={data.articles} onMore={onViewOnView} onSearch={onSearch} />
            </Section>
          )}

          {/* Journey end */}
          <div className="max-w-[1280px] mx-auto px-12 py-20 text-center">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Continue exploring</p>
            <p className="text-2xl font-light text-black mb-8">Where does this take you next?</p>
            <div className="flex flex-wrap justify-center gap-3">
              {(data.thematic_explorations ?? []).map(t => (
                <button
                  key={t.title}
                  onClick={() => { onSearch(t.title); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-5 py-2.5 border border-gray-300 text-sm text-black hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  {t.title} →
                </button>
              ))}
            </div>
          </div>
        </main>
        <MoMAFooter />
      </div>
    );
  }

  // ── EXHIBITION layout ──────────────────────────────────────────────────────
  if (data.layout_type === 'exhibition') {
    return (
      <div className="min-h-screen bg-white">
        {header}
        <main>
          {/* 1. Overview */}
          {data.overview && (
            <Section label="Overview">
              <p className="text-base leading-relaxed text-black">{data.overview}</p>
            </Section>
          )}

          {/* 2. On view */}
          {data.on_view && data.on_view.length > 0 && (
            <Section label="On view">
              <OnViewCards items={data.on_view} articles={data.articles.slice(0, 2)} onMore={onViewOnView} onSearch={onSearch} />
            </Section>
          )}

          {/* 3. Art and artists */}
          <ArtAndArtistsSection
            artists={data.artists}
            articles={data.articles}
            thematicExplorations={data.thematic_explorations}
            onViewTheme={onViewTheme}
            onViewArtist={onViewArtist}
          />

          {/* 4. History */}
          {data.history && data.history.length > 0 && (
            <Section label="History">
              <HistoryCards items={data.history} onMore={onViewHistory} onSearch={onSearch} />
            </Section>
          )}

          {/* 5. Books and articles */}
          {data.articles && data.articles.length > 0 && (
            <BooksAndArticles articles={data.articles} />
          )}
        </main>
        <MoMAFooter />
      </div>
    );
  }

  // ── GENERAL layout ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      {header}
      <main>

        {/* Overview hero — sets editorial tone */}
        {data.overview && <OverviewHero query={query} overview={data.overview} />}

        {/* 1. Explore — thematic entry points */}
        {data.thematic_explorations && data.thematic_explorations.length > 0 && (
          <div id="explore">
            <ThematicCards items={data.thematic_explorations} articles={data.articles} onViewTheme={onViewTheme} />
          </div>
        )}

        {/* 2. History */}
        {data.history && data.history.length > 0 && (
          <Section label="History" id="history">
            <HistoryCards items={data.history} onMore={onViewHistory} onSearch={onSearch} />
          </Section>
        )}

        {/* 3. Art and artists */}
        <div id="art-&-artists">
          <ArtAndArtistsSection
            artists={data.artists}
            articles={data.articles}
            onViewArtist={onViewArtist}
          />
        </div>

        {/* 4. On view */}
        {data.on_view && data.on_view.length > 0 && (
          <Section label="On view" id="on-view">
            <OnViewCards items={data.on_view} articles={data.articles} onMore={onViewOnView} onSearch={onSearch} />
          </Section>
        )}

        {/* Journey end — invite next search */}
        <div className="max-w-[1280px] mx-auto px-12 py-20 text-center">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Continue exploring</p>
          <p className="text-2xl font-light text-black mb-8">Where does this take you next?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {(data.thematic_explorations ?? []).map(t => (
              <button
                key={t.title}
                onClick={() => { onSearch(t.title); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-5 py-2.5 border border-gray-300 text-sm text-black hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                {t.title} →
              </button>
            ))}
          </div>
        </div>
      </main>
      <MoMAFooter />
    </div>
  );
};

// ─── App Shell ────────────────────────────────────────────────────────────────

type Page =
  | { type: 'search' }
  | { type: 'artist'; artist: ArtistItem }
  | { type: 'on-view' }
  | { type: 'history' }
  | { type: 'theme'; theme: ThematicExploration };

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [editorialData, setEditorialData] = useState<EditorialResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState<Page>({ type: 'search' });

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setIsSearching(true);
    setPage({ type: 'search' });
    try {
      const resp = await fetch(`https://moma-search-prototype-production.up.railway.app/search/editorial?q=${encodeURIComponent(q)}`);      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const data = await resp.json();
      console.log('API response:', data);
      setEditorialData(data);
    } catch (err) {
      console.error('Search failed', err);
      setEditorialData(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    performSearch(q);
  }, [performSearch]);

  const shared = { query, setQuery, onSearch: handleSearch, isSearching };

  // Show welcome screen when no search has been made
  if (!editorialData && !isSearching) {
    return <WelcomeScreen {...shared} />;
  }

  // Loading state
  if (!editorialData && isSearching) {
    return (
      <div className="min-h-screen bg-white">
        <MoMAHeader {...shared} />
        <div className="max-w-[1280px] mx-auto px-12 py-24 text-center text-gray-400">Searching...</div>
      </div>
    );
  }

  if (!editorialData) return null;

  if (page.type === 'artist') return <ArtistDetailPage {...shared} artist={page.artist} articles={editorialData.articles} onBack={() => setPage({ type: 'search' })} />;
  if (page.type === 'on-view') return <OnViewPage {...shared} onViewItems={editorialData.on_view ?? []} articles={editorialData.articles} onBack={() => setPage({ type: 'search' })} />;
  if (page.type === 'history') return <HistoryPage {...shared} historyItems={editorialData.history ?? []} articles={editorialData.articles} onBack={() => setPage({ type: 'search' })} />;
  if (page.type === 'theme') return <ThemeDetailPage {...shared} theme={page.theme} articles={editorialData.articles} onBack={() => setPage({ type: 'search' })} onViewItems={editorialData.on_view} />;

  return (
    <SearchResultsPage
      {...shared}
      data={editorialData}
      onViewArtist={a => setPage({ type: 'artist', artist: a })}
      onViewOnView={() => setPage({ type: 'on-view' })}
      onViewHistory={() => setPage({ type: 'history' })}
      onViewTheme={t => setPage({ type: 'theme', theme: t })}
    />
  );
};

export default App;
