import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import WorkspaceSearch from './WorkspaceSearch';
import WorkspaceTools from './WorkspaceTools';
import WorkspaceWebsites from './WorkspaceWebsites';
import { formatDate } from '../../../utils/date';
import { getStoredSearchEngine } from '../../../utils/storage';

const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  overflowY: 'auto',
}));

const TimeSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  marginTop: theme.spacing(4),
}));

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '5rem',
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: '0.02em',
  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  opacity: 0.9,
  marginTop: theme.spacing(0.5),
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
}));

const WorkspaceContent: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchEngineChange = (engine: string) => {
    setSearchEngine(engine);
  };

  return (
    <Container>
      <TimeSection>
        <TimeText>{time.toLocaleTimeString()}</TimeText>
        <DateText>{formatDate(time)}</DateText>
      </TimeSection>
      
      <WorkspaceSearch
        onSearchEngineChange={handleSearchEngineChange}
      />

      <WorkspaceTools />
      
      <WorkspaceWebsites />
    </Container>
  );
};

export default WorkspaceContent;
