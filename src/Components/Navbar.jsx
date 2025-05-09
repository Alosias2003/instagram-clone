import { Box } from '@mui/material';
import React from 'react';
import instagram from '../Assets/Instagram-Logo.png'
const Navbar = () => {
  return (
    <Box sx={{ flex: 0.2, backgroundColor: 'orange', display: 'flex' }}>
      <Box component="img" src={instagram} alt="Instagram Logo" sx={{ width: 120 }} />
       
    </Box>
  );
};

export default Navbar;
