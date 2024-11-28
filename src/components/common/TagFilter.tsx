import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

interface TagFilterProps<T extends string> {
  tags: T[];
  selectedTags: T[];
  tagToIcon?: { [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } };
  onTagChange: (tags: T[]) => void;
}

const TagFilter = <T extends string>({
  tags,
  selectedTags,
  tagToIcon,
  onTagChange,
}: TagFilterProps<T>) => {
  const handleTagClick = (tag: T) => {
    if (selectedTags.includes(tag)) {
      // 如果标签已经被选中，则清空选择
      onTagChange([]);
    } else {
      // 如果标签未被选中，则只选中这一个标签
      onTagChange([tag]);
    }
  };

  return (
    <Container>
      {tags.map((tag) => {
        const Icon = tagToIcon?.[tag];
        return (
          <Chip
            key={tag}
            label={tag}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => handleTagClick(tag)}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: selectedTags.includes(tag)
                ? 'primary.main'
                : 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: selectedTags.includes(tag)
                  ? 'primary.dark'
                  : 'rgba(255, 255, 255, 0.2)',
              },
              color: 'white',
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        );
      })}
    </Container>
  );
};

export default TagFilter;
