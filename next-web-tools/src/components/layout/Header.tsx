'use client'

import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import { Handyman } from '@mui/icons-material'

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0} className="border-b">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="h-16">
          <Handyman className="mr-2 text-primary" />
          <Typography variant="h6" component="h1" className="font-medium">
            Web Tools
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
