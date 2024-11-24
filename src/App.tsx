import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import QRGenerator from './tools/QRGenerator';
import JSONFormatter from './tools/JSONFormatter';
import ColorPalette from './tools/ColorPalette';

const App: FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/qr-generator" element={<QRGenerator />} />
        <Route path="/tools/json-formatter" element={<JSONFormatter />} />
        <Route path="/tools/color-palette" element={<ColorPalette />} />
      </Routes>
    </Box>
  );
};

export default App;
