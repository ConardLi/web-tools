import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Grid,
} from '@mui/material';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  color: 'white',
}));

const WorkspaceWebsites: React.FC = () => {
  return (
    <ContentSection>
      <SectionTitle>网站</SectionTitle>
      <Grid container spacing={2}>
        {/* 网站卡片使用相同的样式 */}
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceWebsites;
