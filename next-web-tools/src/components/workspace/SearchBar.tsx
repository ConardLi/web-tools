'use client'

import React, { useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import { InputBase, IconButton, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { debounce } from 'lodash'

const SearchWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1, 2),
  color: 'rgba(255, 255, 255, 0.9)',
  '& input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: 1,
  },
}))

const IconButtonStyled = styled(IconButton)({
  padding: 10,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = '搜索...',
  defaultValue = '',
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query)
    }, 300),
    [onSearch]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    debouncedSearch(newValue)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <SearchWrapper elevation={0}>
      <IconButtonStyled aria-label="search">
        <SearchIcon />
      </IconButtonStyled>
      <StyledInputBase
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
      />
      {value && (
        <IconButtonStyled aria-label="clear" onClick={handleClear}>
          <CloseIcon />
        </IconButtonStyled>
      )}
    </SearchWrapper>
  )
}
