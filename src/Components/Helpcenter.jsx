import React, { useState } from 'react';
import {
  Box, Typography, Link, Divider, Accordion, AccordionSummary, AccordionDetails,
  TextField, Select, MenuItem, InputAdornment, IconButton
} from '@mui/material';

import {
  ExpandMore, Instagram, Settings, Person, Lock, Report, Forum, People
} from '@mui/icons-material';

export default function Helpcenter() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <MainContent />
      </Box>
      <Footer />
    </Box>
  );
}

function Header() {
  const [language, setLanguage] = useState('English (US)');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #dbdbdb' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Instagram sx={{ color: '#e1306c', mr: 1 }} />
        <Typography variant="h6">Help Center</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Search help articles..."
          variant="outlined"
          size="small"
          sx={{ width: '300px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <span role="img" aria-label="search">🔍</span>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="small"
          sx={{ minWidth: '120px' }}
        >
          <MenuItem value="English (US)">English (US)</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}

function Sidebar() {
  return (
    <Box sx={{ width: '250px', borderRight: '1px solid #dbdbdb', p: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[{
            icon: <Instagram />, label: 'Instagram Features'
          }, {
            icon: <Person />, label: 'Manage Your Account'
          }, {
            icon: <Lock />, label: 'Staying Safe'
          }, {
            icon: <Lock />, label: 'Privacy, Security, and Reporting'
          }, {
            icon: <Lock />, label: 'Login and Passwords', links: [
              "I Can't Log In",
              "Hacked Instagram Account",
              "How to keep your Instagram account secure",
              "Keep using one login across multiple Instagram accounts"
            ]
          }, {
            icon: <Report />, label: 'How to Report Things', links: [
              "How to contact the Grievance Officer and Meta in India",
              "Australia Online Safety Act on Instagram"
            ]
          }, {
            icon: <People />, label: 'Impersonation Accounts'
          }, {
            icon: <Forum />, label: 'Terms and Policies'
          }, {
            icon: <span role="img" aria-label="threads">🧵</span>, label: 'Threads'
          }].map((item, idx) => (
            <Accordion key={idx} expanded={item.label === 'Login and Passwords'}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1 }}>{item.icon}</Box>
                  <Typography>{item.label}</Typography>
                </Box>
              </AccordionSummary>
              {item.links && (
                <AccordionDetails>
                  {item.links.map((text, i) => (
                    <Link key={i} href="#" sx={{ display: 'block', color: '#1976d2', mb: 1, bgcolor: i === 0 ? '#e3f2fd' : 'transparent', p: i === 0 ? 1 : 0, borderRadius: 1 }}>
                      {text}
                    </Link>
                  ))}
                </AccordionDetails>
              )}
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: '#1976d2' }}>
        <span role="img" aria-label="feedback" style={{ marginRight: '8px' }}>📣</span>
        <Link href="#" sx={{ color: '#1976d2' }}>Feedback</Link>
      </Box>
    </Box>
  );
}

function MainContent() {
  return (
    <Box sx={{ flex: 1, p: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link href="#" sx={{ color: '#1976d2' }}>Privacy, Security, and Reporting</Link>
        <Typography component="span" sx={{ mx: 1 }}>&gt;</Typography>
        <Link href="#" sx={{ color: '#1976d2' }}>Login and Passwords</Link>
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>I Can't Log In</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#737373' }}>
        You can visit this page on your desktop or mobile browser to try to recover your account.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        If you're having trouble logging into your Instagram account, here are some tips to help you recover your Instagram password, troubleshoot email issues, confirm your identity, or learn what you can do if your account has been hacked.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Username and Password Troubleshooting</Typography>
      {["Recover your Instagram password", "What to do if you forget your Instagram username", "Links in password reset email from Instagram aren't working", "If you think that your Instagram account has been hacked"].map((text, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{text}</Typography>
          </AccordionSummary>
        </Accordion>
      ))}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Email Troubleshooting</Typography>
      {["What to do if the email for your Instagram account was changed", "What you can do if your email can't be found during a password reset for your Instagram account"].map((text, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{text}</Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </Box>
  );
}

function Footer() {
  return (
    <Box sx={{ textAlign: 'center', py: 2, borderTop: '1px solid #dbdbdb' }}>
      <Typography variant="body2" color="text.secondary">&copy; 2025 Instagram Help Center</Typography>
    </Box>
  );
}
