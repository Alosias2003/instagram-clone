



import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Stack
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Instagramlogo } from '../Assets/instagram-2-cleaned.svg'

function ResetPasswordBox() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      alert('Please enter a valid email, phone, or username.');
      return;
    }
    alert(`Login link sent to: ${input}`);
    setInput('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 350,
          backgroundColor: 'white',
          border: '1px solid #dbdbdb',
          p: 4,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
          <Instagramlogo  style={{ fill:'red',width:'50%',height:'20%'}}/>

        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            border: '1px solid #dbdbdb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ color: '#737373', fontSize: 30 }} />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Trouble logging in?
        </Typography>

        <Typography variant="body2" sx={{ color: '#737373', mb: 3 }}>
          Enter your email, phone, or username and we'll send you a link to get back into your account.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email, Phone, or Username"
              variant="outlined"
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={input.trim() === ''}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: input.trim() === '' ? '#b2dffc' : 'primary.main',
              }}
            >
              Send login link
            </Button>
          </Stack>
        </form>

        <Link  component={RouterLink}to="/helpcenter"  underline="none" sx={{ color: '#00376b', fontSize: 12, display: 'block', mt: 2 }}>
          Can't reset your password?
        </Link>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Link  component={RouterLink}to="/signup" underline="none" sx={{ color: '#00376b', fontSize: 14, fontWeight: 'bold', display: 'block', mb: 2 }}>
          Create new account
        </Link>

        <Divider sx={{ mb: 2 }} />

        <Link  component={RouterLink}to="/login" underline="none" sx={{ color: '#00376b', fontSize: 14, fontWeight: 'bold' }}>
          Back to login
        </Link>
      </Box>
    </Box>
  );
}

export default ResetPasswordBox;
