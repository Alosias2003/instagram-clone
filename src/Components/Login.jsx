

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import loginimg from "../Assets/instagram-web-lox-image.png";
import { ReactComponent as Instagramlogo } from '../Assets/instagram-2-cleaned.svg'
import { ReactComponent as FacebookIcon} from '../Assets/facebook-round-color-icon.svg'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        (user.email === identifier || user.username === identifier || user.phone === identifier) &&
        user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Image Section */}
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box>
              <img
                src={loginimg}
                alt="Instagram Promo"
                style={{ width: "100%", height: "329.7px" }}
              />
            </Box>
          </Grid>

          {/* Login Form Section */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box
              sx={{
                // border: "1px solid #dbdbdb",
                // backgroundColor: "#fff",
                p: 3,
                maxWidth: 350,
                mx: "auto",
              }}
            >
              {/* Instagram Logo */}
               <Instagramlogo  style={{ fill:'red',width:'50%',height:'20%'}}/>

              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  margin="dense"
                  placeholder="Phone number, username, or email"
                  size="small"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  sx={{ mb: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  margin="dense"
                  placeholder="Password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" size="small">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography color="error" fontSize={12} mt={1}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 1,
                    backgroundColor: "rgb(0,149,246)",
                    fontWeight: "bold",
                    borderRadius:'10px'
                    // ":hover": { backgroundColor: "#007bb5" },
                    // fontWeight: "bold",
                    // textTransform: "none",
                  }}
                >
                  Log In
                </Button>
              </Box>

              {/* Divider with OR */}
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              {/* Facebook Login */}
              <Link
                component={RouterLink}
                to="/facebooklogin"
                color="#0095f6"
                underline="none"
                fontWeight={600}
                fontSize={14}
                display="block"
                sx={{ mb: 1 }}
                
              >
                <Box sx={{display:'flex', justifyContent:'center',gap:'10px'}}>
                  <FacebookIcon style={{height:'20px',fill:'rgb(0,149,246)'}} />
                Log in with Facebook
                </Box>
              </Link>

              <Link
                component={RouterLink}
                to="/reset-password"
                color="#00376b"
                underline="none"
                fontSize={12}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Sign Up Prompt */}
            <Box
              sx={{
                // border: "1px solid #dbdbdb",
                // backgroundColor: "#fff",
                mt: 2,
                py: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/signup"
                  color="#0095f6"
                  fontWeight="bold"
                  underline="none"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            mt: 6,
            textAlign: "center",
            fontSize: 12,
            color: "#8e8e8e",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mb: 1,
            }}
          >
            {[
              "Meta",
              "About",
              "Blog",
              "Jobs",
              "Help",
              "API",
              "Privacy",
              "Terms",
              "Locations",
              "Instagram Lite",
              "Threads",
              "Contact Uploading & Non-Users",
              "Meta Verified",
            ].map((item, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                underline="none"
                sx={{ color: "#8e8e8e", mx: 1 }}
              >
                {item}
              </Link>
            ))}
          </Box>
          <Typography variant="caption" display="block" color="inherit">
            English ⌄ © 2025 Instagram-Clone By ❣️ <span style={{fontWeight:'bolder'}}>ALOY</span>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
