// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
//   Typography,
//   Stack,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   ChatBubbleOutline,
//   MoreHoriz,
// } from '@mui/icons-material';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({}); // Track liked state per post

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/posts');
//         if (Array.isArray(res.data)) {
//           setPosts(res.data);
//         } else {
//           console.warn('No posts found in API response');
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPost();
//   }, []);

// //   if (!posts || posts.length === 0)
// //     return <Typography>Loading...</Typography>;

//   const toggleLike = (postId) => {
//     setLikedPosts((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   return (
//     <>
//       {posts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             maxWidth:'465px',
//             margin: '20px auto',
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               p: 2,
//             }}
//           >
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage}
//                 alt={post.author?.username}
//                 sx={{ width: 56, height: 56 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {post.author?.username}
//                   {post.author?.isVerified && (
//                     <BlueTick
//                       style={{
//                         width: '16px',
//                         height: '16px',
//                         marginLeft: '4px',
//                       }}
//                     />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton>
//               <MoreHoriz />
//             </IconButton>
//           </Box>

//           <Box
//             component="img"
//             src={post.content?.image}
//             alt="post"
//             sx={{ maxWidth:'465px', objectFit: 'contain',maxHeight:'585px' }}
//           />

//           <CardContent>
//             <Stack direction="row" spacing={1} mb={1}>
//               <IconButton onClick={() => toggleLike(post.id)}>
//                 {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton>
//                 <ChatBubbleOutline />
//               </IconButton>
//             </Stack>

//             <Typography variant="body2" fontWeight="bold" gutterBottom>
//               {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
//             </Typography>

//             <Typography variant="body2" mb={1}>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 fontWeight="bold"
//                 mr={1}
//               >
//                 {post.author?.username}
//               </Typography>
//               {post.caption}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={1}>
//               View all {post.comments?.length} comments
//             </Typography>

//             {post.comments?.slice(0, 2).map((comment) => (
//               <Typography key={comment.id} variant="body2" mb={0.5}>
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   fontWeight="bold"
//                   mr={1}
//                 >
//                   {comment.username}
//                 </Typography>
//                 {comment.text}
//               </Typography>
//             ))}

//             <Typography variant="caption" color="text.secondary">
//               {new Date(post.createdAt).toLocaleString()}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default Post;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   ChatBubbleOutline,
//   MoreHoriz,
// } from '@mui/icons-material';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts?_page=${page}&_limit=${posts.id.length}`);
//       if (Array.isArray(res.data)) {
//         setPosts((prev) => [...prev, ...res.data]);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const toggleLike = (postId) => {
//     setLikedPosts((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   return (
//     <>
    
//       {posts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             maxWidth: '465px',
//             margin: '20px auto',
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               p: 2,
//             }}
//           >
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage}
//                 alt={post.author?.username}
//                 sx={{ width: 56, height: 56 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {post.author?.username}
//                   {post.author?.isVerified && (
//                     <BlueTick
//                       style={{
//                         width: '16px',
//                         height: '16px',
//                         marginLeft: '4px',
//                       }}
//                     />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton>
//               <MoreHoriz />
//             </IconButton>
//           </Box>

//           <Box
//             component="img"
//             src={post.content?.image}
//             alt="post"
//             sx={{ maxWidth: '465px', objectFit: 'contain', maxHeight: '585px' }}
//           />

//           <CardContent>
//             <Stack direction="row" spacing={1} mb={1}>
//               <IconButton onClick={() => toggleLike(post.id)}>
//                 {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton>
//                 <ChatBubbleOutline />
//               </IconButton>
//             </Stack>

//             <Typography variant="body2" fontWeight="bold" gutterBottom>
//               {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
//             </Typography>

//             <Typography variant="body2" mb={1}>
//               <Typography component="span" variant="body2" fontWeight="bold" mr={1}>
//                 {post.author?.username}
//               </Typography>
//               {post.caption}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={1}>
//               View all {post.comments?.length} comments
//             </Typography>

//             {post.comments?.slice(0, 2).map((comment) => (
//               <Typography key={comment.id} variant="body2" mb={0.5}>
//                 <Typography component="span" variant="body2" fontWeight="bold" mr={1}>
//                   {comment.username}
//                 </Typography>
//                 {comment.text}
//               </Typography>
//             ))}

//             <Typography variant="caption" color="text.secondary">
//               {new Date(post.createdAt).toLocaleString()}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Infinite Scroll Trigger */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 3 }}>
//         {loading && <CircularProgress />}
//       </Box>
//     </>
//   );
// };

// export default Post;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   ChatBubbleOutline,
//   MoreHoriz,
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const PostSkeleton = () => (
//   <Card sx={{ maxWidth: '465px', margin: '20px auto', borderRadius: 3, boxShadow: 3 }}>
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
//       <Stack direction="row" spacing={2} alignItems="center">
//         <Avatar sx={{ width: 56, height: 56 }} />
//         <Box>
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ width: 100, height: 16, bgcolor: 'grey.300' }} />
//         </Box>
//       </Stack>
//     </Box>
//     <Box sx={{ width: '100%', height: 465, bgcolor: 'grey.300' }} />
//     <CardContent>
//       <Stack direction="row" spacing={1} mb={1}>
//         <IconButton disabled>
//           <FavoriteBorder />
//         </IconButton>
//         <IconButton disabled>
//           <ChatBubbleOutline />
//         </IconButton>
//       </Stack>
//       <Typography variant="body2" sx={{ width: 80, height: 16, bgcolor: 'grey.300', mb: 1 }} />
//       <Typography variant="body2" sx={{ width: '100%', height: 16, bgcolor: 'grey.300', mb: 1 }} />
//       <Typography variant="caption" sx={{ width: 120, height: 12, bgcolor: 'grey.300' }} />
//     </CardContent>
//   </Card>
// );

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const observerRef = useRef();

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts?_page=${page}&_limit=10`);
//       if (Array.isArray(res.data)) {
//         setPosts((prev) => [...prev, ...res.data]);
//       }
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setError('Failed to load posts. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   return (
//     <>
//       {error && (
//         <Typography color="error" variant="body" sx={{ textAlign: 'center', my: 2 }}>
//           {error}
//         </Typography>
//       )}
//       {loading && posts.length === 0 && <PostSkeleton />}
//       {posts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             maxWidth: '465px',
//             margin: '20px auto',
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               p: 2,
//             }}
//           >
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{ width: 56, height: 56 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick
//                       style={{
//                         width: '16px',
//                         height: '16px',
//                         marginLeft: '4px',
//                       }}
//                     />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options">
//               <MoreHoriz />
//             </IconButton>
//           </Box>

//           <Box
//             component="img"
//             src={post.content?.image || '/placeholder-image.png'}
//             alt={post.caption || 'Post image'}
//             sx={{ width: '100%', maxWidth: '465px', objectFit: 'cover', maxHeight: '585px' }}
//           />

//           <CardContent>
//             <Stack direction="row" spacing={1} mb={1}>
//               <IconButton
//                 onClick={() => toggleLike(post.id)}
//                 aria-label={likedPosts[post.id] ? 'Unlike post' : 'Like post'}
//               >
//                 {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton aria-label="Comment on post">
//                 <ChatBubbleOutline />
//               </IconButton>
//             </Stack>

//             <Typography variant="body2" fontWeight="bold" gutterBottom>
//               {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
//             </Typography>

//             <Typography variant="body2" mb={1}>
//               <Typography component="span" variant="body2" fontWeight="bold" mr={1}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={1}>
//               View all {post.comments?.length || 0} comments
//             </Typography>

//             {post.comments?.slice(0, 2).map((comment) => (
//               <Typography key={comment.id} variant="body2" mb={0.5}>
//                 <Typography component="span" variant="body2" fontWeight="bold" mr={1}>
//                   {comment.username || 'unknown'}
//                 </Typography>
//                 {comment.text}
//               </Typography>
//             ))}

//             <Typography variant="caption" color="text.secondary">
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) || 'Just now'}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 3 }}>
//         {loading && posts.length > 0 && <CircularProgress />}
//       </Box>
//     </>
//   );
// };

// export default Post;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   ChatBubbleOutline,
//   MoreHoriz,
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const observerRef = useRef();

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       setAllPosts(res.data);
//       setVisiblePosts(res.data.slice(0, POSTS_PER_CHUNK));
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setError('Failed to load posts. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Infinite scroll logic
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !loading &&
//           visiblePosts.length < allPosts.length
//         ) {
//           const nextChunk = allPosts.slice(
//             visiblePosts.length,
//             visiblePosts.length + POSTS_PER_CHUNK
//           );
//           setVisiblePosts((prev) => [...prev, ...nextChunk]);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   return (
//     <>
//       {error && (
//         <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>
//           {error}
//         </Typography>
//       )}
//       {loading && allPosts.length === 0 && (
//         <Typography sx={{ textAlign: 'center', my: 2 }}>
//           Loading posts...
//         </Typography>
//       )}

//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             maxWidth: '465px',
//             margin: '20px auto',
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{ width: 56, height: 56 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick
//                       style={{
//                         width: '16px',
//                         height: '16px',
//                         marginLeft: '4px',
//                       }}
//                     />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options">
//               <MoreHoriz />
//             </IconButton>
//           </Box>

//           <Box
//             component="img"
//             src={post.content?.image || '/placeholder-image.png'}
//             alt={post.caption || 'Post image'}
//             loading="lazy"
//             sx={{ width: '100%', maxWidth: '465px', objectFit: 'cover', maxHeight: '585px' }}
//           />

//           <CardContent>
//             <Stack direction="row" spacing={1} mb={1}>
//               <IconButton
//                 onClick={() => toggleLike(post.id)}
//                 aria-label={likedPosts[post.id] ? 'Unlike post' : 'Like post'}
//               >
//                 {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton aria-label="Comment on post">
//                 <ChatBubbleOutline />
//               </IconButton>
//             </Stack>

//             <Typography variant="body2" fontWeight="bold" gutterBottom>
//               {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
//             </Typography>

//             <Typography variant="body2" mb={1}>
//               <Typography component="span" fontWeight="bold" mr={1}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={1}>
//               View all {post.comments?.length || 0} comments
//             </Typography>

//             {post.comments?.slice(0, 2).map((comment) => (
//               <Typography key={comment.id} variant="body2" mb={0.5}>
//                 <Typography component="span" fontWeight="bold" mr={1}>
//                   {comment.username || 'unknown'}
//                 </Typography>
//                 {comment.text}
//               </Typography>
//             ))}

//             <Typography variant="caption" color="text.secondary">
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) || 'Just now'}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 3 }}>
//         {loading && allPosts.length > 0 && <CircularProgress />}
//         {visiblePosts.length >= allPosts.length && (
//           <Typography variant="body2" color="text.secondary">
//             You’ve reached the end.
//           </Typography>
//         )}
//       </Box>
//     </>
//   );
// };

// export default Post;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   ChatBubbleOutline,
//   MoreHoriz,
// } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';
// import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

// const POSTS_PER_CHUNK = 10;

// const Post = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState({});
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

//   // Fetch all posts once
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/posts`);
//       setAllPosts(res.data);
//       setVisiblePosts(res.data.slice(0, POSTS_PER_CHUNK));
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Infinite scroll using IntersectionObserver
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
//           }, 500); // Simulate delay
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [visiblePosts, allPosts, loading]);

//   const toggleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:5000/posts/${postId}/like`);
//       setLikedPosts((prev) => ({
//         ...prev,
//         [postId]: !prev[postId],
//       }));
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   return (
//     <>
//       {visiblePosts.map((post) => (
//         <Card
//           key={post.id}
//           sx={{
//             maxWidth: '465px',
//             margin: '20px auto',
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         >
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar
//                 src={post.author?.profileImage || '/default-avatar.png'}
//                 alt={post.author?.username || 'Unknown user'}
//                 sx={{ width: 56, height: 56 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {post.author?.username || 'unknown'}
//                   {post.author?.isVerified && (
//                     <BlueTick style={{ width: '16px', height: '16px', marginLeft: '4px' }} />
//                   )}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton aria-label="More options">
//               <MoreHoriz />
//             </IconButton>
//           </Box>

//           <Box
//             component="img"
//             src={post.content?.image || '/placeholder-image.png'}
//             alt={post.caption || 'Post image'}
//             loading="lazy"
//             sx={{ width: '100%', maxWidth: '465px', objectFit: 'cover', maxHeight: '585px' }}
//           />

//           <CardContent>
//             <Stack direction="row" spacing={1} mb={1}>
//               <IconButton
//                 onClick={() => toggleLike(post.id)}
//                 aria-label={likedPosts[post.id] ? 'Unlike post' : 'Like post'}
//               >
//                 {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton aria-label="Comment on post">
//                 <ChatBubbleOutline />
//               </IconButton>
//             </Stack>

//             <Typography variant="body2" fontWeight="bold" gutterBottom>
//               {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
//             </Typography>

//             <Typography variant="body2" mb={1}>
//               <Typography component="span" fontWeight="bold" mr={1}>
//                 {post.author?.username || 'unknown'}
//               </Typography>
//               {post.caption}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={1}>
//               View all {post.comments?.length || 0} comments
//             </Typography>

//             {post.comments?.slice(0, 2).map((comment) => (
//               <Typography key={comment.id} variant="body2" mb={0.5}>
//                 <Typography component="span" fontWeight="bold" mr={1}>
//                   {comment.username || 'unknown'}
//                 </Typography>
//                 {comment.text}
//               </Typography>
//             ))}

//             <Typography variant="caption" color="text.secondary">
//               {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) || 'Just now'}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Infinite scroll loader */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', py: 5 }}>
//         {loading && <CircularProgress />}
//       </Box>
//     </>
//   );
// };

// export default Post;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Avatar, Box, Card, CardContent, IconButton,
  Typography, Stack, CircularProgress
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

const POSTS_PER_CHUNK = 10;

const Post = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/posts`);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllPosts(sorted);
      setVisiblePosts(sorted.slice(0, POSTS_PER_CHUNK));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Infinite scroll
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
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <>
      {visiblePosts.map((post) => (
        <Card
          key={post.id}
          sx={{
            maxWidth: '465px',
            margin: '20px auto',
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={post.author?.profileImage || '/default-avatar.png'}
                alt={post.author?.username || 'Unknown user'}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.author?.username || 'unknown'}
                  {post.author?.isVerified && (
                    <BlueTick style={{ width: 16, height: 16, marginLeft: 4 }} />
                  )}
                </Typography>
              </Box>
            </Stack>
            <IconButton aria-label="More options">
              <MoreHoriz />
            </IconButton>
          </Box>

          {post.content?.image && (
            <Box
              component="img"
              src={post.content.image}
              alt={post.caption}
              loading="lazy"
              sx={{ width: '100%', objectFit: 'cover', maxHeight: '585px' }}
            />
          )}
          {post.content?.video && (
            <video src={post.content.video} controls style={{ width: '100%' }} />
          )}

          <CardContent>
            <Stack direction="row" spacing={1} mb={1}>
              <IconButton onClick={() => toggleLike(post.id)}>
                {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton>
                <ChatBubbleOutline />
              </IconButton>
            </Stack>

            <Typography variant="body2" fontWeight="bold" gutterBottom>
              {likedPosts[post.id] ? post.likes + 1 : post.likes} likes
            </Typography>

            <Typography variant="body2" mb={1}>
              <Typography component="span" fontWeight="bold" mr={1}>
                {post.author?.username || 'unknown'}
              </Typography>
              {post.caption}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Box ref={observerRef} sx={{ textAlign: 'center', py: 4 }}>
        {loading && <CircularProgress />}
      </Box>
    </>
  );
};

export default Post;
