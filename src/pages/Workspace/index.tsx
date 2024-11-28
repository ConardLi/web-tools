import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import WorkspaceNav from './components/WorkspaceNav';
import WorkspaceContent from './components/WorkspaceContent';
import { useQueryParams } from '../../hooks/useQueryParams';

const WorkspaceContainer = styled(Box)({
  width: '100vw',
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: '#1a1a1a',
});

const BackgroundImage = styled(Box)({
  position: 'fixed',
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
  position: 'fixed',
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
  minHeight: '100vh',
  zIndex: 2,
});

type QueryParams = Record<'tab' | 'tag' | 'toolTag', string>;

const Workspace: React.FC = () => {
  const { params, updateParams } = useQueryParams<QueryParams>({
    tab: 'home',
    tag: '写作工具',
    toolTag: '',
  });

  const handleTabChange = (newTab: string) => {
    if (newTab === params.tab) return;
    updateParams({ tab: newTab });
  };

  const handleTagChange = (newTag: string) => {
    if (newTag === params.tag) return;
    updateParams({ tag: newTag });
  };

  const handleToolTagChange = (newTags: string[]) => {
    const newTag = newTags[0] || '';
    if (newTag === params.toolTag) return;
    updateParams({ toolTag: newTag });
  };

  return (
    <WorkspaceContainer>
      <BackgroundImage />
      <BackgroundOverlay />
      <ContentWrapper>
        <WorkspaceNav
          activeTab={params.tab}
          onTabChange={handleTabChange}
        />
        <WorkspaceContent
          activeTab={params.tab}
          activeTag={params.tag}
          onTagChange={handleTagChange}
          selectedToolTags={params.toolTag ? [params.toolTag] : []}
          onToolTagsChange={handleToolTagChange}
        />
      </ContentWrapper>
    </WorkspaceContainer>
  );
};

export default Workspace;
