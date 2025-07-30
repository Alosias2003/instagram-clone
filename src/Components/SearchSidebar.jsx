


import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchSidebar = ({ open, onClose }) => {
  const [recent, setRecent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecent(stored);
  }, [open]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recent));
  }, [recent]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Simulate API search
    const filtered = [
      { username: 'ishowspeed', name: 'iShowSpeed' },
      { username: 'vidoememes_vm', name: 'Video Memes' },
      { username: 'ramos_goal', name: 'Sergio Ramos' },
    ].filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  if (!open) return null;

  return (
    <>
    
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1200,
        }}
      />
      
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isMobile ? '100vw' : 350,
          height: '100vh',
          bgcolor: 'white',
          zIndex: 1201,
          p: 2,
          overflowY: 'auto',
        }}
       
      >
        <Box sx={{display:{xl:'none',lg:'none',md:'none',sm:'block',xs:'block'},height:'42px',bgcolor:'red'}}>space</Box>
         {/* <Box sx={{height:{xs:'100px'},bgcolor:'yellow'}}></Box> */}
        
        {/* Close button */}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>


        {/* Search bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fafafa',
            borderRadius: 1,
            p: 1,
            mt: 5,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: '#8e8e8e' }} />
          <InputBase
            placeholder="Search"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ fontSize: '14px' }}
          />
        </Box>

        {/* Results or Recent */}
        <Box sx={{ mt: 3 }}>
          {searchTerm ? (
            results.length > 0 ? (
              results.map((user, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#dbdbdb',
                      mr: 2,
                    }}
                  />
                  <Typography>{user.name} (@{user.username})</Typography>
                </Box>
              ))
            ) : (
              <Typography mt={2} color="#8e8e8e" fontSize="14px">
                No results found
              </Typography>
            )
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography fontWeight="bold">Recent</Typography>
                <Typography
                  sx={{ cursor: 'pointer', color: '#0095f6' }}
                  onClick={() => setRecent([])}
                >
                  Clear all
                </Typography>
              </Box>
              {recent.length === 0 ? (
                <Typography color="#8e8e8e" fontSize="14px">
                  No recent searches
                </Typography>
              ) : (
                recent.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <Typography>{item}</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setRecent((prev) => prev.filter((term) => term !== item))
                      }
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchSidebar;
