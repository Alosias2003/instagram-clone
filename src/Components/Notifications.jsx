// import React from 'react';
// import { Avatar, Box, Typography, Stack, Button, Divider } from '@mui/material';

// const dummyNotifications = [
//   {
//     id: 1,
//     type: 'follow',
//     name: '_brownie_treats_1822',
//     avatar: '/assets/brownie.jpg',
//     time: '6d',
//     action: 'Follow',
//   },
//   {
//     id: 2,
//     type: 'follow',
//     name: 'avcatechnologies',
//     avatar: '/assets/avca.jpg',
//     time: '1w',
//     action: 'Follow',
//   },
//   {
//     id: 3,
//     type: 'like-comment',
//     name: '._mubx_nxiz_',
//     avatar: '/assets/user1.jpg',
//     text: 'liked your comment: "The Ballon d’Or belongs to Yamal..."',
//     time: '1w',
//   },
//   {
//     id: 4,
//     type: 'reply',
//     name: 'the_laugh_smart',
//     avatar: '/assets/user2.jpg',
//     text: 'replied to your comment',
//     time: '2w',
//   },
// ];

// const Notifications = () => {
//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: '300px', borderRight: '1px solid #ddd', p: 2 }}>
//         <Typography variant="h6" fontWeight="bold">Notifications</Typography>
//         <Typography sx={{ mt: 2, fontSize: 14, color: 'gray' }}>This month</Typography>
//       </Box>

//       {/* Notification List */}
//       <Box sx={{ flex: 1, p: 3 }}>
//         {dummyNotifications.map((n) => (
//           <Box key={n.id} sx={{ mb: 2 }}>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar src={n.avatar || '/assets/default.jpg'} />
//               <Box flex={1}>
//                 <Typography variant="body2">
//                   <strong>{n.name}</strong>{' '}
//                   {n.text ? n.text : (n.type === 'follow' ? 'started following you.' : '')}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">{n.time}</Typography>
//               </Box>
//               {n.action === 'Follow' && (
//                 <Button size="small" variant="outlined">Follow</Button>
//               )}
//             </Stack>
//             <Divider sx={{ mt: 1 }} />
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Notifications;


import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const dummyNotifications = [
  {
    id: 1,
    type: 'follow',
    name: '_brownie_treats_1822',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    time: '6d',
    action: 'Follow',
  },
  {
    id: 2,
    type: 'follow',
    name: 'avcatechnologies',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    time: '1w',
    action: 'Follow',
  },
  {
    id: 3,
    type: 'like-comment',
    name: '._mubx_nxiz_',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    text: 'liked your comment: "The Ballon d’Or belongs to Yamal..."',
    time: '1w',
  },
  {
    id: 4,
    type: 'reply',
    name: 'the_laugh_smart',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    text: 'replied to your comment',
    time: '2w',
  },
];

const Notifications = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#fafafa' }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          borderRight: '1px solid #ddd',
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Notifications
        </Typography>
        <List>
          <ListItem button selected>
            <ListItemText primary="This Month" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Earlier" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Requests" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        {dummyNotifications.map((n) => (
          <Box key={n.id} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={n.avatar} />
              <Box flex={1}>
                <Typography variant="body2">
                  <strong>{n.name}</strong>{' '}
                  {n.text || (n.type === 'follow' ? 'started following you.' : '')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {n.time}
                </Typography>
              </Box>
              {n.action === 'Follow' && (
                <Button size="small" variant="outlined">Follow</Button>
              )}
            </Stack>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Notifications;
