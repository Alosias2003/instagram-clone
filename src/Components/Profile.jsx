


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   Divider,
//   Grid,
//   Tabs,
//   Tab,
//   Modal,
//   IconButton
// } from "@mui/material";
// import { Link, useLocation } from 'react-router-dom';
// import GridOnIcon from '@mui/icons-material/GridOn';
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CloseIcon from '@mui/icons-material/Close';
// import SinglePost from './SinglePost'; // adjust path if needed

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [tab, setTab] = useState(0);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [openModal, setOpenModal] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const location = useLocation();

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

//     if (loggedInUser) {
//       setUser(loggedInUser);

//       const posts = allPosts.filter(
//         (post) => post.author?.username === loggedInUser.username
//       );
//       setUserPosts(posts);
//     }
//   }, [location.state]);

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const toggleLike = (postId) => {
//     setLikedPosts((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   const handleOpenModal = (index) => {
//     setCurrentIndex(index);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => setOpenModal(false);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? userPosts.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === userPosts.length - 1 ? 0 : prev + 1));
//   };

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
//             {(!user.profilePic && user.username?.[0]?.toUpperCase()) || ""}
//           </Avatar>
//         </Grid>

//         <Grid item xs={12} sm={8}>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Typography variant="h5">{user.username}</Typography>
//             <Button
//               component={Link}
//               to="/editprofile"
//               variant="outlined"
//               size="small"
//               sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
//             >
//               Edit Profile
//             </Button>
//           </Box>

//           <Box display="flex" gap={4} mt={2}>
//             <Typography><strong>{userPosts.length}</strong> posts</Typography>
//             <Typography><strong>80</strong> followers</Typography>
//             <Typography><strong>100</strong> following</Typography>
//           </Box>

//           <Box mt={2}>
//             <Typography fontWeight="bold">{user.fullname || user.username}</Typography>
//             <Typography color="text.secondary">{user.bio || "Welcome to my profile!"}</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 4 }} />

//       {/* Tabs */}
//       <Tabs value={tab} onChange={handleTabChange} centered>
//         <Tab icon={<GridOnIcon />} label="Posts" />
//         <Tab icon={<PlayCircleFilledIcon />} label="Reels" />
//         <Tab icon={<PersonPinIcon />} label="Tagged" />
//       </Tabs>

//       <Divider sx={{ mb: 4 }} />

//       {/* Posts Grid */}
//       {tab === 0 && (
//         userPosts.length > 0 ? (
//           <Grid container spacing={0.5}>
//             {userPosts.map((post, index) => (
//               <Grid item xs={4} key={post.id}>
//                 {post.content?.image && (
//                   <Box
//                     component="img"
//                     src={post.content.image}
//                     alt={post.caption}
//                     onClick={() => handleOpenModal(index)}
//                     loading="lazy"
//                     sx={{
//                       width: '100%',
//                       aspectRatio: '1/1',
//                       objectFit: 'cover',
//                       borderRadius: 0,
//                       cursor: 'pointer'
//                     }}
//                   />
//                 )}
//                 {post.content?.video && (
//                   <Box
//                     component="video"
//                     src={post.content.video}
//                     onClick={() => handleOpenModal(index)}
//                     sx={{
//                       width: '100%',
//                       aspectRatio: '1/1',
//                       objectFit: 'cover',
//                       borderRadius: 0,
//                       cursor: 'pointer'
//                     }}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box textAlign="center" mt={4}>
//             <Typography variant="body1" color="text.secondary">No posts yet.</Typography>
//           </Box>
//         )
//       )}

//       {/* Modal for Single Post view */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.9)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             p: 2,
//             zIndex: 9999
//           }}
//         >
//           <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 10, color: '#fff' }}>
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <Box sx={{ maxWidth: '465px', width: '100%' }}>
//             <SinglePost
//               post={userPosts[currentIndex]}
//               isLiked={likedPosts[userPosts[currentIndex]?.id] || false}
//               toggleLike={toggleLike}
//             />
//           </Box>

//           <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 10, color: '#fff' }}>
//             <ArrowForwardIosIcon />
//           </IconButton>

//           <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 10, right: 10, color: '#fff' }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Grid,
  Tabs,
  Tab,
  Modal,
  IconButton
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import GridOnIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import SinglePost from './SinglePost';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);
  const [tab, setTab] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  const location = useLocation();

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

//     if (loggedInUser) {
//       setUser(loggedInUser);

//       const posts = allPosts.filter(
//         (post) => post.author?.username === loggedInUser.username
//       );
//       setUserPosts(posts);

//       const userReels = posts.filter(post => post.content?.video);
//       setReels(userReels);

//       const tagged = allPosts.filter(
//         (post) => post.tags?.includes(loggedInUser.username)
//       );
//       setTaggedPosts(tagged);
//     }
//   }, [location.state]);


useEffect(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

  if (loggedInUser) {
    setUser(loggedInUser);

    const posts = allPosts.filter(
      (post) => post.author?.username === loggedInUser.username
    );
    setUserPosts(posts);

    const userReels = posts.filter((post) => post.content?.video);
    setReels(userReels);

    const tagged = allPosts.filter((post) =>
      post.tags?.includes(loggedInUser.username)
    );
    setTaggedPosts(tagged);
  }
}, [location]);



  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleOpenModal = (index, data) => {
    setCurrentIndex(index);
    setCurrentData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentData.length - 1 ? 0 : prev + 1));
  };

  const renderGrid = (data) => (
    <Grid container spacing={0.5}>
      {data.map((post, index) => (
        <Grid item xs={4} key={post.id || index}>
          {post.content?.image && (
            <Box
              component="img"
              src={post.content.image}
              alt={post.caption}
              onClick={() => handleOpenModal(index, data)}
              loading="lazy"
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
            />
          )}
          {post.content?.video && (
            <Box
              component="video"
              src={post.content.video}
              onClick={() => handleOpenModal(index, data)}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );

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
            <Typography><strong>{userPosts.length}</strong> posts</Typography>
            <Typography><strong>80</strong> followers</Typography>
            <Typography><strong>100</strong> following</Typography>
          </Box>

          <Box mt={2}>
            <Typography fontWeight="bold">{user.fullname || user.username}</Typography>
            <Typography color="text.secondary">{user.bio || "Welcome to my profile!"}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Tabs */}
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab icon={<GridOnIcon />} label="Posts" />
        <Tab icon={<PlayCircleFilledIcon />} label="Reels" />
        <Tab icon={<PersonPinIcon />} label="Tagged" />
      </Tabs>

      <Divider sx={{ mb: 4 }} />

      {/* Posts */}
      {tab === 0 && (userPosts.length > 0 ? renderGrid(userPosts) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">No posts yet.</Typography>
        </Box>
      ))}

      {/* Reels */}
      {tab === 1 && (reels.length > 0 ? renderGrid(reels) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">No reels yet.</Typography>
        </Box>
      ))}

      {/* Tagged */}
      {tab === 2 && (taggedPosts.length > 0 ? renderGrid(taggedPosts) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">No tagged posts yet.</Typography>
        </Box>
      ))}

      {/* Modal for Single Post view */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            zIndex: 9999
          }}
        >
          <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 10, color: '#fff' }}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box sx={{ maxWidth: '465px', width: '100%' }}>
            {currentData.length > 0 && (
              <SinglePost
                post={currentData[currentIndex]}
                isLiked={likedPosts[currentData[currentIndex]?.id] || false}
                toggleLike={toggleLike}
              />
            )}
          </Box>

          <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 10, color: '#fff' }}>
            <ArrowForwardIosIcon />
          </IconButton>

          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 10, right: 10, color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
