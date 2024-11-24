import { FC } from 'react';
import { Stack } from '@mui/material';
import { TAGS } from '../../../constants/tools';
import { StyledChip } from '../styles';
import { TagType } from '../../../types/tool';

interface TagFilterProps {
  selectedTag: TagType | '全部';
  onTagChange: (tag: TagType | '全部') => void;
}

const TagFilter: FC<TagFilterProps> = ({ selectedTag, onTagChange }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
      <StyledChip
        key="全部"
        label="全部"
        onClick={() => onTagChange('全部')}
        variant={selectedTag === '全部' ? 'filled' : 'outlined'}
      />
      {TAGS.map((tag) => (
        <StyledChip
          key={tag}
          label={tag}
          onClick={() => onTagChange(tag)}
          variant={selectedTag === tag ? 'filled' : 'outlined'}
        />
      ))}
    </Stack>
  );
};

export default TagFilter; 