'use client'

import { Chip } from '@mui/material'

interface CategoryTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryTag({ 
  label, 
  selected = false, 
  onClick 
}: CategoryTagProps) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      color={selected ? "primary" : "default"}
      variant={selected ? "filled" : "outlined"}
      className="m-1"
    />
  )
}
