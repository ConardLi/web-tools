'use client'

import { Grid, Typography, Paper } from '@mui/material'
import type { FavoriteItem } from '@/types/favorite'

interface FavoriteGridProps {
  title: string;
  items: FavoriteItem[];
  onRemove: (id: string) => Promise<void>;
}

export default function FavoriteGrid({ 
  title, 
  items, 
  onRemove 
}: FavoriteGridProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <Paper elevation={0} className="p-4 mb-6 border">
      <Typography variant="h6" component="h2" className="mb-4">
        {title}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper
              elevation={0}
              className="p-4 border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                {/* 根据类型显示不同的图标 */}
                <img 
                  src={item.icon} 
                  alt={item.name}
                  className="w-8 h-8 mr-3"
                />
                <div className="flex-1">
                  <Typography variant="subtitle1" component="h3">
                    {item.name}
                  </Typography>
                  {item.description && (
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  )}
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
