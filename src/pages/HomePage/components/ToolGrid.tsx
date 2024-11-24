import { FC } from 'react';
import { Grid } from '@mui/material';
import ToolCard from './ToolCard';
import { Tool } from '../../../types/tool';
import { motion } from 'framer-motion';

interface ToolGridProps {
  tools: Tool[];
}

const ToolGrid: FC<ToolGridProps> = ({ tools }) => {
  return (
    <Grid container spacing={3}>
      {tools.map((tool, index) => (
        <Grid item xs={12} sm={6} md={4} key={tool.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ToolGrid; 