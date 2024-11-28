import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import AICard from '../../../../components/common/AICard';
import TagFilter from '../../../../components/common/TagFilter';
import { AI_WEBSITES_WITH_DUPLICATES, AI_WEBSITES_UNIQUE, AI_TAGS, TAG_TO_ICON } from '../../../../constants/ai';
import { getFavoriteAIWebsites, toggleFavoriteAIWebsite } from '../../../../utils/storage';
import { AITagType } from '../../../../types/ai';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1600px',
  padding: theme.spacing(0, 2),
}));

interface WorkspaceAIProps {
  activeTag?: string;
  onTagChange: (tag: string) => void;
}

const WorkspaceAI: React.FC<WorkspaceAIProps> = ({
  activeTag = '写作工具',
  onTagChange,
}) => {
  const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteWebsites(getFavoriteAIWebsites());
  }, []);

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleFavoriteToggle = (websiteTitle: string) => {
    const newFavorites = toggleFavoriteAIWebsite(websiteTitle);
    setFavoriteWebsites(newFavorites);
  };

  const handleTagChange = (newTags: AITagType[]) => {
    const newTag = newTags.length > 0 ? newTags[0] : '写作工具';
    onTagChange(newTag);
  };

  const filteredWebsites = React.useMemo(() => {
    if (activeTag === '全部') {
      return AI_WEBSITES_UNIQUE;
    }
    return AI_WEBSITES_WITH_DUPLICATES.filter(website => 
      website.tags?.includes(activeTag as AITagType)
    );
  }, [activeTag]);

  return (
    <ContentSection>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        mb: 4,
        px: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '100%',
        overflow: 'auto',
      }}>
        <TagFilter<AITagType>
          tags={AI_TAGS}
          selectedTags={[activeTag as AITagType]}
          tagToIcon={TAG_TO_ICON}
          onTagChange={handleTagChange}
          singleSelect
        />
      </Box>
      <Grid container spacing={2}>
        {filteredWebsites.map((website, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${website.title}-${index}`}>
            <AICard
              website={website}
              onClick={() => handleWebsiteClick(website.url)}
              onFavoriteToggle={() => handleFavoriteToggle(website.title)}
              isFavorite={favoriteWebsites.includes(website.title)}
            />
          </Grid>
        ))}
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceAI;
