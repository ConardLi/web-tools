import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardActionArea,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as MuiIcons from '@mui/icons-material';
import { TOOLS } from '../../../constants/tools';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(0, 2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}));

const ToolCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius * 1.5,

  '& .MuiCardActionArea-root': {
    padding: theme.spacing(1.2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },

  '& .icon': {
    color: 'white',
    fontSize: '1.8rem',
    height: '1.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& .tool-name': {
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 400,
    textAlign: 'center',
    lineHeight: 1.2,
    opacity: 0.9,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '& .tool-name': {
      opacity: 1,
    }
  },
}));

const StyledTooltip = styled((props: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: props.className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    fontSize: '0.75rem',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
  },
}));

const WorkspaceTools: React.FC = () => {
  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, '_blank');
  };

  const handleAddToolClick = () => {
    // TODO: 实现添加工具功能
    console.log('Add tool clicked');
  };

  return (
    <ContentSection>
      <SectionTitle>工具</SectionTitle>
      <Grid container spacing={1.5}>
        {TOOLS.map((tool) => {
          const Icon = (MuiIcons as any)[tool.icon];
          return (
            <Grid item xs={3} sm={2} md={1.5} lg={1} key={tool.id}>
              <StyledTooltip title={tool.name} placement="top" arrow>
                <ToolCard onClick={() => handleToolClick(tool.id)}>
                  <CardActionArea>
                    <Box className="icon">
                      {Icon && <Icon sx={{ fontSize: 'inherit' }} />}
                    </Box>
                    <Typography className="tool-name">
                      {tool.name}
                    </Typography>
                  </CardActionArea>
                </ToolCard>
              </StyledTooltip>
            </Grid>
          );
        })}
        <Grid item xs={3} sm={2} md={1.5} lg={1}>
          <ToolCard onClick={handleAddToolClick}>
            <CardActionArea>
              <Box className="icon">
                <AddIcon sx={{ fontSize: 'inherit' }} />
              </Box>
              <Typography className="tool-name">
                添加工具
              </Typography>
            </CardActionArea>
          </ToolCard>
        </Grid>
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceTools;
