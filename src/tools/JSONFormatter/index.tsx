import { FC } from 'react';
import JSONEditor from './components/JSONEditor';
import JSONPreview from './components/JSONPreview';
import { useJSONFormatter } from './hooks/useJSONFormatter';
import { StyledContainer } from './styles';
import ToolPageLayout from '../../components/ToolPageLayout';

const JSONFormatter: FC = () => {
  const jsonProps = useJSONFormatter();

  return (
    <ToolPageLayout title="JSON 格式化工具">
      <StyledContainer>
        <JSONEditor {...jsonProps} />
        <JSONPreview {...jsonProps} />
      </StyledContainer>
    </ToolPageLayout>
  );
};

export default JSONFormatter; 