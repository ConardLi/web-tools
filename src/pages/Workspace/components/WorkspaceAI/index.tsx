import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import AICard from '../../../../components/common/AICard';
import TagFilter from '../../../../components/common/TagFilter';
import VirtualGrid from '../../../../components/common/VirtualGrid';
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
  searchText?: string;
}

const WorkspaceAI: React.FC<WorkspaceAIProps> = React.memo(({
  activeTag = '写作工具',
  onTagChange,
  searchText = '',
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
    let websites = activeTag === '全部' ? AI_WEBSITES_UNIQUE : AI_WEBSITES_WITH_DUPLICATES.filter(website => 
      website.tags?.includes(activeTag as AITagType)
    );

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      websites = websites.filter(website =>
        website.title.toLowerCase().includes(lowerSearchText) ||
        website.description.toLowerCase().includes(lowerSearchText)
      );
    }

    return websites;
  }, [activeTag, searchText]);

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
      <VirtualGrid
        items={filteredWebsites}
        itemHeight={100}
        minItemWidth={300}
        gap={16}
        renderItem={(website, style) => (
          <AICard
            website={website}
            onClick={() => handleWebsiteClick(website.url)}
            onFavoriteToggle={() => handleFavoriteToggle(website.title)}
            isFavorite={favoriteWebsites.includes(website.title)}
            style={style}
          />
        )}
      />
    </ContentSection>
  );
});

export default WorkspaceAI;
