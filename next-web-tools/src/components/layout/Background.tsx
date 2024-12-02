'use client'

import { Box, styled } from '@mui/material'

const BackgroundImage = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url(/imgs/th.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.8) saturate(1.2)',
  zIndex: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
  },
})

const BackgroundOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
  backdropFilter: 'blur(8px)',
  zIndex: 1,
})

export default function Background() {
  return (
    <>
      <BackgroundImage />
      <BackgroundOverlay />
    </>
  )
}
