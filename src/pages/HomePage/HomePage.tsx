import { FC } from 'react';
import { Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import ToolGrid from './components/ToolGrid';
import { useTools } from './hooks/useTools';

const HomePage: FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    filteredTools
  } = useTools();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight="bold" 
          sx={{ mb: 4, color: 'text.primary' }}
        >
          工具箱
        </Typography>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <TagFilter 
          selectedTag={selectedTag} 
          onTagChange={setSelectedTag} 
        />

        <ToolGrid tools={filteredTools} />
      </motion.div>
    </Container>
  );
};

export default HomePage; 