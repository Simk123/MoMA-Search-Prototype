export enum SectionType {
  OVERVIEW = 'OVERVIEW',
  ARTIST_BIO = 'ARTIST_BIO',
  THEMATIC_EXPLORATIONS = 'THEMATIC_EXPLORATIONS',
  RELATED_ART = 'RELATED_ART',
  HISTORY = 'HISTORY',
  ON_VIEW = 'ON_VIEW',
  BOOKS = 'BOOKS'
}

export type ViewState = 
  | { type: 'SEARCH' }
  | { type: 'ARTIST_DETAIL'; data: SectionData }
  | { type: 'ON_VIEW_DETAIL'; data: SectionData }
  | { type: 'HISTORY_DETAIL'; data: SectionData }
  | { type: 'COLLECTION_DETAIL'; data: SectionData };

export interface SectionData {
  id: string;
  type: SectionType;
  title?: string;
  content?: any; // Flexible payload for different section structures
}

export interface SearchResult {
  query: string;
  sections: SectionData[];
}
