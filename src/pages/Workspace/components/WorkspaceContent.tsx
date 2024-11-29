import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspaceTools from './WorkspaceTools';
import WorkspaceWebsites from './WorkspaceWebsites';
import WorkspaceHome from './WorkspaceHome';
import WorkspaceAI from './WorkspaceAI';
import WorkspaceSearch from './WorkspaceSearch';
import { formatDate } from '../../../utils/date';
import { getStoredSearchEngine } from '../../../utils/storage';
import useDebounce from '../../../hooks/useDebounce';

interface WorkspaceContentProps {
  activeTab: string;
  activeTag?: string;
  onTagChange: (tag: string) => void;
  selectedToolTags?: string[];
  onToolTagsChange?: (tags: string[]) => void;
}

const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  overflowY: 'auto',
  height: '100vh',
}));

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '5rem',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 300,
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  fontWeight: 400,
}));

const ModuleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 300,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const TimeDisplay = React.memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Typography variant="h4" component="div" sx={{ textAlign: 'center', color: 'white', fontSize: '3rem' }}>
      {currentTime.toLocaleTimeString()}
    </Typography>
  );
});

const DateDisplay = React.memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <DateText>
      {formatDate(currentDate)}
    </DateText>
  );
});

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({
  activeTab,
  activeTag,
  onTagChange,
  selectedToolTags,
  onToolTagsChange,
}) => {
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const renderTitle = () => {
    switch (activeTab) {
      case 'ai':
        return (
          <ModuleTitle>
            AI 工具箱
          </ModuleTitle>
        );
      case 'tools':
        return (
          <ModuleTitle>
            Web 工具箱
          </ModuleTitle>
        );
      case 'websites':
        return (
          <ModuleTitle>
            常用网站导航
          </ModuleTitle>
        );
      default:
        return null;
    }
  };

  const renderTime = () => {
    if (activeTab === 'home') {
      return (
        <>
          <TimeDisplay />
          <DateDisplay />
        </>
      );
    }
    return null;
  };

  return (
    <Container>
      {renderTime()}
      {renderTitle()}
      <Box sx={{ width: '100%', maxWidth: '600px', mb: 4 }}>
        <WorkspaceSearch 
          onSearchEngineChange={handleSearchEngineChange} 
          onSearchTextChange={handleSearchTextChange}
          searchText={searchText}
        />
      </Box>
      
      <Box
        sx={{
          width: '100%',
          maxWidth: '1600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {activeTab === 'home' && <WorkspaceHome />}
        {activeTab === 'tools' && (
          <WorkspaceTools
            selectedTag={selectedToolTags?.[0] || ''}
            onTagChange={tag => onToolTagsChange?.([tag])}
            searchText={debouncedSearchText}
          />
        )}
        {activeTab === 'websites' && <WorkspaceWebsites />}
        {activeTab === 'ai' && (
          <WorkspaceAI 
            activeTag={activeTag} 
            onTagChange={onTagChange} 
            searchText={debouncedSearchText}
          />
        )}
      </Box>
    </Container>
  );
};

export default WorkspaceContent;
