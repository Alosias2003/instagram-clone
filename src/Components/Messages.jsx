import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, Divider, TextField, Button } from '@mui/material';

const dummyChats = [
  { id: 1, name: 'anu', message: 'anu sent an attachment.', time: '3h', unread: true, avatar: '/assets/anu.jpg' },
  { id: 2, name: 'Anto Roy', message: 'Reacted 🤣 to your message', time: '5h', unread: true },
  { id: 3, name: 'YOBU', message: 'You sent an attachment.', time: '6h', unread: true },
  { id: 4, name: 'Ahaz Joy', message: 'Reacted 😅 to your message', time: '15h', unread: true },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState('');

  return (
    <Box sx={{ display: 'flex',  }}>
        <Box sx={{height:'100vh',width:'244.2px' }}>hghujg</Box>
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: '330px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <Typography variant="h6" p={2}>_aloysparkz_</Typography>
        <Divider />
        <TextField fullWidth size="small"  placeholder="Search" sx={{ m: 1, width:'300px' }} />

        {dummyChats.map(chat => (
          <Box
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            sx={{ px: 2, py: 1, cursor: 'pointer', background: selectedChat?.id === chat.id ? '#f0f0f0' : 'white' }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar src={chat.avatar || '/assets/default.jpg'} />
              <Box>
                <Typography fontWeight="bold">{chat.name}</Typography>
                <Typography variant="body2" color="text.secondary">{chat.message}</Typography>
              </Box>
              {chat.unread && <Box sx={{ width: 8, height: 8, bgcolor: 'blue', borderRadius: '50%', ml: 'auto' }} />}
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Main chat window */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedChat ? (
          <>
            <Typography variant="h6" gutterBottom>{selectedChat.name}</Typography>
            <Box sx={{ flex: 1, minHeight: 400, border: '1px solid #eee', mb: 2, p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                You started a chat with {selectedChat.name}.
              </Typography>
              {/* Message thread display can go here */}
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button variant="contained" onClick={() => {
                // Send logic
                setInput('');
              }}>Send</Button>
            </Stack>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
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
