import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

function Facebooklogin() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    if (!formData.emailOrPhone || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Login data:', formData);
  };

  const languages = [
    "English (UK)", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "اردو", "हिन्दी", "മലയാളം", "ગુજરાતી", "বাংলা", "मराठी"
  ];

  const links = [
    "Sign Up", "Log in", "Messenger", "Facebook Lite", "Video", "Meta Pay", "Meta Store",
    "Meta Quest", "Ray-Ban Meta", "Meta AI", "Instagram", "Threads",
    "Voting Information Centre", "Privacy Policy", "Privacy Centre", "About",
    "Create ad", "Create Page", "Developers", "Careers", "Cookies", "AdChoices", "Terms", "Help"
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', bgcolor: '#f0f2f5' }}>
      {/* Login Box */}
      <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px', mx: 'auto', py: 4 }}>
        <Box sx={{ backgroundColor: 'white', boxShadow: 1, p: 3, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: '#1877f2', fontWeight: 'bold', mb: 2 }}>
            facebook
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff8e1', p: 1, borderRadius: 1, mb: 2 }}>
            <InfoOutlined sx={{ color: '#ffca28', mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#000' }}>
              You must log in to continue.
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Log in to Facebook
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email address or phone number"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ backgroundColor: '#1877f2', textTransform: 'none', fontWeight: 'bold', mt: 2 }}
            onClick={handleLogin}
          >
            Log in
          </Button>

          <Box sx={{ mt: 2 }}>
            <Link href="#" sx={{ color: '#1877f2', fontSize: '14px' }}>Forgotten account?</Link>
            <Link href="#" sx={{ color: '#1877f2', fontSize: '14px', ml: 1 }}>Sign up for Facebook</Link>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', color: '#737373', fontSize: '12px', py: 2, borderTop: '1px solid #ddd' }}>
        <Box sx={{ mb: 1 }}>
          {languages.map((lang, index) => (
            <Link key={index} href="#" sx={{ mx: 0.5, color: '#737373', textDecoration: 'none' }}>
              {lang}
            </Link>
          ))}
          <Link href="#" sx={{ mx: 0.5, color: '#737373', textDecoration: 'none' }}>+</Link>
        </Box>
        <Box sx={{ maxWidth: '90%', mx: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map((link, index) => (
            <Link key={index} href="#" sx={{ mx: 0.5, my: 0.5, color: '#737373', textDecoration: 'none' }}>
              {link}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Facebooklogin;
