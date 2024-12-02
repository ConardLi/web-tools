'use client'

import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchBar from './SearchBar'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 500,
}))

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <StyledPaper elevation={0}>
      <StyledTitle variant="h6" component="h2">
        搜索工具和网站
      </StyledTitle>
      <SearchBar 
        onSearch={onSearch}
        placeholder="输入关键词搜索工具、AI 网站或常用网站..."
      />
    </StyledPaper>
  )
}
