import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import WorkspaceTools from './WorkspaceTools';
import WorkspaceWebsites from './WorkspaceWebsites';
import WorkspaceHome from './WorkspaceHome';
import WorkspaceAI from './WorkspaceAI';
import { formatDate } from '../../../utils/date';
import { getStoredSearchEngine } from '../../../utils/storage';
import WorkspaceSearch from './WorkspaceSearch';

interface WorkspaceContentProps {
  activeTab: string;
}

const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  color: 'white',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
  },
}));

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  opacity: 0.9,
  marginTop: theme.spacing(0.5),
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  fontWeight: 400,
}));

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ activeTab }) => {
  const [time, setTime] = useState(new Date());
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
  };

  return (
    <Container>
      <TimeText>{time.toLocaleTimeString('en-US', { hour12: false })}</TimeText>
      <DateText>{formatDate(time)}</DateText>
      
      <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <WorkspaceSearch
            onSearchEngineChange={handleSearchEngineChange}
          />
        </Box>
      </Box>

      <Box sx={{ width: '100%', mt: 4 }}>
        {activeTab === 'home' && <WorkspaceHome />}
        {activeTab === 'tools' && <WorkspaceTools />}
        {activeTab === 'websites' && <WorkspaceWebsites />}
        {activeTab === 'ai' && <WorkspaceAI />}
      </Box>
    </Container>
  );
};

export default WorkspaceContent;
