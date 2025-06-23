// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Divider,
// } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     emailOrMobile: '',
//     password: '',
//     fullName: '',
//     username: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now, just log the data. Later, you can send to backend.
//     console.log('Signup Data:', formData);

//     // Example: add basic validation or redirect to login
//     if (
//       formData.emailOrMobile &&
//       formData.password &&
//       formData.fullName &&
//       formData.username
//     ) {
//       alert('Signup successful!');
//     } else {
//       alert('Please fill out all fields.');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: '#fafafa',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         px: 2,
//       }}
//     >
//       <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px', py: 4 }}>
//         <SignupBox
//           formData={formData}
//           onChange={handleChange}
//           onSubmit={handleSubmit}
//         />
//         <LoginLink />
//       </Box>
//     </Box>
//   );
// };

// const SignupBox = ({ formData, onChange, onSubmit }) => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: 'white',
//         border: '1px solid #dbdbdb',
//         p: 4,
//         borderRadius: 1,
//         mb: 2,
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           mb: 2,
//           fontFamily: "'Lobster', cursive",
//         }}
//       >
//         Instagram
//       </Typography>

//       <Typography
//         variant="body1"
//         sx={{ color: '#737373', mb: 3, fontWeight: 'bold' }}
//       >
//         Sign up to see your friends and videos
//       </Typography>

//       <Button
//         variant="contained"
//         startIcon={<span style={{ fontSize: '20px' }}>f</span>}
//         sx={{
//           backgroundColor: '#1877f2',
//           textTransform: 'none',
//           fontWeight: 'bold',
//           mb: 2,
//           width: '100%',
//         }}
//       >
//         Log in with Facebook
//       </Button>

//       <Divider sx={{ my: 2 }}>OR</Divider>

//       <Box
//         component="form"
//         onSubmit={onSubmit}
//         sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//       >
//         <TextField
//           name="emailOrMobile"
//           label="Mobile Number or Email"
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={formData.emailOrMobile}
//           onChange={onChange}
//         />
//         <TextField
//           name="password"
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={formData.password}
//           onChange={onChange}
//         />
//         <TextField
//           name="fullName"
//           label="Full Name"
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={formData.fullName}
//           onChange={onChange}
//         />
//         <TextField
//           name="username"
//           label="Username"
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={formData.username}
//           onChange={onChange}
//         />

//         <Typography
//           variant="caption"
//           sx={{ color: '#737373', mt: 1, display: 'block' }}
//         >
//           People who use our service may have uploaded your contact information to Instagram.{' '}
//           <Link component={RouterLink} to="/learn-more" sx={{ color: '#00376b' }}>
//             Learn more
//           </Link>
//         </Typography>

//         <Typography
//           variant="caption"
//           sx={{ color: '#737373', mt: 1, display: 'block' }}
//         >
//           By signing up, you agree to our{' '}
//           <Link component={RouterLink} to="/terms" sx={{ color: '#00376b' }}>
//             Terms
//           </Link>,{' '}
//           <Link component={RouterLink} to="/privacy" sx={{ color: '#00376b' }}>
//             Privacy Policy
//           </Link> and{' '}
//           <Link component={RouterLink} to="/cookies" sx={{ color: '#00376b' }}>
//             Cookies Policy
//           </Link>.
//         </Typography>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ textTransform: 'none', fontWeight: 'bold', mt: 2 }}
//         >
//           Sign up
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// const LoginLink = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: 'white',
//         border: '1px solid #dbdbdb',
//         p: 2,
//         borderRadius: 1,
//       }}
//     >
//       <Typography variant="body2">
//         Have an account?{' '}
//         <Link
//           component={RouterLink}
//           to="/login"
//           sx={{ color: '#1976d2', fontWeight: 'bold' }}
//         >
//           Log in
//         </Link>
//       </Typography>
//     </Box>
//   );
// };

// export default Signup;




import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Instagramlogo } from '../Assets/instagram-2-cleaned.svg'

const Signup = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
    fullName: '',
    username: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 6) return 'Weak';
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
      return 'Strong';
    }
    return 'Medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailOrMobile, password, fullName, username } = formData;

    if (!emailOrMobile || !password || !fullName || !username) {
      alert('Please fill out all fields.');
      return;
    }

    if (getPasswordStrength(password) === 'Weak') {
      alert('Password is too weak. Use at least 6 characters with uppercase letters and numbers.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const isExisting = existingUsers.some(
      (user) =>
        user.username === username || user.emailOrMobile === emailOrMobile
    );

    if (isExisting) {
      alert('User with this email or username already exists.');
      return;
    }

    const newUser = { username, password, emailOrMobile };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px', py: 4 }}>
        <SignupBox
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          passwordStrength={passwordStrength}
        />
        <LoginLink />
      </Box>
    </Box>
  );
};

const SignupBox = ({ formData, onChange, onSubmit, passwordStrength }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: '1px solid #dbdbdb',
        p: 4,
        borderRadius: 1,
        mb: 2,
      }}
    >
   <Instagramlogo  style={{ fill:'red',width:'50%',height:'20%'}}/>

      <Typography
        variant="body1"
        sx={{ color: '#737373', mb: 3, fontWeight: 'bold' }}
      >
        Sign up to see your friends and videos
      </Typography>
  
       {/* <Link component={RouterLink} to="/facebooklogin" />
        <Button
        variant="contained"
        startIcon={<span style={{ fontSize: '20px' }}>f</span>}
        sx={{
          backgroundColor: '#1877f2',
          textTransform: 'none',
          fontWeight: 'bold',
          mb: 2,
          width: '100%',
        }}
      >
        Log in with Facebook
      </Button>
       
       <Link/> */}
       
       <Link component={RouterLink} to="/facebooklogin" underline="none">
        <Button
          variant="contained"
          startIcon={<span style={{ fontSize: '20px' }}>f</span>}
          sx={{
            backgroundColor: '#1877f2',
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 2,
            width: '100%',
          }}
        >
          Log in with Facebook
        </Button>
      </Link>
          
        
     


      <Divider sx={{ my: 2 }}>OR</Divider>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          name="emailOrMobile"
          label="Mobile Number or Email"
          variant="outlined"
          fullWidth
          size="small"
          value={formData.emailOrMobile}
          onChange={onChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="small"
          value={formData.password}
          onChange={onChange}
        />
        {passwordStrength && (
          <Typography
            variant="caption"
            sx={{
              color:
                passwordStrength === 'Strong'
                  ? 'green'
                  : passwordStrength === 'Medium'
                  ? 'orange'
                  : 'red',
              ml: 1,
              mt: -1,
            }}
          >
            Password Strength: {passwordStrength}
          </Typography>
        )}
        <TextField
          name="fullName"
          label="Full Name"
          variant="outlined"
          fullWidth
          size="small"
          value={formData.fullName}
          onChange={onChange}
        />
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
          value={formData.username}
          onChange={onChange}
        />

        <Typography
          variant="caption"
          sx={{ color: '#737373', mt: 1, display: 'block' }}
        >
          People who use our service may have uploaded your contact information to Instagram.{' '}
          <Link component={RouterLink} to="/learn-more" sx={{ color: '#00376b' }}>
            Learn more
          </Link>
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: '#737373', mt: 1, display: 'block' }}
        >
          By signing up, you agree to our{' '}
          <Link component={RouterLink} to="/terms" sx={{ color: '#00376b' }}>
            Terms
          </Link>,{' '}
          <Link component={RouterLink} to="/privacy" sx={{ color: '#00376b' }}>
            Privacy Policy
          </Link> and{' '}
          <Link component={RouterLink} to="/cookies" sx={{ color: '#00376b' }}>
            Cookies Policy
          </Link>.
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: 'none', fontWeight: 'bold', mt: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

const LoginLink = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: '1px solid #dbdbdb',
        p: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="body2">
        Have an account?{' '}
        <Link
          component={RouterLink}
          to="/login"
          sx={{ color: '#1976d2', fontWeight: 'bold' }}
        >
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
