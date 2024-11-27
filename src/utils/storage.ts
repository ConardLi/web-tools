const STORAGE_KEYS = {
  SEARCH_ENGINE: 'preferred_search_engine',
} as const;

export const getStoredSearchEngine = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.SEARCH_ENGINE);
};

export const setStoredSearchEngine = (engine: string): void => {
  localStorage.setItem(STORAGE_KEYS.SEARCH_ENGINE, engine);
};
