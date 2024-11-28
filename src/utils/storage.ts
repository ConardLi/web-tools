const STORAGE_KEYS = {
  SEARCH_ENGINE: 'preferred_search_engine',
  FAVORITE_TOOLS: 'favorite_tools',
  FAVORITE_WEBSITES: 'favorite_websites',
  FAVORITE_AI_WEBSITES: 'favorite_ai_websites',
} as const;

export const getStoredSearchEngine = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.SEARCH_ENGINE);
};

export const setStoredSearchEngine = (engine: string): void => {
  localStorage.setItem(STORAGE_KEYS.SEARCH_ENGINE, engine);
};

// 默认收藏的工具
const DEFAULT_FAVORITE_TOOLS = ['json-formatter', 'color-palette', 'image-converter'];

// 默认收藏的网站
const DEFAULT_FAVORITE_WEBSITES = ['google', 'github', 'chatgpt'];

// 默认收藏的 AI 网站
const DEFAULT_FAVORITE_AI_WEBSITES: string[] = [];

// 工具收藏相关函数
export const getFavoriteTools = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_TOOLS);
  if (!stored) {
    setFavoriteTools(DEFAULT_FAVORITE_TOOLS);
    return DEFAULT_FAVORITE_TOOLS;
  }
  return JSON.parse(stored);
};

export const setFavoriteTools = (tools: string[]): void => {
  localStorage.setItem(STORAGE_KEYS.FAVORITE_TOOLS, JSON.stringify(tools));
};

export const toggleFavoriteTool = (toolId: string): string[] => {
  const favorites = getFavoriteTools();
  const index = favorites.indexOf(toolId);
  
  if (index === -1) {
    favorites.push(toolId);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteTools(favorites);
  return favorites;
};

export const isFavoriteTool = (toolId: string): boolean => {
  const favorites = getFavoriteTools();
  return favorites.includes(toolId);
};

// 网站收藏相关函数
export const getFavoriteWebsites = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_WEBSITES);
  if (!stored) {
    setFavoriteWebsites(DEFAULT_FAVORITE_WEBSITES);
    return DEFAULT_FAVORITE_WEBSITES;
  }
  return JSON.parse(stored);
};

export const setFavoriteWebsites = (websites: string[]): void => {
  localStorage.setItem(STORAGE_KEYS.FAVORITE_WEBSITES, JSON.stringify(websites));
};

export const toggleFavoriteWebsite = (websiteId: string): string[] => {
  const favorites = getFavoriteWebsites();
  const index = favorites.indexOf(websiteId);
  
  if (index === -1) {
    favorites.push(websiteId);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteWebsites(favorites);
  return favorites;
};

export const isFavoriteWebsite = (websiteId: string): boolean => {
  const favorites = getFavoriteWebsites();
  return favorites.includes(websiteId);
};

// AI 网站收藏相关函数
export const getFavoriteAIWebsites = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES);
  if (!stored) {
    setFavoriteAIWebsites(DEFAULT_FAVORITE_AI_WEBSITES);
    return DEFAULT_FAVORITE_AI_WEBSITES;
  }
  return JSON.parse(stored);
};

export const setFavoriteAIWebsites = (websites: string[]): void => {
  localStorage.setItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES, JSON.stringify(websites));
};

export const toggleFavoriteAIWebsite = (websiteTitle: string): string[] => {
  const favorites = getFavoriteAIWebsites();
  const index = favorites.indexOf(websiteTitle);
  
  if (index === -1) {
    favorites.push(websiteTitle);
  } else {
    favorites.splice(index, 1);
  }
  
  setFavoriteAIWebsites(favorites);
  return favorites;
};

export const isFavoriteAIWebsite = (websiteTitle: string): boolean => {
  const favorites = getFavoriteAIWebsites();
  return favorites.includes(websiteTitle);
};
