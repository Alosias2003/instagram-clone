// src/Components/NotificationSidebar.jsx
import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const mockNotifications = [
  {
    id: 1,
    user: '_brownie_treats_1822',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    action: 'started following you.',
    time: '6d',
  },
  {
    id: 2,
    user: 'avcatechnologies',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    action: 'started following you.',
    time: '1w',
  },
  {
    id: 3,
    user: 'mubx_nxiz_',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    action: 'liked your comment.',
    time: '1w',
  },
];

const NotificationSidebar = ({ open, onClose }) => {
  return (
    <Box
      sx={{
        width: 320,
        position: 'fixed',
        right: open ? 0 : '-340px',
        top: 0,
        height: '100vh',
        bgcolor: 'white',
        borderLeft: '1px solid #dbdbdb',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease',
        zIndex: 1200,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Notifications</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {mockNotifications.map((notif) => (
        <Box key={notif.id} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={notif.avatar} />
            <Box>
              <Typography variant="body2">
                <strong>{notif.user}</strong> {notif.action}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notif.time}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default NotificationSidebar;
