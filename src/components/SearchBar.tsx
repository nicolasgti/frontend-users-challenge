import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <Box py={2} maxWidth={300} width="100%">
      <TextField
        placeholder="Pesquisa"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ 
          backgroundColor: 'white', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 1 }}
      />
    </Box>
  );
};

export default SearchBar;