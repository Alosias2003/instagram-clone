// // // 



// // import { Box } from '@mui/material';
// // // import React, { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // import Navbar from './Navbar';
// // import Main from './Main';
// // import Left from './Left';


// // const Home = () => {
  

// //   return (
// //     <Box sx={{  display: 'flex' }}>
// //       {/* Main layout always rendered */}
// //       <Navbar />
// //       <Main />
// //       <Left />

     
// //     </Box>
// //   );
// // };

// // export default Home;



import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Main from './Main';
import Left from './Left';
import Refreshpage from './Refreshpage';
import '../Style/Home.css'; 

const Home = () => {
  // const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   const fadeTimer = setTimeout(() => {
  //     setFadeOut(true); // Trigger fade
  //   }, 2000); // Start fading after 2s

  //   const cleanupTimer = setTimeout(() => {
  //     const splash = document.getElementById('splash');
  //     if (splash) splash.style.display = 'none'; // Remove from view after fade
  //   }, 2500); // Wait until fade completes

  //   return () => {
  //     clearTimeout(fadeTimer);
  //     clearTimeout(cleanupTimer);
  //   };
  // }, []);

  return (
    <Box>
       <Navbar />
      {/* Always render main content */}
      <Box  sx={{ display: 'flex' }}>
       
        <Main />
        <Left />
      </Box>

      {/* Splash overlaid */}
      {/* <Box
        id="splash"
        className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      >
        <Refreshpage />
      </Box> */}
    </Box>
  );
};

export default Home;

// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [showSplash, setShowSplash] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // Check if navigation type is reload
//     const navEntries = performance.getEntriesByType("navigation");
//     const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

//     if (isReload) {
//       setShowSplash(true);

//       const fadeTimer = setTimeout(() => {
//         setFadeOut(true); // Trigger fade
//       }, 2000); // Start fading after 2s

//       const cleanupTimer = setTimeout(() => {
//         setShowSplash(false); // Hide splash after fade
//       }, 2500); // Wait until fade completes

//       return () => {
//         clearTimeout(fadeTimer);
//         clearTimeout(cleanupTimer);
//       };
//     }
//   }, []);

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {/* Splash only renders if showSplash is true */}
//       {/* {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )} */}
//     </Box>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [fadeOut, setFadeOut] = useState(false);
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     // ✅ Only show splash if NOT marked as shown in this session
//     if (!sessionStorage.getItem('splashShown')) {
//       setShowSplash(true);
//       sessionStorage.setItem('splashShown', 'true');

//       const fadeTimer = setTimeout(() => {
//         setFadeOut(true);
//       }, 2000);

//       const cleanupTimer = setTimeout(() => {
//         setShowSplash(false);
//       }, 2500);

//       return () => {
//         clearTimeout(fadeTimer);
//         clearTimeout(cleanupTimer);
//       };
//     }
//   }, []);

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {/* Only render splash if it should be shown */}
//       {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [fadeOut, setFadeOut] = useState(false);
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//   let isRefresh = false;
//   if (performance.getEntriesByType) {
//     const navEntries = performance.getEntriesByType('navigation');
//     if (navEntries.length > 0) {
//       isRefresh = navEntries[0].type === 'reload';
//     }
//   } else if (window.performance && window.performance.navigation) {
//     isRefresh = window.performance.navigation.type === 1;
//   }

//   if (isRefresh) {
//     setShowSplash(true);
//     const fadeTimer = setTimeout(() => {
//       setFadeOut(true);
//     }, 2000);

//     const cleanupTimer = setTimeout(() => {
//       setShowSplash(false);
//     }, 2500);

//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(cleanupTimer);
//     };
//   }
// }, []);

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {/* Only render splash if it should be shown */}
//       {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;



// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [fadeOut, setFadeOut] = useState(false);
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     let isRefresh = false;

//     // Modern navigation entries check
//     if (performance.getEntriesByType) {
//       const navEntries = performance.getEntriesByType('navigation');
//       if (navEntries.length > 0) {
//         isRefresh = navEntries[0].type === 'reload';
//       }
//     } else if (window.performance && window.performance.navigation) {
//       // Fallback for older browsers
//       isRefresh = window.performance.navigation.type === 1;
//     }

//     console.log('isRefresh:', isRefresh); // 🔍 Debug

//     if (isRefresh) {
//       setShowSplash(true);

//       const fadeTimer = setTimeout(() => {
//         setFadeOut(true);
//       }, 2000);

//       const cleanupTimer = setTimeout(() => {
//         setShowSplash(false);
//       }, 2500);

//       return () => {
//         clearTimeout(fadeTimer);
//         clearTimeout(cleanupTimer);
//       };
//     }
//   }, []);

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;



// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [fadeOut, setFadeOut] = useState(false);
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     const navEntries = performance.getEntriesByType('navigation');
//     const isRefresh = navEntries.length > 0 && navEntries[0].type === 'reload';

//     // ✅ Show splash only if page is reloaded and not already shown in session
//     if (isRefresh && !sessionStorage.getItem('splashShown')) {
//       setShowSplash(true);
//       sessionStorage.setItem('splashShown', 'true');

//       const fadeTimer = setTimeout(() => {
//         setFadeOut(true);
//       }, 2000);

//       const cleanupTimer = setTimeout(() => {
//         setShowSplash(false);
//       }, 2500);

//       return () => {
//         clearTimeout(fadeTimer);
//         clearTimeout(cleanupTimer);
//       };
//     }
//   }, []);

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;



// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import { useLocation } from 'react-router-dom'; // Add this if using React Router
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css';

// const Home = () => {
//   const [fadeOut, setFadeOut] = useState(false);
//   const [showSplash, setShowSplash] = useState(false);
//   const location = useLocation(); // For React Router navigation tracking

//   useEffect(() => {
//     // Check if the page was freshly loaded (not navigated to via React Router)
//     const isFreshLoad =
//       performance.getEntriesByType('navigation').length > 0 &&
//       performance.getEntriesByType('navigation')[0].type === 'reload' &&
//       !sessionStorage.getItem('splashShown');

//     if (isFreshLoad) {
//       setShowSplash(true);
//       sessionStorage.setItem('splashShown', 'true');

//       const fadeTimer = setTimeout(() => {
//         setFadeOut(true);
//       }, 2000);

//       const cleanupTimer = setTimeout(() => {
//         setShowSplash(false);
//       }, 2500);

//       return () => {
//         clearTimeout(fadeTimer);
//         clearTimeout(cleanupTimer);
//       };
//     }
//   }, []); // Empty dependency array ensures this runs only on mount

//   // Optional: Reset splashShown when navigating away (if needed)
//   useEffect(() => {
//     // If you want to allow the splash screen on a future refresh, you can clear sessionStorage
//     // when navigating to other routes. This depends on your requirements.
//     return () => {
//       // Optionally clear sessionStorage when navigating away from Home
//       // sessionStorage.removeItem('splashShown');
//     };
//   }, [location]); // Runs when the route changes

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Main />
//         <Left />
//       </Box>

//       {showSplash && (
//         <Box
//           id="splash"
//           className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
//         >
//           <Refreshpage />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;