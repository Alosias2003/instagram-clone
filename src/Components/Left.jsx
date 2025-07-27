
// // Right.jsx
// import React from 'react';
// import { Box, Avatar, Typography, Button, Stack, Divider } from '@mui/material';

// const suggestions = [
//   { username: '_arshad_x', mutual: 'Followed by __vini_5__ + 3 more' },
//   { username: 'stenly_sujan', mutual: 'Followed by __vini_5__ + 15 more' },
//   { username: 'instagram', mutual: 'Followed by techie_programmer', verified: true },
//   { username: 'the_angel_within_me_', mutual: 'Suggested for you' },
//   { username: '_im_terry_', mutual: 'Followed by c_s_a_f_r_i_n_j_a_s_' },
// ];

// const Right = () => {
//   return (
//     <Box
//       sx={{
//         flex: 0.35,
//         px: 2,
//         py: 3,
//         display: { xs: 'none', md: 'block' },
      
//       }}
//     >
//       {/* User Info */}
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Avatar src="" alt="Aloy" />
//           <Box>
//             <Typography fontWeight={500}>_aloysparkz_</Typography>
//             <Typography variant="body2" color="gray">Aloy</Typography>
//           </Box>
//         </Stack>
//         <Button variant="text" size="small" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Switch</Button>
//       </Stack>

//       {/* Suggested for you */}
//       <Box mb={1} mt={3} display="flex" justifyContent="space-between">
//         <Typography fontWeight="bold" color="gray">Suggested for you</Typography>
//         <Typography variant="body2" sx={{ cursor: 'pointer' }}>See All</Typography>
//       </Box>

//       {suggestions.map((sugg, index) => (
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} key={index}>
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Avatar alt={sugg.username} src={`https://i.pravatar.cc/150?img=${index + 5}`} />
//             <Box>
//               <Typography fontWeight={500}>{sugg.username} {sugg.verified && '✔️'}</Typography>
//               <Typography variant="body2" color="gray">{sugg.mutual}</Typography>
//             </Box>
//           </Stack>
//           <Button size="small" variant="text" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Follow</Button>
//         </Stack>
//       ))}

//       <Divider sx={{ my: 2 }} />

//       {/* Footer */}
//       <Typography variant="caption" color="gray">
//         About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
//       </Typography>
//       <Typography variant="caption" color="gray" display="block" mt={1}>
//         © 2025 INSTAGRAM FROM META
//       </Typography>
//     </Box>
//   );
// };

// export default Right;



// Right.jsx
// import React, { useEffect, useState } from 'react';
// import { Box, Avatar, Typography, Button, Stack, Divider } from '@mui/material';

// const suggestions = [
//   { username: '_arshad_x', mutual: 'Followed by __vini_5__ + 3 more' },
//   { username: 'stenly_sujan', mutual: 'Followed by __vini_5__ + 15 more' },
//   { username: 'instagram', mutual: 'Followed by techie_programmer', verified: true },
//   { username: 'the_angel_within_me_', mutual: 'Suggested for you' },
//   { username: '_im_terry_', mutual: 'Followed by c_s_a_f_r_i_n_j_a_s_' },
// ];

// const Right = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch logged-in user from localStorage
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     setUser(loggedInUser);
//   }, []);

//   return (
//     <Box
//       sx={{
//         flex: 0.35,
//         px: 2,
//         py: 3,
//         display: { xs: 'none', md: 'block' },
//       }}
//     >
//       {/* User Info */}
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Avatar src="" alt={user?.username || "User"} />
//           <Box>
//             <Typography fontWeight={500}>{user?.username || "Guest"}</Typography>
//             <Typography variant="body2" color="gray">{user?.name || "Welcome"}</Typography>
//           </Box>
//         </Stack>
//         <Button variant="text" size="small" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Switch</Button>
//       </Stack>

//       {/* Suggested for you */}
//       <Box mb={1} mt={3} display="flex" justifyContent="space-between">
//         <Typography fontWeight="bold" color="gray">Suggested for you</Typography>
//         <Typography variant="body2" sx={{ cursor: 'pointer' }}>See All</Typography>
//       </Box>

//       {suggestions.map((sugg, index) => (
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} key={index}>
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Avatar alt={sugg.username} src={`https://i.pravatar.cc/150?img=${index + 5}`} />
//             <Box>
//               <Typography fontWeight={500}>{sugg.username} {sugg.verified && '✔️'}</Typography>
//               <Typography variant="body2" color="gray">{sugg.mutual}</Typography>
//             </Box>
//           </Stack>
//           <Button size="small" variant="text" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Follow</Button>
//         </Stack>
//       ))}

//       <Divider sx={{ my: 2 }} />

//       {/* Footer */}
//       <Typography variant="caption" color="gray">
//         About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
//       </Typography>
//       <Typography variant="caption" color="gray" display="block" mt={1}>
//         © 2025 INSTAGRAM FROM META
//       </Typography>
//     </Box>
//   );
// };

// export default Right;


// Right.jsx
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Stack } from '@mui/material';

const suggestions = [
  { username: '_im_terry_', mutual: 'Followed by c_s_a_f_r_i_n_j_a_s_...' },
  { username: 'jero_kutty_2009', mutual: 'Followed by joel_dj_official' },
  { username: 'mr__abi__', mutual: 'Followed by indecent_fellow_ + ...' },
  { username: 'mervin_dhoni', mutual: 'Followed by laneux.lajo + 66 m...' },
  { username: 'satheesh_muthu66', mutual: 'Followed by basil_weronow + 4 ...' },
];

const Right = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  return (
    <Box
      sx={{
        flex: 0.35,
        px: 2,
        py: 3,
        display: { xs: 'none', md:'none',lg:'block' },
        maxWidth: '319px',
        position: 'sticky',
        top: '20px',
        height: 'fit-content',
      }}
    >
      {/* User Info */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar 
            src="" 
            alt={user?.username || "User"} 
            sx={{ 
              width: 44, 
              height: 44,
              border: '1px solid #dbdbdb'
            }}
          />
          <Box>
            <Typography 
              fontWeight={600} 
              fontSize="14px" 
              color="#262626"
              lineHeight={1.2}
            >
              {user?.username || "_aloysparkz_"}
            </Typography>
            <Typography 
              variant="body2" 
              color="#8e8e8e"
              fontSize="14px"
              lineHeight={1.2}
            >
              {user?.name || "Aloy"}
            </Typography>
          </Box>
        </Stack>
        <Button 
          variant="text" 
          size="small" 
          sx={{ 
            fontWeight: 600,
            textTransform: 'none',
            color: '#0095f6',
            fontSize: '12px',
            minWidth: 'auto',
            padding: '4px 8px',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#00376b'
            }
          }}
        >
          Switch
        </Button>
      </Stack>

      {/* Suggested for you */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography 
          fontWeight={600} 
          color="#8e8e8e"
          fontSize="14px"
        >
          Suggested for you
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            cursor: 'pointer',
            color: '#262626',
            fontSize: '12px',
            fontWeight: 600,
            '&:hover': {
              color: '#8e8e8e'
            }
          }}
        >
          See All
        </Typography>
      </Box>

      {/* Suggestions List */}
      <Box mb={4}>
        {suggestions.map((sugg, index) => (
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between" 
            mb={1.5} 
            key={index}
            sx={{ py: 0.5 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar 
                alt={sugg.username} 
                src={`https://i.pravatar.cc/150?img=${index + 5}`}
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '1px solid #dbdbdb'
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  fontWeight={600}
                  fontSize="14px"
                  color="#262626"
                  lineHeight={1.2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '140px'
                  }}
                >
                  {sugg.username}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="#8e8e8e"
                  fontSize="12px"
                  lineHeight={1.2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '140px'
                  }}
                >
                  {sugg.mutual}
                </Typography>
              </Box>
            </Stack>
            <Button 
              size="small" 
              variant="text" 
              sx={{ 
                fontWeight: 600,
                textTransform: 'none',
                color: '#0095f6',
                fontSize: '12px',
                minWidth: 'auto',
                padding: '4px 8px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#00376b'
                }
              }}
            >
              Follow
            </Button>
          </Stack>
        ))}
      </Box>

      {/* Footer Links */}
      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="caption" 
          color="#c7c7c7"
          fontSize="11px"
          lineHeight={1.4}
          sx={{ 
            display: 'block',
            '& a': {
              color: '#c7c7c7',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }}
        >
          About · Help · Press · API · Jobs · Privacy · Terms · 
          Locations · Language · Meta Verified
        </Typography>
        <Typography 
          variant="caption" 
          color="#c7c7c7" 
          fontSize="11px"
          lineHeight={1.4}
          sx={{ display: 'block', mt: 2 }}
        >
          © 2025 INSTAGRAM FROM META
        </Typography>
      </Box>
    </Box>
  );
};

export default Right;