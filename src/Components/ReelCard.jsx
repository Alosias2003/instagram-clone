// // // ReelCard.jsx
// // import React, { useRef, useEffect, useState } from 'react';
// // import {
// //   Box,
// //   IconButton,
// //   Typography,
// //   Stack,
// //   Avatar,
// //   Fade,
// // } from '@mui/material';
// // import {
// //   Favorite,
// //   FavoriteBorder,
// //   Comment,
// //   Share,
// //   VolumeOff,
// //   VolumeUp,
// // } from '@mui/icons-material';

// // const ReelCard = ({ reel }) => {
// //   const videoRef = useRef(null);
// //   const [muted, setMuted] = useState(true);
// //   const [liked, setLiked] = useState(false);
// //   const [showHeart, setShowHeart] = useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (videoRef.current) {
// //           entry.isIntersecting ? videoRef.current.play() : videoRef.current.pause();
// //         }
// //       },
// //       { threshold: 0.8 }
// //     );

// //     if (videoRef.current) observer.observe(videoRef.current);
// //     return () => observer.disconnect();
// //   }, []);

// //   const handleDoubleClick = () => {
// //     setLiked(true);
// //     setShowHeart(true);
// //     setTimeout(() => setShowHeart(false), 800);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         position: 'relative',
// //         height: '100vh',
// //         backgroundColor: 'black',
// //         overflow: 'hidden',
// //       }}
// //       onDoubleClick={handleDoubleClick}
// //     >
// //       <video
// //         ref={videoRef}
// //         src={reel.src}
// //         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //         muted={muted}
// //         loop
// //         playsInline
// //       />

// //       {/* Heart Animation */}
// //       <Fade in={showHeart}>
// //         <Favorite
// //           sx={{
// //             position: 'absolute',
// //             top: '45%',
// //             left: '45%',
// //             fontSize: 80,
// //             color: 'white',
// //             transform: 'scale(1.2)',
// //             zIndex: 10,
// //           }}
// //         />
// //       </Fade>

// //       {/* Reel Info */}
// //       <Box
// //         sx={{
// //           position: 'absolute',
// //           bottom: 60,
// //           left: 16,
// //           color: 'white',
// //         }}
// //       >
// //         <Typography fontWeight="bold">@{reel.username}</Typography>
// //         <Typography variant="body2">{reel.caption}</Typography>
// //       </Box>

// //       {/* Right Side Icons */}
// //       <Stack
// //         direction="column"
// //         spacing={2}
// //         sx={{
// //           position: 'absolute',
// //           right: 16,
// //           bottom: 80,
// //           color: 'white',
// //         }}
// //         alignItems="center"
// //       >
// //         <IconButton onClick={() => setLiked(!liked)} sx={{ color: 'white' }}>
// //           {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
// //         </IconButton>
// //         <IconButton sx={{ color: 'white' }}>
// //           <Comment />
// //         </IconButton>
// //         <IconButton sx={{ color: 'white' }}>
// //           <Share />
// //         </IconButton>
// //         <IconButton onClick={() => setMuted(!muted)} sx={{ color: 'white' }}>
// //           {muted ? <VolumeOff /> : <VolumeUp />}
// //         </IconButton>
// //       </Stack>

// //       {/* Profile Avatar */}
// //       <Avatar
// //         alt={reel.username}
// //         src={reel.avatar}
// //         sx={{
// //           position: 'absolute',
// //           bottom: 20,
// //           right: 16,
// //           width: 40,
// //           height: 40,
// //           border: '2px solid white',
// //         }}
// //       />
// //     </Box>
// //   );
// // };

// // export default ReelCard;



// // // ReelCard.jsx
// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   IconButton,
// //   Typography,
// //   Modal,
// //   TextField,
// //   Button
// // } from '@mui/material';
// // import {
// //   Favorite,
// //   FavoriteBorder,
// //   Comment
// // } from '@mui/icons-material';

// // const ReelCard = ({ reel, onDelete, onEdit }) => {
// //   const [liked, setLiked] = useState(false);
// //   const [likeCount, setLikeCount] = useState(
// //     parseInt(localStorage.getItem(`likes-${reel.id}`)) || reel.likes || 0
// //   );
// //   const [openComment, setOpenComment] = useState(false);
// //   const [commentText, setCommentText] = useState('');
// //   const [comments, setComments] = useState(reel.comments || []);
// //   const [showFullCaption, setShowFullCaption] = useState(false);

// //   const toggleLike = () => {
// //     const updated = liked ? likeCount - 1 : likeCount + 1;
// //     setLikeCount(updated);
// //     setLiked(!liked);
// //     localStorage.setItem(`likes-${reel.id}`, updated);
// //   };

// //   const handleCommentSubmit = () => {
// //     if (!commentText.trim()) return;
// //     setComments(prev => [...prev, { user: 'you', text: commentText }]);
// //     setCommentText('');
// //   };

// //   return (
// //     <Box sx={{ mb: 4 }}>
// //       <Box
// //         component="video"
// //         src={reel.src}
// //         controls
// //         autoPlay
// //         muted
// //         loop
// //         sx={{
// //           width: '100%',
// //           maxHeight: 500,
// //           borderRadius: 2,
// //           objectFit: 'cover'
// //         }}
// //       />
// //       <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
// //         <IconButton onClick={toggleLike}>
// //           {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
// //         </IconButton>
// //         <Typography variant="caption">{likeCount} likes</Typography>
// //         <IconButton onClick={() => setOpenComment(true)}>
// //           <Comment />
// //         </IconButton>
// //       </Box>

// //       <Typography
// //         variant="body2"
// //         sx={{
// //           mt: 1,
// //           display: '-webkit-box',
// //           WebkitLineClamp: showFullCaption ? 'unset' : 2,
// //           WebkitBoxOrient: 'vertical',
// //           overflow: 'hidden',
// //           textOverflow: 'ellipsis',
// //         }}
// //       >
// //         {reel.caption}
// //       </Typography>
// //       <Button
// //         onClick={() => setShowFullCaption(!showFullCaption)}
// //         size="small"
// //         sx={{ textTransform: 'none' }}
// //       >
// //         {showFullCaption ? 'Show less' : 'Read more'}
// //       </Button>

// //       <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#888' }}>
// //         🎵 Original audio - {reel.audio || 'trending_reel.mp3'}
// //       </Typography>

// //       {reel.username === 'you' && (
// //         <Box sx={{ mt: 1 }}>
// //           <Button color="error" size="small" onClick={() => onDelete(reel.id)}>Delete</Button>
// //           <Button color="primary" size="small" onClick={() => onEdit(reel.id)}>Edit</Button>
// //         </Box>
// //       )}

// //       <Modal open={openComment} onClose={() => setOpenComment(false)}>
// //         <Box
// //           sx={{
// //             position: 'absolute',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //             bgcolor: 'background.paper',
// //             p: 3,
// //             borderRadius: 2,
// //             width: '90%',
// //             maxWidth: 400,
// //           }}
// //         >
// //           <Typography variant="h6">Comments</Typography>
// //           <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 1, mb: 2 }}>
// //             {comments.map((c, idx) => (
// //               <Typography key={idx} variant="body2">
// //                 <strong>@{c.user}:</strong> {c.text}
// //               </Typography>
// //             ))}
// //           </Box>
// //           <TextField
// //             fullWidth
// //             label="Add a comment"
// //             value={commentText}
// //             onChange={(e) => setCommentText(e.target.value)}
// //           />
// //           <Button onClick={handleCommentSubmit} sx={{ mt: 1 }}>
// //             Post
// //           </Button>
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default ReelCard;



// // ReelCard.jsx
// import React, { useState, useRef } from 'react';
// import {
//   Box, IconButton, Typography, Button
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, Comment, VolumeOff, VolumeUp
// } from '@mui/icons-material';

// const ReelCard = ({ reel }) => {
//   const [liked, setLiked] = useState(false);
//   const [muted, setMuted] = useState(true);
//   const [likeCount, setLikeCount] = useState(reel.likes || 0);
//   const videoRef = useRef();

//   const toggleLike = () => {
//     const updated = liked ? likeCount - 1 : likeCount + 1;
//     setLikeCount(updated);
//     setLiked(!liked);
//   };

//   const toggleMute = () => {
//     setMuted(!muted);
//     if (videoRef.current) {
//       videoRef.current.muted = !videoRef.current.muted;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         position: 'relative',
//         backgroundColor: 'black',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <video
//         ref={videoRef}
//         src={reel.src}
//         autoPlay
//         muted={muted}
//         loop
//         playsInline
//         style={{ height: '100%', objectFit: 'cover' }}
//       />

//       {/* Mute Button Top Right */}
//       <IconButton
//         onClick={toggleMute}
//         sx={{
//           position: 'absolute',
//           top: 16,
//           right: 16,
//           backgroundColor: '#00000088',
//           color: 'white',
//         }}
//       >
//         {muted ? <VolumeOff /> : <VolumeUp />}
//       </IconButton>

//       {/* Bottom Left Info */}
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: 24,
//           left: 16,
//           color: 'white',
//         }}
//       >
//         <Typography variant="body1" fontWeight="bold">@{reel.username}</Typography>
//         <Typography variant="body2" sx={{ maxWidth: '70vw' }}>
//           {reel.caption}
//         </Typography>
//         <Typography variant="caption">🎵 {reel.audio || "Original Audio"}</Typography>
//       </Box>

//       {/* Right Side Icons */}
//       <Box
//         sx={{
//           position: 'absolute',
//           right: 16,
//           bottom: 100,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 2,
//           color: 'white'
//         }}
//       >
//         <IconButton onClick={toggleLike} sx={{ color: 'white' }}>
//           {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
//         </IconButton>
//         <Typography variant="caption">{likeCount}</Typography>
//         <IconButton sx={{ color: 'white' }}>
//           <Comment />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default ReelCard;


// ReelCard.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Comment, VolumeOff, VolumeUp, Send, BookmarkBorder } from '@mui/icons-material';

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes || 0);

  const toggleMute = () => {
    setMuted(!muted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <Box
      sx={{
       
    height: '650px',
    width: '30%',
    position: 'relative',
    backgroundColor: 'black',
    overflow: 'hidden',
     margin: '0 auto',
      marginBottom: '10px', 
    

        
      }}  
    >
      <video
        ref={videoRef}
        src={reel.src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          
          
       
        }}
      />

      {/* Mute/Unmute Button */}
      <IconButton
        onClick={toggleMute}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: 'white'
        }}
      >
        {muted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>

      {/* Bottom Left Info */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'white'
        }}
      >
        <Typography variant="subtitle2">@{reel.username}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, maxWidth: '60vw' }}>{reel.caption}</Typography>
        <Typography variant="caption" sx={{ mt: 0.5 }}>🎵 {reel.audio || "Original audio"}</Typography>
      </Box>

      {/* Right Side Buttons */}
      <Box
        sx={{
          position: 'absolute',
          right: 20,
          bottom: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          color: 'white'
        }}
      >
        <IconButton onClick={handleLike} sx={{ color: 'white' }}>
          {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="caption">{likes}</Typography>

        <IconButton sx={{ color: 'white' }}>
          <Comment />
        </IconButton>

        <IconButton sx={{ color: 'white' }}>
          <Send />
        </IconButton>

        <IconButton sx={{ color: 'white' }}>
          <BookmarkBorder />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ReelCard;
