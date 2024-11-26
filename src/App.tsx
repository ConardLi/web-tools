import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import QRGenerator from './tools/QRGenerator';
import JSONFormatter from './tools/JSONFormatter';
import ColorPalette from './tools/ColorPalette';
import ImageCompressor from './tools/ImageCompressor';
import ImageConverter from './tools/ImageConverter';
import FaviconGenerator from './tools/FaviconGenerator';
import MD5Generator from './tools/MD5Generator';

const App: FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/qr-generator" element={<QRGenerator />} />
        <Route path="/tools/json-formatter" element={<JSONFormatter />} />
        <Route path="/tools/color-palette" element={<ColorPalette />} />
        <Route path="/tools/image-compressor" element={<ImageCompressor />} />
        <Route path="/tools/image-converter" element={<ImageConverter />} />
        <Route path="/tools/favicon-generator" element={<FaviconGenerator />} />
        <Route path="/tools/md5" element={<MD5Generator />} />
      </Routes>
    </Box>
  );
};

export default App;
