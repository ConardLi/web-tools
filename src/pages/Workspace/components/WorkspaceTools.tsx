import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import ItemCard from '../../../components/common/ItemCard';
import TagFilter from '../../../components/common/TagFilter';
import { TOOLS, TAGS, TAG_TO_ICON } from '../../../constants/tools';
import { getFavoriteTools, toggleFavoriteTool } from '../../../utils/storage';
import { TagType } from '../../../types/tool';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1600px',
  padding: theme.spacing(0, 2),
}));

const WorkspaceTools: React.FC = () => {
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [favoriteTools, setFavoriteTools] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteTools(getFavoriteTools());
  }, []);

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, '_blank');
  };

  const handleFavoriteToggle = (toolId: string) => {
    const newFavorites = toggleFavoriteTool(toolId);
    setFavoriteTools(newFavorites);
  };

  const filteredTools = React.useMemo(() => {
    if (selectedTags.length === 0) {
      return TOOLS;
    }
    return TOOLS.filter(tool => 
      selectedTags.every(tag => tool.tags.includes(tag as TagType))
    );
  }, [selectedTags]);

  return (
    <ContentSection>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 4 }}>
        <TagFilter<TagType>
          tags={TAGS}
          selectedTags={selectedTags}
          tagToIcon={TAG_TO_ICON}
          onTagChange={setSelectedTags}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={tool.id}>
            <ItemCard
              id={tool.id}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
              tags={tool.tags}
              onClick={() => handleToolClick(tool.id)}
              onFavoriteToggle={() => handleFavoriteToggle(tool.id)}
              isFavorite={favoriteTools.includes(tool.id)}
            />
          </Grid>
        ))}
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceTools;
