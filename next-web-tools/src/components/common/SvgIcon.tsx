'use client'

import { Box } from '@mui/material'

interface SvgIconProps {
  icon: string
  size?: number
  className?: string
}

export default function SvgIcon({ icon, size = 24, className }: SvgIconProps) {
  return (
    <Box
      component="img"
      src={icon}
      alt=""
      sx={{
        width: size,
        height: size,
        display: 'block',
      }}
      className={className}
    />
  )
}
