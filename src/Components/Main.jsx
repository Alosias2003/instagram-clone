

import { Box } from '@mui/material';
import React from 'react'; 
import Story from './Story';
import Post from './Post';

const Main = () => {
  return (
    <Box className='main' style={{ flex: 0.7,
     
     }}>
      <Story />
      <Post />
    </Box>
  );
};

export default Main;
