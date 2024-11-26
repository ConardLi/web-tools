import { FC } from 'react';
import { Box } from '@mui/material';
import MD5Editor from './components/MD5Editor';
import { useMD5 } from './hooks/useMD5';
import { StyledContainer } from './styles';
import ToolPageLayout from '../../components/ToolPageLayout';

const MD5Generator: FC = () => {
  const md5Props = useMD5();

  return (
    <ToolPageLayout title="MD5 生成器">
      <StyledContainer>
        <MD5Editor {...md5Props} />
      </StyledContainer>
    </ToolPageLayout>
  );
};

export default MD5Generator; 