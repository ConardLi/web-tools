import { FC } from 'react';
import QRCodeEditor from './components/QRCodeEditor';
import QRCodePreview from './components/QRCodePreview';
import { useQRCode } from './hooks/useQRCode';
import { StyledContainer } from './styles';
import ToolPageLayout from '../../components/ToolPageLayout';

const QRGenerator: FC = () => {
  const qrCodeProps = useQRCode();

  return (
    <ToolPageLayout title="二维码生成器">
      <StyledContainer>
        <QRCodeEditor {...qrCodeProps} />
        <QRCodePreview {...qrCodeProps} />
      </StyledContainer>
    </ToolPageLayout>
  );
};

export default QRGenerator; 