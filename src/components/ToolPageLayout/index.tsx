import { FC, ReactNode } from 'react';
import { Container, Stack, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ToolLayout from '../ToolLayout';

interface ToolPageLayoutProps {
  title: string;
  children: ReactNode;
}

const ToolPageLayout: FC<ToolPageLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <ToolLayout>
      <Container maxWidth={false} sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%' }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            {/* <IconButton 
              onClick={() => navigate('/')} 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <ArrowBackIcon />
            </IconButton> */}
            <Typography variant="h4" component="h1" fontWeight="bold">
              {title}
            </Typography>
          </Stack>

          {children}
        </motion.div>
      </Container>
    </ToolLayout>
  );
};

export default ToolPageLayout; 