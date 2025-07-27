// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar, Box, Card, CardContent, IconButton,
//   Typography, Stack, CircularProgress, useMediaQuery, useTheme
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
//   BookmarkBorder, Send
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [likesCount, setLikesCount] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();
  
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAllPosts(sorted);
//       setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
//       const initialLikes = {};
//       sorted.forEach(post => {
//         initialLikes[post.id] = post.likes;
//       });
//       setLikesCount(initialLikes);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           setLoading(true);
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setTimeout(() => {
//             setVisiblePosts((prev) => [...prev, ...nextChunk]);
//             setLoading(false);
//           }, 500);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//       setLikesCount((prev) => ({
//         ...prev,
//         [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const getPostWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '100%';
//     return '470px';
//   };

//   const getPostMargin = () => {
//     if (isMobile) return '0';
//     return '0 auto 20px auto';
//   };

//   return (
//     <Box sx={{ 
//       width: '100%', 
//       maxWidth: '100%',
//       display: 'flex', 
//       flexDirection: 'column',
//       alignItems: 'center',
//       bgcolor: isMobile ? '#fafafa' : 'transparent'
//     }}>
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             width: getPostWidth(),
//             maxWidth: isMobile ? '100%' : '470px',
//             margin: getPostMargin(),
//             marginBottom: isMobile ? '12px' : '20px',
//             borderRadius: isMobile ? 0 : '8px',
//             boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
//             border: isMobile ? 'none' : '1px solid #dbdbdb',
//             bgcolor: '#fff',
//             overflow: 'hidden'
//           }}
//         >
//           {/* Header */}
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             p: isMobile ? '12px 16px' : '14px 16px',
//             borderBottom: isMobile ? 'none' : '1px solid #efefef'
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{ 
//                   width: 32, 
//                   height: 32,
//                   border: '1px solid #dbdbdb'
//                 }}
//               />
//               <Box>
//                 <Typography 
//                   variant="subtitle2" 
//                   fontWeight="600"
//                   fontSize="14px"
//                   color="#262626"
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center',
//                     lineHeight: 1.2
//                   }}
//                 >
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: 12, height: 12, marginLeft: 4 }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
//               <MoreHoriz fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Media Content with 4:5 aspect ratio */}
//           {post.content?.image && (
//             <Box
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 paddingTop: '125%', // 4:5 aspect ratio
//                 overflow: 'hidden',
//               }}
//             >
//               <Box
//                 component="img"
//                 src={post.content.image}
//                 alt={post.caption}
//                 loading="lazy"
//                 sx={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'contain',
//                 }}
//               />
//             </Box>
//           )}
//           {post.content?.video && (
//             <Box
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 paddingTop: '125%', // 4:5 aspect ratio
//                 overflow: 'hidden',
//               }}
//             >
//               <video
//                 src={post.content.video}
//                 controls
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                 }}
//               />
//             </Box>
//           )}

//           {/* Actions and Content */}
//           <CardContent sx={{ p: 0 }}>
//             <Stack 
//               direction="row" 
//               justifyContent="space-between" 
//               alignItems="center"
//               sx={{ px: 2, pt: 1, pb: 0.5 }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <IconButton 
//                   onClick={() => toggleLike(post.id)}
//                   size="small"
//                   sx={{ 
//                     p: 0.5,
//                     color: likedPosts[post.id] ? '#ed4956' : '#262626',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {likedPosts[post.id] ? (
//                     <Favorite sx={{ fontSize: 24 }} />
//                   ) : (
//                     <FavoriteBorder sx={{ fontSize: 24 }} />
//                   )}
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <ChatBubbleOutline sx={{ fontSize: 24 }} />
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <Send sx={{ fontSize: 24 }} />
//                 </IconButton>
//               </Stack>
//               <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                 <BookmarkBorder sx={{ fontSize: 24 }} />
//               </IconButton>
//             </Stack>

//             {/* Likes Count */}
//             <Typography 
//               variant="subtitle2" 
//               fontWeight="600"
//               color="#262626"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
//             >
//               {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
//             </Typography>

//             {/* Caption */}
//             <Typography 
//               variant="body2" 
//               sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
//             >
//               <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             {/* View Comments */}
//             <Typography 
//               variant="caption" 
//               sx={{ px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
//                 '&:hover': { textDecoration: 'underline' }
//               }}
//             >
//               View all comments
//             </Typography>

//             {/* Timestamp */}
//             <Typography 
//               variant="caption" 
//               sx={{ px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase' }}
//             >
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Loading indicator */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
//         {loading && (
//           <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Post;




// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar, Box, Card, CardContent, IconButton,
//   Typography, Stack, CircularProgress, useMediaQuery, useTheme
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
//   BookmarkBorder, Send
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [likesCount, setLikesCount] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAllPosts(sorted);
//       setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
//       const initialLikes = {};
//       sorted.forEach(post => {
//         initialLikes[post.id] = post.likes;
//       });
//       setLikesCount(initialLikes);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           setLoading(true);
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setTimeout(() => {
//             setVisiblePosts((prev) => [...prev, ...nextChunk]);
//             setLoading(false);
//           }, 500);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//       setLikesCount((prev) => ({
//         ...prev,
//         [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const getPostWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '100%';
//     return '470px';
//   };

//   const getPostMargin = () => {
//     if (isMobile) return '0';
//     return '0 auto 20px auto';
//   };

//   return (
//     <Box sx={{
//       width: '100%',
//       maxWidth: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       bgcolor: isMobile ? '#fafafa' : 'transparent'
//     }}>
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             width: getPostWidth(),
//             maxWidth: isMobile ? '100%' : '470px',
//             margin: getPostMargin(),
//             marginBottom: isMobile ? '12px' : '20px',
//             borderRadius: isMobile ? 0 : '8px',
//             boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
//             border: isMobile ? 'none' : '1px solid #dbdbdb',
//             bgcolor: '#fff',
//             overflow: 'hidden'
//           }}
//         >
//           {/* Header */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: isMobile ? '12px 16px' : '14px 16px',
//             borderBottom: isMobile ? 'none' : '1px solid #efefef'
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{
//                   width: 34,
//                   height: 34,
//                   border: '1px solid #dbdbdb'
//                 }}
//               />
//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight="600"
//                   fontSize="15px" // updated username font size for better visibility like Instagram
//                   color="#262626"
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     lineHeight: 1.2
//                   }}
//                 >
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: 13, height: 13, marginLeft: 4 }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
//               <MoreHoriz fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Media Content with dynamic height */}
//           {post.content?.image && (
//             <Box
//               sx={{
//                 width: '100%',
//                 overflow: 'hidden',
//                 bgcolor: '#000',
//               }}
//             >
//               <Box
//                 component="img"
//                 src={post.content.image}
//                 alt={post.caption}
//                 loading="lazy"
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px', // cap extreme tall images
//                   objectFit: 'contain',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}
//           {post.content?.video && (
//             <Box
//               sx={{
//                 width: '100%',
//                 overflow: 'hidden',
//                 bgcolor: '#000',
//               }}
//             >
//               <video
//                 src={post.content.video}
//                 controls
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px',
//                   objectFit: 'cover',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}

//           {/* Actions and Content */}
//           <CardContent sx={{ p: 0 }}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ px: 2, pt: 1, pb: 0.5 }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <IconButton
//                   onClick={() => toggleLike(post.id)}
//                   size="small"
//                   sx={{
//                     p: 0.5,
//                     color: likedPosts[post.id] ? '#ed4956' : '#262626',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {likedPosts[post.id] ? (
//                     <Favorite sx={{ fontSize: 24 }} />
//                   ) : (
//                     <FavoriteBorder sx={{ fontSize: 24 }} />
//                   )}
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <ChatBubbleOutline sx={{ fontSize: 24 }} />
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <Send sx={{ fontSize: 24 }} />
//                 </IconButton>
//               </Stack>
//               <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                 <BookmarkBorder sx={{ fontSize: 24 }} />
//               </IconButton>
//             </Stack>

//             {/* Likes Count */}
//             <Typography
//               variant="subtitle2"
//               fontWeight="600"
//               color="#262626"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
//             >
//               {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
//             </Typography>

//             {/* Caption */}
//             <Typography
//               variant="body2"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
//             >
//               <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             {/* View Comments */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
//                 '&:hover': { textDecoration: 'underline' }
//               }}
//             >
//               View all comments
//             </Typography>

//             {/* Timestamp */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase'
//               }}
//             >
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Loading indicator */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
//         {loading && (
//           <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Post;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar, Box, Card, CardContent, IconButton,
//   Typography, Stack, CircularProgress, useMediaQuery, useTheme
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
//   BookmarkBorder, Send
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [likesCount, setLikesCount] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   // Responsive sizes
//   const avatarSize = isMobile ? 40 : 34;
//   const iconSize = isMobile ? 28 : 24;
//   const usernameFontSize = isMobile ? '16px' : '15px';

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAllPosts(sorted);
//       setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
//       const initialLikes = {};
//       sorted.forEach(post => {
//         initialLikes[post.id] = post.likes;
//       });
//       setLikesCount(initialLikes);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           setLoading(true);
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setTimeout(() => {
//             setVisiblePosts((prev) => [...prev, ...nextChunk]);
//             setLoading(false);
//           }, 500);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//       setLikesCount((prev) => ({
//         ...prev,
//         [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const getPostWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '100%';
//     return '470px';
//   };

//   const getPostMargin = () => {
//     if (isMobile) return '0';
//     return '0 auto 20px auto';
//   };

//   return (
    
//     <Box sx={{
//       width: '100%',
//       maxWidth: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       bgcolor: isMobile ? '#fafafa' : 'transparent',
//       justifyContent: 'center',
//     }}>
   
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             width: getPostWidth(),
//             maxWidth: isMobile ? '100%' : '470px',
//             margin: getPostMargin(),
//             marginBottom: isMobile ? '12px' : '20px',
//             borderRadius: isMobile ? 0 : '8px',
//             boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
//             border: isMobile ? 'none' : '1px solid #dbdbdb',
//             bgcolor: '#fff',
//             overflow: 'hidden'
//           }}
//         >
//           {/* Header */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: isMobile ? '12px 16px' : '14px 16px',
//             borderBottom: isMobile ? 'none' : '1px solid #efefef'
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{
//                   width: avatarSize,
//                   height: avatarSize,
//                   border: '1px solid #dbdbdb'
//                 }}
//               />
//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight="600"
//                   fontSize={usernameFontSize}
//                   color="#262626"
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     lineHeight: 1.2
//                   }}
//                 >
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: 13, height: 13, marginLeft: 4 }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
//               <MoreHoriz fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Media Content */}
//           {post.content?.image && (
//             <Box sx={{
//               width: '100%',
//               overflow: 'hidden',
//               bgcolor: '#000',
//             }}>
//               <Box
//                 component="img"
//                 src={post.content.image}
//                 alt={post.caption}
//                 loading="lazy"
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px',
//                   objectFit: 'contain',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}
//           {post.content?.video && (
//             <Box sx={{
//               width: '100%',
//               overflow: 'hidden',
//               bgcolor: '#000',
//             }}>
//               <video
//                 src={post.content.video}
//                 controls
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px',
//                   objectFit: 'cover',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}

//           {/* Actions and Content */}
//           <CardContent sx={{ p: 0 }}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ px: 2, pt: 1, pb: 0.5 }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <IconButton
//                   onClick={() => toggleLike(post.id)}
//                   size="small"
//                   sx={{
//                     p: 0.5,
//                     color: likedPosts[post.id] ? '#ed4956' : '#262626',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {likedPosts[post.id] ? (
//                     <Favorite sx={{ fontSize: iconSize }} />
//                   ) : (
//                     <FavoriteBorder sx={{ fontSize: iconSize }} />
//                   )}
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <ChatBubbleOutline sx={{ fontSize: iconSize }} />
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <Send sx={{ fontSize: iconSize }} />
//                 </IconButton>
//               </Stack>
//               <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                 <BookmarkBorder sx={{ fontSize: iconSize }} />
//               </IconButton>
//             </Stack>

//             {/* Likes Count */}
//             <Typography
//               variant="subtitle2"
//               fontWeight="600"
//               color="#262626"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
//             >
//               {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
//             </Typography>

//             {/* Caption */}
//             <Typography
//               variant="body2"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
//             >
//               <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             {/* View Comments */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
//                 '&:hover': { textDecoration: 'underline' }
//               }}
//             >
//               View all comments
//             </Typography>

//             {/* Timestamp */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase'
//               }}
//             >
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Loading indicator */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
//         {loading && (
//           <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Post;








// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar, Box, Card, CardContent, IconButton,
//   Typography, Stack, CircularProgress, useMediaQuery, useTheme
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
//   BookmarkBorder, Send
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [likesCount, setLikesCount] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const avatarSize = isMobile ? 40 : 34;
//   const iconSize = isMobile ? 28 : 24;
//   const usernameFontSize = isMobile ? '16px' : '15px';

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAllPosts(sorted);
//       setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
//       const initialLikes = {};
//       sorted.forEach(post => {
//         initialLikes[post.id] = post.likes;
//       });
//       setLikesCount(initialLikes);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           setLoading(true);
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setTimeout(() => {
//             setVisiblePosts((prev) => [...prev, ...nextChunk]);
//             setLoading(false);
//           }, 500);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//       setLikesCount((prev) => ({
//         ...prev,
//         [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const getPostWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '100%';
//     return '470px'; // Instagram desktop post width
//   };

//   return (
//     <Box sx={{
//       width: '100%',
//       maxWidth: {xl:'935',xs:'600px'}, // Instagram feed container width
//       mx: 'auto', // center horizontally
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       bgcolor: isMobile ? '#fafafa' : 'transparent',
//       justifyContent: 'center',
    
//      paddingLeft: {xl:'250px',md:'230px',sm:'200px',}
//     }}>
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             width: getPostWidth(),
//             maxWidth: isMobile ? '100%' : '470px',
//             marginBottom: isMobile ? '12px' : '20px',
//             borderRadius: isMobile ? 0 : '8px',
//             boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
//             border: isMobile ? 'none' : '1px solid #dbdbdb',
//             bgcolor: '#fff',
//             overflow: 'hidden',
          
            
//           }}
//         >
//           {/* Header */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: isMobile ? '12px 16px' : '14px 16px',
//             borderBottom: isMobile ? 'none' : '1px solid #efefef'
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{
//                   width: avatarSize,
//                   height: avatarSize,
//                   border: '1px solid #dbdbdb'
//                 }}
//               />
//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight="600"
//                   fontSize={usernameFontSize}
//                   color="#262626"
//                   sx={{ display: 'flex', alignItems: 'center', lineHeight: 1.2 }}
//                 >
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: 13, height: 13, marginLeft: 4 }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
//               <MoreHoriz fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Media Content */}
//           {post.content?.image && (
//             <Box sx={{
//               width: '100%',
//             overflow: 'visible',
//               bgcolor: '#000',
//             }}>
//               <Box
//                  component="img"
//                   src={post.content.image}
//                   alt={post.caption}
//                   loading="lazy"
//                   sx={{
//                     width: '100%',
//                     height: 'auto',
//                     objectFit: 'contain',
//                     display: 'block',
//                 }}
//               />
//             </Box>
//           )}
//           {post.content?.video && (
//             <Box sx={{
//               width: '100%',
//               // overflow: 'hidden',
//                 overflow: 'visible',
//               bgcolor: '#000',
//             }}>
//               <video
//                 src={post.content.video}
//                 controls
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px',
//                   objectFit: 'cover',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}

//           {/* Actions and Content */}
//           <CardContent sx={{ p: 0 }}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ px: 2, pt: 1, pb: 0.5 }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <IconButton
//                   onClick={() => toggleLike(post.id)}
//                   size="small"
//                   sx={{
//                     p: 0.5,
//                     color: likedPosts[post.id] ? '#ed4956' : '#262626',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {likedPosts[post.id] ? (
//                     <Favorite sx={{ fontSize: iconSize }} />
//                   ) : (
//                     <FavoriteBorder sx={{ fontSize: iconSize }} />
//                   )}
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <ChatBubbleOutline sx={{ fontSize: iconSize }} />
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <Send sx={{ fontSize: iconSize }} />
//                 </IconButton>
//               </Stack>
//               <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                 <BookmarkBorder sx={{ fontSize: iconSize }} />
//               </IconButton>
//             </Stack>

//             {/* Likes Count */}
//             <Typography
//               variant="subtitle2"
//               fontWeight="600"
//               color="#262626"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
//             >
//               {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
//             </Typography>

//             {/* Caption */}
//             <Typography
//               variant="body2"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
//             >
//               <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             {/* View Comments */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
//                 '&:hover': { textDecoration: 'underline' }
//               }}
//             >
//               View all comments
//             </Typography>

//             {/* Timestamp */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase'
//               }}
//             >
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Loading indicator */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
//         {loading && (
//           <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
//         )}
//       </Box>
//     </Box>
   
//   );
// };

// export default Post;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar, Box, Card, CardContent, IconButton,
//   Typography, Stack, CircularProgress, useMediaQuery, useTheme
// } from '@mui/material';
// import {
//   Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
//   BookmarkBorder, Send
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [likesCount, setLikesCount] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const avatarSize = isMobile ? 40 : 34;
//   const iconSize = isMobile ? 28 : 24;
//   const usernameFontSize = isMobile ? '16px' : '15px';

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAllPosts(sorted);
//       setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
//       const initialLikes = {};
//       sorted.forEach(post => {
//         initialLikes[post.id] = post.likes;
//       });
//       setLikesCount(initialLikes);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           setLoading(true);
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setTimeout(() => {
//             setVisiblePosts((prev) => [...prev, ...nextChunk]);
//             setLoading(false);
//           }, 500);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//       setLikesCount((prev) => ({
//         ...prev,
//         [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const getPostWidth = () => {
//     if (isMobile) return '100%';
//     if (isTablet) return '100%';
//     return '470px'; // Instagram desktop post width
//   };

//   return (
//     <Box sx={{
//       width: '100%',
    
//       mx: 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       // bgcolor: isMobile ? '#fafafa' : 'transparent',
//       bgcolor:'red',
//       justifyContent: 'center',
//       paddingLeft: { xl: '250px', md: '230px',  },
//     }}>
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             width: getPostWidth(),
//             maxWidth: isMobile ? '100%' : '638px',
//             marginBottom: isMobile ? '12px' : '20px',
//             borderRadius: isMobile ? 0 : '8px',
//             boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
//             border: isMobile ? 'none' : '1px solid #dbdbdb',
//             bgcolor: '#fff',
//             overflow: 'visible', // ✅ FIXED: allow image full display
//           }}
//         >
//           {/* Header */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: isMobile ? '12px 16px' : '14px 16px',
//             borderBottom: isMobile ? 'none' : '1px solid #efefef'
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{
//                   width: avatarSize,
//                   height: avatarSize,
//                   border: '1px solid #dbdbdb'
//                 }}
//               />
//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight="600"
//                   fontSize={usernameFontSize}
//                   color="#262626"
//                   sx={{ display: 'flex', alignItems: 'center', lineHeight: 1.2 }}
//                 >
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: 13, height: 13, marginLeft: 4 }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
//               <MoreHoriz fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Media Content */}
//           {post.content?.image && (
//             <Box sx={{
//               width: '100%',
//               overflow: 'visible',
//               bgcolor: '#000',
//             }}>
//               <Box
//                 component="img"
//                 src={post.content.image}
//                 alt={post.caption}
//                 loading="lazy"
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   objectFit: 'contain',
//                   display: 'block',
//                   maxHeight: 'none', // ✅ ensure no forced max height
//                 }}
//               />
//             </Box>
//           )}
//           {post.content?.video && (
//             <Box sx={{
//               width: '100%',
//               overflow: 'visible',
//               bgcolor: '#000',
//             }}>
//               <video
//                 src={post.content.video}
//                 controls
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   maxHeight: '750px',
//                   objectFit: 'cover',
//                   display: 'block'
//                 }}
//               />
//             </Box>
//           )}

//           {/* Actions and Content */}
//           <CardContent sx={{ p: 0 }}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ px: 2, pt: 1, pb: 0.5 }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <IconButton
//                   onClick={() => toggleLike(post.id)}
//                   size="small"
//                   sx={{
//                     p: 0.5,
//                     color: likedPosts[post.id] ? '#ed4956' : '#262626',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {likedPosts[post.id] ? (
//                     <Favorite sx={{ fontSize: iconSize }} />
//                   ) : (
//                     <FavoriteBorder sx={{ fontSize: iconSize }} />
//                   )}
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <ChatBubbleOutline sx={{ fontSize: iconSize }} />
//                 </IconButton>
//                 <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                   <Send sx={{ fontSize: iconSize }} />
//                 </IconButton>
//               </Stack>
//               <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
//                 <BookmarkBorder sx={{ fontSize: iconSize }} />
//               </IconButton>
//             </Stack>

//             {/* Likes Count */}
//             <Typography
//               variant="subtitle2"
//               fontWeight="600"
//               color="#262626"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
//             >
//               {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
//             </Typography>

//             {/* Caption */}
//             <Typography
//               variant="body2"
//               sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
//             >
//               <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             {/* View Comments */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
//                 '&:hover': { textDecoration: 'underline' }
//               }}
//             >
//               View all comments
//             </Typography>

//             {/* Timestamp */}
//             <Typography
//               variant="caption"
//               sx={{
//                 px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase'
//               }}
//             >
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Loading indicator */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
//         {loading && (
//           <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Post;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Avatar, Box, Card, CardContent, IconButton,
  Typography, Stack, CircularProgress, useMediaQuery, useTheme
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
  BookmarkBorder, Send
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

const POSTS_PER_CHUNK = 10;

const Post = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const avatarSize = isMobile ? 40 : 34;
  const iconSize = isMobile ? 28 : 24;
  const usernameFontSize = isMobile ? '16px' : '15px';

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/posts`);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllPosts(sorted);
      setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
      const initialLikes = {};
      sorted.forEach(post => {
        initialLikes[post.id] = post.likes;
      });
      setLikesCount(initialLikes);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          visiblePosts.length < allPosts.length
        ) {
          setLoading(true);
          const nextChunk = allPosts.slice(
            visiblePosts.length,
            visiblePosts.length + POSTS_PER_CHUNK
          );
          setTimeout(() => {
            setVisiblePosts((prev) => [...prev, ...nextChunk]);
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [visiblePosts, allPosts, loading]);

  const toggleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/posts/${postId}/like`);
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
      setLikesCount((prev) => ({
        ...prev,
        [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const getPostWidth = () => {
    if (isMobile) return '100vw'; // ✅ FIXED: Use viewport width for mobile
    if (isTablet) return '470px';
    return '470px'; // Instagram desktop post width
  };

  return (
    <Box sx={{
      width: '100%',
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: isMobile ? '#fafafa' : 'transparent', 
      // bgcolor:'red',
      justifyContent: 'center',
      paddingLeft: {   md: '375px',sm:'85px',xs:'0',lg:'250px' },
 
      // px: isMobile ? 0 : undefined,
      paddingRight: {xs:'290px',xl:'0',md:'0',sm:'0',lg:'0'}
    }}>
      {visiblePosts.map((post) => (
        <Card
          key={post.id}
          sx={{
            width: getPostWidth(),
            maxWidth: isMobile ? '100vw' : '638px', // ✅ FIXED: Use viewport width for mobile
            marginBottom: isMobile ? '12px' : '20px',
            borderRadius: isMobile ? 0 : '8px',
            boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
            border: isMobile ? 'none' : '1px solid #dbdbdb',
            // bgcolor: 'green',
            overflow: 'visible',
            // ✅ FIXED: Remove margin on mobile for full width
            mx: isMobile ? 0 : 'auto',
           
            
          }}
        >
          {/* Header */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: isMobile ? '12px 16px' : '14px 16px',
            borderBottom: isMobile ? 'none' : '1px solid #efefef'
          }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src={post.author?.profileImage || '/default-avatar.png'}
                alt={post.author?.username || 'Unknown user'}
                sx={{
                  width: avatarSize,
                  height: avatarSize,
                  border: '1px solid #dbdbdb'
                }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  fontSize={usernameFontSize}
                  color="#262626"
                  sx={{ display: 'flex', alignItems: 'center', lineHeight: 1.2 }}
                >
                  {post.author?.username || 'unknown'}
                  {post.author?.isVerified && (
                    <BlueTick style={{ width: 13, height: 13, marginLeft: 4 }} />
                  )}
                </Typography>
              </Box>
            </Stack>
            <IconButton aria-label="More options" size="small" sx={{ color: '#262626' }}>
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>

          {/* Media Content */}
          {post.content?.image && (
            <Box sx={{
              width: '100%',
              overflow: 'visible',
              bgcolor: '#000',
              // ✅ FIXED: Ensure no padding that might constrain image
              p: 0,
              m: 0,
            }}>
              <Box
                component="img"
                src={post.content.image}
                alt={post.caption}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  maxHeight: 'none',
                  // ✅ FIXED: Ensure no margin or padding on image
                  m: 0,
                  p: 0,
                }}
              />
            </Box>
          )}
          {post.content?.video && (
            <Box sx={{
              width: '100%',
              overflow: 'visible',
              bgcolor: '#000',
            }}>
              <video
                src={post.content.video}
                controls
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '750px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Box>
          )}

          {/* Actions and Content */}
          <CardContent sx={{ p: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 2, pt: 1, pb: 0.5 }}
            >
              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={() => toggleLike(post.id)}
                  size="small"
                  sx={{
                    p: 0.5,
                    color: likedPosts[post.id] ? '#ed4956' : '#262626',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', transform: 'scale(1.1)' },
                    transition: 'all 0.2s'
                  }}
                >
                  {likedPosts[post.id] ? (
                    <Favorite sx={{ fontSize: iconSize }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: iconSize }} />
                  )}
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
                  <ChatBubbleOutline sx={{ fontSize: iconSize }} />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
                  <Send sx={{ fontSize: iconSize }} />
                </IconButton>
              </Stack>
              <IconButton size="small" sx={{ p: 0.5, color: '#262626' }}>
                <BookmarkBorder sx={{ fontSize: iconSize }} />
              </IconButton>
            </Stack>

            {/* Likes Count */}
            <Typography
              variant="subtitle2"
              fontWeight="600"
              color="#262626"
              sx={{ px: 2, pb: 0.5, fontSize: '14px' }}
            >
              {likesCount[post.id]?.toLocaleString() || post.likes.toLocaleString()} likes
            </Typography>

            {/* Caption */}
            <Typography
              variant="body2"
              sx={{ px: 2, pb: 0.5, fontSize: '14px', lineHeight: 1.4, color: '#262626' }}
            >
              <Typography component="span" fontWeight="600" color="#262626" sx={{ mr: 1 }}>
                {post.author?.username || 'unknown'}
              </Typography>
              {post.caption}
            </Typography>

            {/* View Comments */}
            <Typography
              variant="caption"
              sx={{
                px: 2, pb: 0.5, color: '#8e8e8e', cursor: 'pointer', fontSize: '14px',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              View all comments
            </Typography>

            {/* Timestamp */}
            <Typography
              variant="caption"
              sx={{
                px: 2, pb: isMobile ? 1.5 : 2, color: '#8e8e8e', fontSize: '12px', textTransform: 'uppercase'
              }}
            >
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Loading indicator */}
      <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
        {loading && (
          <CircularProgress size={24} sx={{ color: '#8e8e8e' }} />
        )}
      </Box>
    </Box>
  );
};

export default Post;  