'use client'

import { Box } from '@mui/material'
import WorkspaceTools from '@/components/workspace/WorkspaceTools'
import Search from '@/components/workspace/Search'
import { useState } from 'react'

export default function ToolsPage() {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (text: string) => {
    setSearchText(text)
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Search onSearch={handleSearch} />
      </Box>
      <WorkspaceTools searchText={searchText} />
    </Box>
  )
}
