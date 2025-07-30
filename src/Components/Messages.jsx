

import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Stack, Divider, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const dummyChats = [
  { id: 1, name: 'anu', message: 'anu sent an attachment.', time: '3h', unread: true, avatar: '/assets/anu.jpg' },
  { id: 2, name: 'Anto Roy', message: 'Reacted 🤣 to your message', time: '5h', unread: true },
  { id: 3, name: 'YOBU', message: 'You sent an attachment.', time: '6h', unread: true },
  { id: 4, name: 'Ahaz Joy', message: 'Reacted 😅 to your message', time: '15h', unread: true },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left space for large screens */}
      <Box
        className="space"
        sx={{
          height: '100vh',
          width: { xs: 0, sm: '75px',lg:'240px',md:'240px' },
          display: { xs: 'none', sm: 'block' }
        }}
      />

      <Box sx={{ display: 'flex', height: '100vh', flexGrow: 1 }}>
        {/* Sidebar - hidden on mobile if chat is selected */}
        <Box
          sx={{
            width: { xs: '100%', },
            borderRight: { sm: '1px solid #ddd' },
            overflowY: 'auto',
            display: { xs: selectedChat ? 'none' : 'block', sm: 'block' ,md:'block',lg:'block'},
            bgcolor:'red'
          }}
        >
          <Typography variant="h6" p={2}>
            {loggedInUser?.username || "Guest"}
          </Typography>
          <Divider />
          <TextField fullWidth size="small" placeholder="Search" sx={{ m: 1, width: { xs: '95%', sm: '300px' } }} />

          {dummyChats.map(chat => (
            <Box
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              sx={{
                px: 2,
                py: 1,
                cursor: 'pointer',
                background: selectedChat?.id === chat.id ? '#f0f0f0' : 'white',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={chat.avatar || '/assets/default.jpg'} />
                <Box>
                  <Typography fontWeight="bold">{chat.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{chat.message}</Typography>
                </Box>
                {chat.unread && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: 'blue',
                      borderRadius: '50%',
                      ml: 'auto'
                    }}
                  />
                )}
              </Stack>
            </Box>
          ))}
        </Box>

        {/* Main chat window */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: { xs: selectedChat ? 'block' : 'none', sm: 'block' },
            width: '100%'
          }}
        >
          {selectedChat ? (
            <>
              {/* Back button on mobile */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>{selectedChat.name}</Typography>
              </Box>

              {/* Chat body */}
              <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }} gutterBottom>
                {selectedChat.name}
              </Typography>

              <Box sx={{ flex: 1, minHeight: 400, border: '1px solid #eee', mb: 2, p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  You started a chat with {selectedChat.name}.
                </Typography>
                {/* Message thread goes here */}
              </Box>

              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  placeholder="Message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    // Send logic
                    setInput('');
                  }}
                >
                  Send
                </Button>
              </Stack>
            </>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                mt: 10,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              <img src="/assets/messenger-icon.png" alt="Messenger" width={64} />
              <Typography variant="h6" mt={2}>Your messages</Typography>
              <Typography variant="body2" color="text.secondary">Send a message to start a chat.</Typography>
              <Button variant="contained" sx={{ mt: 2 }}>Send message</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
