import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}));

const WorkspaceWebsites: React.FC = () => {
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

  // 根据选中的标签过滤网站
  const filteredWebsites = React.useMemo(() => {
    if (selectedTags.length === 0) {
      return WEBSITES;
    }
    // 如果一个网站的标签包含所有选中的标签，则显示该网站
    return WEBSITES.filter(website => 
      selectedTags.every(tag => website.tags.includes(tag))
    );
  }, [selectedTags]);

  return (
    <ContentSection>
      <TagFilter<WebsiteTagType>
        tags={WEBSITE_TAGS}
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

export default WorkspaceWebsites;
