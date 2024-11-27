import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import WorkspaceNav from './components/WorkspaceNav';
import WorkspaceContent from './components/WorkspaceContent';

const WorkspaceContainer = styled(Box)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#1a1a1a',
});

const BackgroundImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url(/imgs/th.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.9)',
  zIndex: 0,
});

const BackgroundOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 1,
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100%',
  zIndex: 2,
});

const Workspace: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <WorkspaceContainer>
      <BackgroundImage />
      <BackgroundOverlay />
      <ContentWrapper>
        <WorkspaceNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <WorkspaceContent
          activeTab={activeTab}
        />
      </ContentWrapper>
    </WorkspaceContainer>
  );
};

export default Workspace;
