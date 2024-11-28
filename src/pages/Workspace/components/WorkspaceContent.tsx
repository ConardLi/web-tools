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

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({
  activeTab,
  activeTag,
  onTagChange,
  selectedToolTags,
  onToolTagsChange,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
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
          <TimeText>
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </TimeText>
          <DateText>
            {formatDate(currentTime)}
          </DateText>
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
        <WorkspaceSearch onSearchEngineChange={handleSearchEngineChange} />
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
          />
        )}
        {activeTab === 'websites' && <WorkspaceWebsites />}
        {activeTab === 'ai' && <WorkspaceAI activeTag={activeTag} onTagChange={onTagChange} />}
      </Box>
    </Container>
  );
};

export default WorkspaceContent;
