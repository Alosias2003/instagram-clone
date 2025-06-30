// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   Divider,
//   Grid,
//   ImageList,
//   ImageListItem,
// } from "@mui/material";
// import { Link } from 'react-router-dom';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

//     if (loggedInUser) {
//       setUser(loggedInUser);
//       const filteredPosts = allPosts.filter((post) => post.username === loggedInUser.username);
//       setUserPosts(filteredPosts);
//     }
//   }, []);

//   if (!user) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <Typography variant="h6">User not found. Please log in again.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ maxWidth: 935, mx: "auto", mt: 4, px: 2 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} sm={4} display="flex" justifyContent="center">
//           <Avatar
//             src={user.profilePic || ""}
//             alt={user.username}
//             sx={{ width: 150, height: 150, fontSize: 40 }}
//           >
//             {user.username?.[0]?.toUpperCase()}
//           </Avatar>
//         </Grid>

//         <Grid item xs={12} sm={8}>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Typography variant="h5">{user.username}</Typography>
//             <Button
//             component={Link}
//             to="/editprofile"
//             variant="outlined"
//             size="small"
//             sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
//             >
//             Edit Profile
//         </Button>
//           </Box>

//           <Box display="flex" gap={4} mt={2}>
//             <Typography>
//               <strong>{userPosts.length}</strong> posts
//             </Typography>
//             <Typography>
//               <strong>80</strong> followers
//             </Typography>
//             <Typography>
//               <strong>100</strong> following
//             </Typography>
//           </Box>

//           <Box mt={2}>
//             <Typography fontWeight="bold">{user.fullname || user.username}</Typography>
//             <Typography color="text.secondary">{user.bio || "Welcome to my profile!"}</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 4 }} />

//       {/* Posts Grid */}
//       {userPosts.length > 0 ? (
//         <ImageList variant="masonry" cols={3} gap={8}>
//           {userPosts.map((post, index) => (
//             <ImageListItem key={index}>
//               <img
//                 src={post.image}
//                 alt={`post-${index}`}
//                 loading="lazy"
//                 style={{ borderRadius: "10px" }}
//               />
//             </ImageListItem>
//           ))}
//         </ImageList>
//       ) : (
//         <Box textAlign="center" mt={4}>
//           <Typography variant="body1" color="text.secondary">
//             No posts yet.
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Profile;


// src/Components/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    if (loggedInUser) {
      setUser(loggedInUser);
      const filteredPosts = allPosts.filter(
        (post) => post.username === loggedInUser.username
      );
      setUserPosts(filteredPosts);
    }
  }, [location.state]);

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">User not found. Please log in again.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 935, mx: "auto", mt: 4, px: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
          <Avatar
            src={user.profilePic || ""}
            alt={user.username}
            sx={{ width: 150, height: 150, fontSize: 40 }}
          >
            {(!user.profilePic && user.username?.[0]?.toUpperCase()) || ""}
          </Avatar>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5">{user.username}</Typography>
            <Button
              component={Link}
              to="/editprofile"
              variant="outlined"
              size="small"
              sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
            >
              Edit Profile
            </Button>
          </Box>

          <Box display="flex" gap={4} mt={2}>
            <Typography>
              <strong>{userPosts.length}</strong> posts
            </Typography>
            <Typography>
              <strong>80</strong> followers
            </Typography>
            <Typography>
              <strong>100</strong> following
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography fontWeight="bold">
              {user.fullname || user.username}
            </Typography>
            <Typography color="text.secondary">
              {user.bio || "Welcome to my profile!"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {userPosts.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {userPosts.map((post, index) => (
            <ImageListItem key={index}>
              <img
                src={post.image}
                alt={`post-${index}`}
                loading="lazy"
                style={{ borderRadius: "10px" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            No posts yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
