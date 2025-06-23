// import { Box } from '@mui/material'
// import React from 'react'

// const Left = () => {
//   return (
//     <Box style={{ flex: 0.3, }}> 
    
//      <p style={{backgroundColor:'wheat',height: '100vh'}}>HI</p>
    


//   </Box>
//   )
// }

// export default Left



// Right.jsx
import React from 'react';
import { Box, Avatar, Typography, Button, Stack, Divider } from '@mui/material';

const suggestions = [
  { username: '_arshad_x', mutual: 'Followed by __vini_5__ + 3 more' },
  { username: 'stenly_sujan', mutual: 'Followed by __vini_5__ + 15 more' },
  { username: 'instagram', mutual: 'Followed by techie_programmer', verified: true },
  { username: 'the_angel_within_me_', mutual: 'Suggested for you' },
  { username: '_im_terry_', mutual: 'Followed by c_s_a_f_r_i_n_j_a_s_' },
];

const Right = () => {
  return (
    <Box
      sx={{
        flex: 0.35,
        px: 2,
        py: 3,
        display: { xs: 'none', md: 'block' },
      
      }}
    >
      {/* User Info */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src="" alt="Aloy" />
          <Box>
            <Typography fontWeight={500}>_aloysparkz_</Typography>
            <Typography variant="body2" color="gray">Aloy</Typography>
          </Box>
        </Stack>
        <Button variant="text" size="small" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Switch</Button>
      </Stack>

      {/* Suggested for you */}
      <Box mb={1} mt={3} display="flex" justifyContent="space-between">
        <Typography fontWeight="bold" color="gray">Suggested for you</Typography>
        <Typography variant="body2" sx={{ cursor: 'pointer' }}>See All</Typography>
      </Box>

      {suggestions.map((sugg, index) => (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} key={index}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={sugg.username} src={`https://i.pravatar.cc/150?img=${index + 5}`} />
            <Box>
              <Typography fontWeight={500}>{sugg.username} {sugg.verified && '✔️'}</Typography>
              <Typography variant="body2" color="gray">{sugg.mutual}</Typography>
            </Box>
          </Stack>
          <Button size="small" variant="text" sx={{ fontWeight: 'bold', textTransform: 'none' }}>Follow</Button>
        </Stack>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Typography variant="caption" color="gray">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
      </Typography>
      <Typography variant="caption" color="gray" display="block" mt={1}>
        © 2025 INSTAGRAM FROM META
      </Typography>
    </Box>
  );
};

export default Right;
