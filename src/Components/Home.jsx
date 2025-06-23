// // 



// import { Box } from '@mui/material';
// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';


// const Home = () => {
  

//   return (
//     <Box sx={{  display: 'flex' }}>
//       {/* Main layout always rendered */}
//       <Navbar />
//       <Main />
//       <Left />

     
//     </Box>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Main from './Main';
import Left from './Left';
import Refreshpage from './Refreshpage';
import '../Style/Home.css'; 

const Home = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // Trigger fade
    }, 2000); // Start fading after 2s

    const cleanupTimer = setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) splash.style.display = 'none'; // Remove from view after fade
    }, 2500); // Wait until fade completes

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    <Box>
       <Navbar />
      {/* Always render main content */}
      <Box  sx={{ display: 'flex' }}>
       
        <Main />
        <Left />
      </Box>

      {/* Splash overlaid */}
      <Box
        id="splash"
        className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      >
        <Refreshpage />
      </Box>
    </Box>
  );
};

export default Home;