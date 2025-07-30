

// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Navbar from './Navbar';
// import Main from './Main';
// import Left from './Left';
// import Refreshpage from './Refreshpage';
// import '../Style/Home.css'; 

// const Home = () => {
  

//   return (
//     <Box>
//        <Navbar />
     
//       <Box  sx={{ display: 'flex' }}>
       
//         <Main />
//         <Left />
//       </Box>

      
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
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 2000); // 2seconds

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Box>
//       {showSplash ? (
//         <Refreshpage />
//       ) : (
//         <>
//           <Navbar />
//           <Box sx={{ display: 'flex' }}>
//             <Main />
//             <Left />
//           </Box>
//         </>
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
//   const [showSplash, setShowSplash] = useState(() => {
//     // Check if splash has already been shown in this session
//     return !sessionStorage.getItem('splashShown');
//   });

//   useEffect(() => {
//     if (showSplash) {
//       const timer = setTimeout(() => {
//         setShowSplash(false);
//         // Mark splash as shown for this session
//         sessionStorage.setItem('splashShown', 'true');
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [showSplash]);

//   return (
//     <Box>
//       {showSplash ? (
//         <Refreshpage />
//       ) : (
//         <>
//           <Navbar />
//           <Box sx={{ display: 'flex' }}>
//             <Main />
//             <Left />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Home;


import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Main from './Main';
import Left from './Left';
import '../Style/Home.css';

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Main />
        <Left />
      </Box>
    </Box>
  );
};

export default Home;