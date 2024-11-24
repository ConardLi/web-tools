import { useState, useEffect } from 'react';
import { TOOLS } from '../../../constants/tools';
import { Tool, TagType } from '../../../types/tool';

export const useTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagType | '全部'>('全部');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);

  useEffect(() => {
    const filtered = TOOLS.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = 
        selectedTag === '全部' || tool.tags.includes(selectedTag as TagType);
      
      return matchesSearch && matchesTag;
    });
    setFilteredTools(filtered);
  }, [searchTerm, selectedTag]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    filteredTools
  };
}; 