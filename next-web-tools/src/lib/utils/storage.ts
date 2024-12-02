const STORAGE_KEYS = {
  SEARCH_ENGINE: 'web_tools_search_engine',
  FAVORITE_TOOLS: 'web_tools_favorite_tools',
  FAVORITE_WEBSITES: 'web_tools_favorite_websites',
  FAVORITE_AI_WEBSITES: 'web_tools_favorite_ai_websites',
  SETTINGS: 'web_tools_settings',
} as const

// 默认收藏的工具
const DEFAULT_FAVORITE_TOOLS = ['json-formatter', 'color-palette', 'image-converter']

// 默认收藏的网站
const DEFAULT_FAVORITE_WEBSITES = ['google', 'github', 'chatgpt']

// 默认收藏的 AI 网站
const DEFAULT_FAVORITE_AI_WEBSITES: string[] = []

export function getStoredSearchEngine(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEYS.SEARCH_ENGINE)
}

export function setStoredSearchEngine(engine: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SEARCH_ENGINE, engine)
}

// 工具收藏相关函数
export function getFavoriteTools(): string[] {
  if (typeof window === 'undefined') return DEFAULT_FAVORITE_TOOLS
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_TOOLS)
  if (!stored) {
    setFavoriteTools(DEFAULT_FAVORITE_TOOLS)
    return DEFAULT_FAVORITE_TOOLS
  }
  return JSON.parse(stored)
}

export function setFavoriteTools(tools: string[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.FAVORITE_TOOLS, JSON.stringify(tools))
}

export function toggleFavoriteTool(toolId: string): string[] {
  const favorites = getFavoriteTools()
  const index = favorites.indexOf(toolId)
  
  if (index === -1) {
    favorites.push(toolId)
  } else {
    favorites.splice(index, 1)
  }
  
  setFavoriteTools(favorites)
  return favorites
}

export function isFavoriteTool(toolId: string): boolean {
  const favorites = getFavoriteTools()
  return favorites.includes(toolId)
}

// 网站收藏相关函数
export function getFavoriteWebsites(): string[] {
  if (typeof window === 'undefined') return DEFAULT_FAVORITE_WEBSITES
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_WEBSITES)
  if (!stored) {
    setFavoriteWebsites(DEFAULT_FAVORITE_WEBSITES)
    return DEFAULT_FAVORITE_WEBSITES
  }
  return JSON.parse(stored)
}

export function setFavoriteWebsites(websites: string[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.FAVORITE_WEBSITES, JSON.stringify(websites))
}

export function toggleFavoriteWebsite(websiteId: string): string[] {
  const favorites = getFavoriteWebsites()
  const index = favorites.indexOf(websiteId)
  
  if (index === -1) {
    favorites.push(websiteId)
  } else {
    favorites.splice(index, 1)
  }
  
  setFavoriteWebsites(favorites)
  return favorites
}

export function isFavoriteWebsite(websiteId: string): boolean {
  const favorites = getFavoriteWebsites()
  return favorites.includes(websiteId)
}

// AI 网站收藏相关函数
export function getFavoriteAIWebsites(): string[] {
  if (typeof window === 'undefined') return DEFAULT_FAVORITE_AI_WEBSITES
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES)
  if (!stored) {
    setFavoriteAIWebsites(DEFAULT_FAVORITE_AI_WEBSITES)
    return DEFAULT_FAVORITE_AI_WEBSITES
  }
  return JSON.parse(stored)
}

export function setFavoriteAIWebsites(websites: string[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.FAVORITE_AI_WEBSITES, JSON.stringify(websites))
}

export function toggleFavoriteAIWebsite(websiteTitle: string): string[] {
  const favorites = getFavoriteAIWebsites()
  const index = favorites.indexOf(websiteTitle)
  
  if (index === -1) {
    favorites.push(websiteTitle)
  } else {
    favorites.splice(index, 1)
  }
  
  setFavoriteAIWebsites(favorites)
  return favorites
}

export function isFavoriteAIWebsite(websiteTitle: string): boolean {
  const favorites = getFavoriteAIWebsites()
  return favorites.includes(websiteTitle)
}

export function getStoredSettings<T>(): T | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
  try {
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setStoredSettings<T>(settings: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
}
