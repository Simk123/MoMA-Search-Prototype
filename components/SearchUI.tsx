import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { MOMA_DATA } from '../data/momaData';

interface SearchUIProps {
  initialQuery: string;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

// Generate a comprehensive list of search terms from local data
const PREDEFINED_TERMS = [
  "Women photographers",
  "Cindy Sherman",
  "Untitled Film Stills",
  "Modern Art",
  "Abstract Expressionism",
  "Surrealism",
  "Photography",
  "Cubism",
  "Pop Art",
  "Film",
  "Architecture",
  "Design"
];

const SEARCH_TERMS = Array.from(new Set([
  ...PREDEFINED_TERMS,
  ...MOMA_DATA.artists.map(a => a.name),
  ...MOMA_DATA.artworks.map(w => w.title),
  ...MOMA_DATA.exhibitions.map(e => e.title),
  ...MOMA_DATA.movements.map(m => m.name),
]));

export const SearchUI: React.FC<SearchUIProps> = ({ initialQuery, onSearch, isSearching }) => {
  const [value, setValue] = useState(initialQuery);
  const [debouncedValue, setDebouncedValue] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 600);
    return () => clearTimeout(handler);
  }, [value]);

  // Trigger search when debounced value changes
  useEffect(() => {
    // Skip the first render to avoid double fetching on app load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedValue.trim()) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  // Autocomplete filtering
  useEffect(() => {
    if (value.trim().length > 1) {
      const lowerValue = value.toLowerCase();
      const matches = SEARCH_TERMS.filter(term => 
        term.toLowerCase().includes(lowerValue) && 
        term.toLowerCase() !== lowerValue // Don't show if exactly what user typed
      ).slice(0, 5);
      
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (term: string) => {
    setValue(term);
    setDebouncedValue(term); // Trigger search immediately
    setShowSuggestions(false);
  };

  return (
    <div className="px-6 md:px-12 py-8 md:py-12 border-b border-gray-200" ref={containerRef}>
       <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-4">
          <a href="#" className="hover:underline">Home</a>
          <span className="text-gray-400">▶</span>
          <span>Search: "{value}"</span>
       </div>

       <div className="relative group">
         <input 
           type="text" 
           value={value}
           onChange={(e) => {
             setValue(e.target.value);
             setShowSuggestions(true);
           }}
           onFocus={() => {
             if (value.trim().length > 1 && suggestions.length > 0) {
               setShowSuggestions(true);
             }
           }}
           className="w-full text-4xl md:text-6xl font-bold text-[#ff5722] placeholder-[#ff5722] border-b-2 border-transparent focus:border-black focus:outline-none py-2 bg-transparent transition-all"
           placeholder="Search..."
           autoComplete="off"
         />
         
         <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {isSearching ? (
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            ) : (
               <Search size={32} className="text-[#ff5722]" />
            )}
         </div>

         {/* Autocomplete Dropdown */}
         {showSuggestions && suggestions.length > 0 && (
           <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 mt-1 z-50 animate-[fadeIn_0.2s_ease-out]">
             {suggestions.map((term, idx) => (
               <div 
                 key={idx}
                 onClick={() => handleSuggestionClick(term)}
                 className="px-6 py-4 text-xl md:text-2xl font-medium cursor-pointer hover:bg-gray-50 hover:text-[#ff5722] transition-colors border-b border-gray-100 last:border-0"
               >
                 {term}
               </div>
             ))}
           </div>
         )}
       </div>
    </div>
  );
};
