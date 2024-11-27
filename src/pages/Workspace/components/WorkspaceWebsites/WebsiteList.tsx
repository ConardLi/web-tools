import React from 'react';
import { Grid } from '@mui/material';
import { Website } from '../../../../types/website';
import ItemCard from '../../../../components/common/ItemCard';
import { isFavoriteWebsite, toggleFavoriteWebsite } from '../../../../utils/storage';

interface WebsiteListProps {
  websites: Website[];
  selectedTags: string[];
}

const WebsiteList: React.FC<WebsiteListProps> = ({ websites, selectedTags }) => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    // 初始化收藏状态
    setFavorites(websites.filter(website => isFavoriteWebsite(website.id)).map(website => website.id));
  }, [websites]);

  const handleFavoriteToggle = (websiteId: string) => {
    const newFavorites = toggleFavoriteWebsite(websiteId);
    setFavorites(newFavorites);
  };

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  const filteredWebsites = websites.filter(website =>
    selectedTags.length === 0 || website.tags.some(tag => selectedTags.includes(tag))
  );

  return (
    <Grid container spacing={2}>
      {filteredWebsites.map((website) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={website.id}>
          <ItemCard
            id={website.id}
            name={website.name}
            description={website.description}
            icon={website.icon}
            tags={website.tags}
            isFavorite={favorites.includes(website.id)}
            onFavoriteToggle={() => handleFavoriteToggle(website.id)}
            onClick={() => handleWebsiteClick(website.url)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default WebsiteList;
