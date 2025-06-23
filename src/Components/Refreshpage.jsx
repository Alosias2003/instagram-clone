// import React from 'react';
// import { Box, Typography } from '@mui/material';
// // import Instagramlogo from '../Assets/Instagram-Logo.png'; 
// import {ReactComponent as InstaLogo} from '../Assets/icons8-instagram-logo-96.svg'; 
// import  {ReactComponent as InstagramLogo} from '../Assets/instagram-2-cleaned.svg'
// import  {ReactComponent as Meta} from '../Assets/icons8-meta-96.svg'

// const Refreshpage = () => {
//   return (
//     <Box 
//      sx={{
//       height:'100vh',
//       // bgcolor:'wheat',
//       display:'flex',alignItems:'center',justifyContent:'center' 

//      }}
//     >
//      <Box 
//       sx={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}}
//       >
//       <Box  sx={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
//          <InstagramLogo  style={{ fill:'red',width:'20%',height:'20%'}}/>
//       <InstaLogo/>
//       </Box>
//      </Box>

//        <Box  sx={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:'45px'}} >
//          <Typography>From</Typography>
//         <Meta />
//       </Box>
     
     

//     </Box>
//   );
// };

// export default Refreshpage;



import React from 'react';
import { Box, Typography } from '@mui/material';
// import Instagramlogo from '../Assets/Instagram-Logo.png'; 
import { ReactComponent as InstaLogo } from '../Assets/icons8-instagram-logo-96.svg';
import { ReactComponent as InstagramLogo } from '../Assets/instagram-2-cleaned.svg';
import { ReactComponent as Meta } from '../Assets/icons8-meta-96.svg';

const Refreshpage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // py: 4,
      }}
    >
      {/* Center content */}
      <Box
        sx={{
          display: 'flex',
          // flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
       
        <InstaLogo />
         <InstagramLogo style={{  width: '20%', height: '40%' }} />
      </Box>

      {/* Bottom content */}
      <Box
        sx={{
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          From
        </Typography>
        <Meta />
      </Box>
    </Box>
  );
};

export default Refreshpage;
