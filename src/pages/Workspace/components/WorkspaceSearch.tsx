import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import * as MuiIcons from '@mui/icons-material';
import SvgIcon from '../../../components/common/SvgIcon';
import { TOOLS } from '../../../constants/tools';
import { SEARCH_ENGINES, getSearchUrl, getSearchEngineName } from '../../../constants/searchEngines';
import { getStoredSearchEngine, setStoredSearchEngine } from '../../../utils/storage';

const SearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
    color: 'white',
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiInputAdornment-root': {
    color: 'white',
  },
}));

const SearchEngineSelect = styled(Select)({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const SearchContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

const SuggestionsList = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  width: '100%',
  maxHeight: '300px',
  overflowY: 'auto',
  marginTop: theme.spacing(1),
  '& .MuiListItem-root': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

interface Props {
  onSearchEngineChange?: (engine: string) => void;
}

const WorkspaceSearch: React.FC<Props> = ({
  onSearchEngineChange,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchEngine, setSearchEngine] = useState(() => {
    // 从 localStorage 获取上次使用的搜索引擎，如果没有则使用默认值
    return getStoredSearchEngine() || 'google';
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 当组件挂载时，如果有存储的搜索引擎，通知父组件
  useEffect(() => {
    onSearchEngineChange?.(searchEngine);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      window.open(getSearchUrl(searchEngine, query.trim()), '_blank');
    }
  };

  const handleTranslate = (query: string) => {
    if (query.trim()) {
      window.open(`https://translate.volcengine.com/?category=&home_language=zh&text=${encodeURIComponent(query.trim())}`, '_blank');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(searchText);
      setSearchText('');
      setAnchorEl(null);
    }
  };

  const generateSuggestions = (query: string) => {
    if (!query.trim()) return [];
    
    const suggestions = [];
    
    // 第一条：当前搜索引擎搜索
    suggestions.push({
      type: 'search',
      engine: searchEngine,
      query: query.trim(),
    });

    // 第二条：火山翻译
    suggestions.push({
      type: 'translate',
      query: query.trim(),
    });

    // 工具搜索建议
    const toolSuggestions = TOOLS
      .filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(tool => ({
        type: 'tool',
        id: tool.id,
        icon: tool.icon,
        title: tool.name,
        description: tool.description,
      }));

    return [...suggestions, ...toolSuggestions];
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    setSuggestions(generateSuggestions(value));
    setAnchorEl(event.currentTarget);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'translate') {
      handleTranslate(suggestion.query);
    } else if (suggestion.type === 'search') {
      handleSearchSubmit(suggestion.query);
    } else if (suggestion.type === 'tool') {
      // 打开工具页面
      window.open(`/tools/${suggestion.id}`, '_blank');
    }
    setSearchText('');
    setSuggestions([]);
    setAnchorEl(null);
  };

  const handleSearchEngineChange = (event: SelectChangeEvent<string>) => {
    const newEngine = event.target.value;
    setSearchEngine(newEngine);
    setStoredSearchEngine(newEngine);
    onSearchEngineChange?.(newEngine);
  };

  const handleClickAway = () => {
    setSuggestions([]);
    setAnchorEl(null);
  };

  return (
    <SearchContainer>
      <SearchBar
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="搜索..."
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <SearchEngineSelect
                value={searchEngine}
                onChange={handleSearchEngineChange}
                variant="outlined"
                size="small"
              >
                {SEARCH_ENGINES.map((engine) => (
                  <MenuItem key={engine.key} value={engine.key}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SvgIcon name={engine.icon} sx={{ fontSize: 20 }} />
                      {engine.name}
                    </Box>
                  </MenuItem>
                ))}
              </SearchEngineSelect>
            </InputAdornment>
          ),
        }}
      />

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.clientWidth, zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <SuggestionsList>
            <List>
              {suggestions.map((suggestion, index) => {
                let icon;
                if (suggestion.type === 'tool') {
                  const Icon = (MuiIcons as any)[suggestion.icon];
                  icon = <Icon sx={{ fontSize: 'inherit' }} />;
                } else if (suggestion.type === 'translate') {
                  icon = <TranslateIcon sx={{ fontSize: 'inherit' }} />;
                } else {
                  // 使用搜索引擎配置
                  const engine = SEARCH_ENGINES.find(e => e.key === suggestion.engine);
                  icon = engine ? (
                    <SvgIcon name={engine.icon} sx={{ fontSize: 'inherit' }} />
                  ) : (
                    <SearchIcon sx={{ fontSize: 'inherit' }} />
                  );
                }

                return (
                  <ListItem
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        suggestion.type === 'search'
                          ? `${getSearchEngineName(suggestion.engine)} 搜索：${suggestion.query}`
                          : suggestion.type === 'translate'
                          ? `火山翻译：${suggestion.query}`
                          : suggestion.title
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </SuggestionsList>
        </ClickAwayListener>
      </Popper>
    </SearchContainer>
  );
};

export default WorkspaceSearch;
