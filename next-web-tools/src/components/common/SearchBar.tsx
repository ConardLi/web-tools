'use client'

import { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = '搜索...' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className="flex items-center p-2 shadow-sm"
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="ml-2 flex-1"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
