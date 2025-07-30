


import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import ReelCard from './ReelCard';

const Reels = () => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/reels').then(res => {
      setReels(res.data);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '614px',
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > *': { scrollSnapAlign: 'start' },
        }}
      >
        {reels.map((reel, idx) => (
          <ReelCard key={idx} reel={reel} />
        ))}
      </Box>
    </Box>
  );
};

export default Reels;
