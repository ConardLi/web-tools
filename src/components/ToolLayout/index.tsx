import { FC, ReactNode, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToolsNav from '../ToolsNav';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DRAWER_WIDTH = 240;

interface ToolLayoutProps {
  children: ReactNode;
}

const ToolLayout: FC<ToolLayoutProps> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <ToolsNav open={isNavOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme => theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            left: isNavOpen ? DRAWER_WIDTH : 0,
            top: 0,
            bottom: 0,
            width: '1px',
            bgcolor: 'divider',
            zIndex: 1200,
            transition: theme => theme.transitions.create(['left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <IconButton
            onClick={() => setIsNavOpen(!isNavOpen)}
            size="small"
            sx={{
              position: 'absolute',
              left: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1,
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
          >
            {isNavOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default ToolLayout; 