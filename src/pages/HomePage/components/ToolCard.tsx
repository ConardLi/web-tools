import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { Tool } from '../../../types/tool';
import * as MuiIcons from '@mui/icons-material';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();
  const Icon = (MuiIcons as any)[tool.icon];

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
      onClick={() => navigate(`/tools/${tool.id}`)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {Icon && <Icon sx={{ mr: 1, color: 'primary.main' }} />}
          <Typography variant="h6" component="h2">
            {tool.name}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tool.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {tool.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(88, 86, 214, 0.1)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(88, 86, 214, 0.2)',
                }
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ToolCard; 