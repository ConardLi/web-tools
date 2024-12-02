'use client'

import { usePathname } from 'next/navigation'
import { Tabs, Tab, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Home, Build, Language, SmartToy } from '@mui/icons-material'
import Link from 'next/link'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.2)',
}))

const StyledTabs = styled(Tabs)({
  minHeight: 48,
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
})

const StyledTab = styled(Tab)({
  minHeight: 48,
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  '& .MuiSvgIcon-root': {
    marginBottom: '4px',
  },
})

const routes = [
  { path: '/workspace/home', label: '主页', icon: <Home /> },
  { path: '/workspace/tools', label: '工具', icon: <Build /> },
  { path: '/workspace/ai', label: 'AI', icon: <SmartToy /> },
  { path: '/workspace/websites', label: '网站', icon: <Language /> },
]

export default function Navigation() {
  const pathname = usePathname()
  const currentTab = routes.findIndex(route => pathname.startsWith(route.path))

  return (
    <StyledPaper elevation={0}>
      <StyledTabs
        value={currentTab !== -1 ? currentTab : 0}
        variant="fullWidth"
      >
        {routes.map((route, index) => (
          <StyledTab
            key={route.path}
            label={route.label}
            icon={route.icon}
            component={Link}
            href={route.path}
          />
        ))}
      </StyledTabs>
    </StyledPaper>
  )
}
