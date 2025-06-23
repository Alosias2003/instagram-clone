


// // Reels.jsx
// import React, { useEffect, useState } from 'react';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import axios from 'axios';
// import ReelCard from './ReelCard';

// const Reels = () => {
//   const [reels, setReels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReels = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/reels');
//         setReels(res.data);
//       } catch (err) {
//         console.error('Error fetching reels:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReels();
//   }, []);

//   if (loading) {
//     return <CircularProgress sx={{ mt: 10, mx: 'auto', display: 'block' }} />;
//   }

//   if (reels.length === 0) {
//     return <Typography align="center" mt={5}>No reels available.</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         overflowY: 'scroll',
//         scrollSnapType: 'y mandatory',
//         '& > *': {
//           scrollSnapAlign: 'start',
//         },
//       }}
//     >
//       {reels.map((reel) => (
//         <ReelCard key={reel.id} reel={reel} />
//       ))}
//     </Box>
//   );
// };

// export default Reels;


// Reels.jsx
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
    <Box
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        '& > *': {
          scrollSnapAlign: 'start'
        }
      }}
    >
      {reels.map((reel, idx) => (
        <ReelCard key={idx} reel={reel} />
      ))}
    </Box>
  );
};

export default Reels;
