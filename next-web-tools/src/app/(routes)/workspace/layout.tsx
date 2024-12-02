'use client'

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navigation from '@/components/layout/Navigation'
import Background from '@/components/layout/Background'

const WorkspaceContainer = styled(Box)({
  width: '100vw',
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: '#1a1a1a',
  display: 'flex',
  flexDirection: 'column',
})

const ContentWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  zIndex: 2,
  padding: '20px',
})

const MainContent = styled(Box)({
  flex: 1,
  width: '100%',
  maxWidth: '1600px',
  margin: '0 auto',
  paddingTop: '20px',
})

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceContainer>
      <Background />
      <ContentWrapper>
        <Navigation />
        <MainContent>
          {children}
        </MainContent>
      </ContentWrapper>
    </WorkspaceContainer>
  )
}
