import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import ItemCard from '../../../../components/common/ItemCard';
import TagFilter from '../../../../components/common/TagFilter';
import { WEBSITES, WEBSITE_TAGS, TAG_TO_ICON } from '../../../../constants/websites';
import { getFavoriteWebsites, toggleFavoriteWebsite } from '../../../../utils/storage';
import { WebsiteTagType } from '../../../../types/website';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(0, 2),
}));

const WorkspaceAI: React.FC = () => {
  const [selectedTags, setSelectedTags] = React.useState<WebsiteTagType[]>([]);
  const [favoriteWebsites, setFavoriteWebsites] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteWebsites(getFavoriteWebsites());
  }, []);

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleFavoriteToggle = (websiteId: string) => {
    const newFavorites = toggleFavoriteWebsite(websiteId);
    setFavoriteWebsites(newFavorites);
  };

  // 首先过滤出 AI 工具
  const aiWebsites = WEBSITES.filter(website => website.tags.includes('AI工具' as WebsiteTagType));

  // 获取 AI 相关的标签
  const aiTags = WEBSITE_TAGS.filter(tag => {
    return aiWebsites.some(website => website.tags.includes(tag));
  });

  // 根据选中的标签进一步过滤
  const filteredWebsites = React.useMemo(() => {
    if (selectedTags.length === 0) {
      return aiWebsites;
    }
    return aiWebsites.filter(website => 
      selectedTags.every(tag => website.tags.includes(tag as WebsiteTagType))
    );
  }, [selectedTags, aiWebsites]);

  return (
    <ContentSection>
      <TagFilter<WebsiteTagType>
        tags={aiTags}
        selectedTags={selectedTags}
        tagToIcon={TAG_TO_ICON}
        onTagChange={setSelectedTags}
      />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredWebsites.map((website) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={website.id}>
            <ItemCard
              id={website.id}
              name={website.name}
              icon={website.icon}
              description={website.description}
              tags={website.tags}
              onClick={() => handleWebsiteClick(website.url)}
              onFavoriteToggle={() => handleFavoriteToggle(website.id)}
              isFavorite={favoriteWebsites.includes(website.id)}
            />
          </Grid>
        ))}
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceAI;
