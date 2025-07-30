



// import React from 'react';
// import { Box, Typography } from '@mui/material';
// // import Instagramlogo from '../Assets/Instagram-Logo.png'; 
// import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
// import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
// import { ReactComponent as Meta } from '../Assets/icons8-meta-96.svg';

// const Refreshpage = () => {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         // py: 4,
//       }}
//     >
//       {/* Center content */}
//       <Box
//         sx={{
//           display: 'flex',
//           // flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexGrow: 1,
//         }}
//       >
       
//         <InstaLogo />
//          <InstagramLogo style={{  width: '20%', height: '40%' }} />
//       </Box>

//       {/* Bottom content */}
//       <Box
//         sx={{
//           textAlign: 'center',
//           pb: 2,
//         }}
//       >
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           From
//         </Typography>
//         <Meta />
//       </Box>
//     </Box>
//   );
// };

// export default Refreshpage;


// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
// import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
// // import { ReactComponent as Meta } from '../Assets/icons8-meta-96.svg';
// import Meta from '../Assets/grayskullremaster.png'

// const Refreshpage = () => {
//   return (
//     <Box
//       sx={{
//         position: 'fixed',       // make it overlay everything
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         zIndex: 9999,           // ensure it's on top
//         backgroundColor: '#fff',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       {/* Center content */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexGrow: 1,
//         }}
//       >
//         <InstaLogo style={{ marginRight: 12 }} />
//         <InstagramLogo style={{ width: '20vw', height: 'auto' }} />
//       </Box>

//       {/* Bottom content */}
//       <Box sx={{ textAlign: 'center', pb: 2 }}>
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           From
//         </Typography>
//         <Meta />
//       </Box>
//     </Box>
//   );
// };

// export default Refreshpage;



// import React from 'react';
// import { Box, Typography, keyframes } from '@mui/material';
// import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
// import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
// import Meta from '../Assets/grayskullremaster.png';

// // Pulse animation keyframes
// const shimmer = keyframes`
//   0% { opacity: 0.6; transform: scale(1); }
//   50% { opacity: 1; transform: scale(1.05); }
//   100% { opacity: 0.6; transform: scale(1); }
// `;

// const Refreshpage = () => {
//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         zIndex: 9999,
//         backgroundColor: '#fff',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       {/* Center with shimmer animation */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexGrow: 1,
//           animation: `${shimmer} 1.8s ease-in-out infinite`,
//         }}
//       >
//         <InstaLogo style={{ marginRight: 12 }} />
//         <InstagramLogo style={{ width: '20vw', height: 'auto' }} />
//       </Box>

//       {/* Footer with "From Meta" */}
//       <Box sx={{ textAlign: 'center', pb: 2 }}>
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           From
//         </Typography>
//         <img src={Meta} alt="Meta Logo" style={{ width: '250px', height: '250px' }} />
//       </Box>
//     </Box>
//   );
// };

// export default Refreshpage;


/* 
import React from 'react';
import { Box, Typography, keyframes, useTheme } from '@mui/material';
import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
import Meta from '../Assets/grayskullremaster.png';
import By from '../Assets/by logo final of.png';

// Shimmer animation for center logo
const shimmer = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

// Meta logo pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Refreshpage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
     
      /* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          animation: `${shimmer} 1.8s ease-in-out infinite`,
          gap: 2,
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <InstaLogo
          style={{
            width: '64px',
            height: '64px',
          }}
        />
        <InstagramLogo
          style={{
            width: '40vw',
            maxWidth: '240px',
            height: 'auto',
          }}
        />
      </Box> */

    
      /* <Box sx={{ textAlign: 'center', pb: 2 }}> */
        /* <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          From
        </Typography> */
        /* <Box component='img'>
        <img src={By} alt="by" />
        </Box>
        <Box
          component="img"
          src={Meta}
          alt="Meta Logo"
          sx={{
            width: { xs: '150px', sm: '200px', md: '250px' },
            height: 'auto',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default Refreshpage; */ 


import React from 'react';
import { Box, keyframes, useTheme } from '@mui/material';
import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
import Meta from '../Assets/grayskullremaster.png';
import By from '../Assets/by logo final of.png';

// Shimmer animation for center logo
const shimmer = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

// Meta logo pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Refreshpage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
      {/* Center shimmer animation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          animation: `${shimmer} 1.8s ease-in-out infinite`,
          gap: 2,
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <InstaLogo style={{ width: '64px', height: '64px' }} />
        <InstagramLogo style={{ width: '40vw', maxWidth: '240px', height: 'auto' }} />
      </Box>

      {/* Footer with animated Meta image */}
      <Box sx={{ textAlign: 'center', pb: 2 }}>
        <Box
          component="img"
          src={By}
          alt="by"
          sx={{
            width: { xs: '100px', sm: '140px' },
            mb: 1,
          }}
        />
        <Box
          component="img"
          src={Meta}
          alt="Meta Logo"
          sx={{
            width: { xs: '150px', sm: '200px', md: '250px' },
            height: 'auto',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default Refreshpage;

