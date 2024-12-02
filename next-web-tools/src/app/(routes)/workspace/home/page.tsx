'use client'

import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Grid } from '@mui/material'
import Search from '@/components/workspace/Search'
import TimeDisplay from '@/components/workspace/TimeDisplay'
import ToolCard from '@/components/common/ToolCard'
import SimpleAICard from '@/components/common/SimpleAICard'
import { TOOLS } from '@/constants/tools'
import { WEBSITES } from '@/constants/websites'
import { AI_WEBSITES_UNIQUE } from '@/constants/ai'
import {
  getFavoriteTools,
  getFavoriteWebsites,
  getFavoriteAIWebsites,
  setFavoriteTools,
  setFavoriteWebsites,
  setFavoriteAIWebsites,
  toggleFavoriteTool,
  toggleFavoriteWebsite,
  toggleFavoriteAIWebsite,
} from '@/lib/utils/storage'

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(0, 2),
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}))

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))

const ModuleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  letterSpacing: '0.5px',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}))

export default function HomePage() {
  const [favoriteTools, setFavoriteTools] = useState<string[]>([])
  const [favoriteWebsites, setFavoriteWebsites] = useState<string[]>([])
  const [favoriteAIWebsites, setFavoriteAIWebsites] = useState<string[]>([])
  const [searchEngine, setSearchEngine] = useState('google')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setFavoriteTools(getFavoriteTools())
    setFavoriteWebsites(getFavoriteWebsites())
    setFavoriteAIWebsites(getFavoriteAIWebsites())
  }, [])

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, '_blank')
  }

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleToolFavoriteToggle = (toolId: string) => {
    const newFavorites = toggleFavoriteTool(toolId)
    setFavoriteTools(newFavorites)
  }

  const handleWebsiteFavoriteToggle = (websiteId: string) => {
    const newFavorites = toggleFavoriteWebsite(websiteId)
    setFavoriteWebsites(newFavorites)
  }

  const handleAIWebsiteFavoriteToggle = (websiteTitle: string) => {
    const newFavorites = toggleFavoriteAIWebsite(websiteTitle)
    setFavoriteAIWebsites(newFavorites)
  }

  const favoriteToolsList = TOOLS.filter(tool => favoriteTools.includes(tool.id))
  const favoriteWebsitesList = WEBSITES.filter(website => favoriteWebsites.includes(website.id))
  const favoriteAIWebsitesList = AI_WEBSITES_UNIQUE.filter(website => favoriteAIWebsites.includes(website.title))

  return (
    <div>
      <TimeDisplay />
      
      <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mb: 4 }}>
        <Search 
          onSearchEngineChange={setSearchEngine}
          onSearchTextChange={setSearchText}
          searchText={searchText}
        />
      </Box>

      <ContentSection>
        {favoriteToolsList.length > 0 && (
          <Section>
            <SectionTitle>收藏的工具</SectionTitle>
            <Grid container spacing={2}>
              {favoriteToolsList.map(tool => (
                <Grid item xs={12} sm={6} md={4} key={tool.id}>
                  <ToolCard
                    tool={tool}
                    onClick={() => handleToolClick(tool.id)}
                    onFavoriteToggle={() => handleToolFavoriteToggle(tool.id)}
                    isFavorite={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        )}

        {favoriteWebsitesList.length > 0 && (
          <Section>
            <SectionTitle>收藏的网站</SectionTitle>
            <Grid container spacing={2}>
              {favoriteWebsitesList.map(website => (
                <Grid item xs={12} sm={6} md={4} key={website.id}>
                  <SimpleAICard
                    title={website.title}
                    description={website.description}
                    url={website.url}
                    onClick={() => handleWebsiteClick(website.url)}
                    onFavoriteToggle={() => handleWebsiteFavoriteToggle(website.id)}
                    isFavorite={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        )}

        {favoriteAIWebsitesList.length > 0 && (
          <Section>
            <SectionTitle>收藏的 AI 网站</SectionTitle>
            <Grid container spacing={2}>
              {favoriteAIWebsitesList.map(website => (
                <Grid item xs={12} sm={6} md={4} key={website.title}>
                  <SimpleAICard
                    title={website.title}
                    description={website.description}
                    url={website.url}
                    onClick={() => handleWebsiteClick(website.url)}
                    onFavoriteToggle={() => handleAIWebsiteFavoriteToggle(website.title)}
                    isFavorite={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </ContentSection>
    </div>
  )
}
