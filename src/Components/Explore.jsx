// import React, { useEffect, useState, useRef } from 'react';
// import { Box, Modal, Typography, CircularProgress } from '@mui/material';
// import Masonry from '@mui/lab/Masonry';
// import axios from 'axios';

// const Explore = () => {
//   const [posts, setPosts] = useState([]);
//   const [modalPost, setModalPost] = useState(null);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef();

  
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5001/Explore`);
//     //   setPosts(prev => [...prev, ...res.data]);
//     const flatData = Array.isArray(res.data[0]) ? res.data[0] : res.data;
//     setPosts(prev => [...prev, ...flatData]);
//     console.log('API response:', res.data);
//     } catch (err) {
//       console.error("Failed to load posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   // Infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setPage(prev => prev + 1);
//       }
//     });
//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Open Modal
//   const handleOpen = (post) => setModalPost(post);
//   const handleClose = () => setModalPost(null);

//   return (
//     <Box sx={{ px: { xs: 1, sm: 3 } }}>
//       <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
//         {posts.map(post => (
//           <Box
//             key={post.id}
//             sx={{
//               position: 'relative',
//               cursor: 'pointer',
//               borderRadius: 2,
//               overflow: 'hidden',
//               '&:hover .overlay': { opacity: 1 },
//             }}
//             onClick={() => handleOpen(post)}
//           >
//             {post.type === 'video' ? (
//               <Box
//                 component="video"
//                 src={post.src}
//                 muted
//                 loop
//                 playsInline
//                 onMouseEnter={(e) => e.target.play()}
//                 onMouseLeave={(e) => e.target.pause()}
//                 sx={{ width: '100%', display: 'block' }}
//               />
//             ) : (
//               <Box
//                 component="img"
//                 src={post.src}
//                 alt=""
//                 sx={{ width: '100%', display: 'block' }}
//               />
//             )}

//             {/* Hover Icons */}
//             <Box
//               className="overlay"
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: 'white',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: 2,
//                 opacity: 0,
//                 transition: 'opacity 0.3s ease-in-out',
//                 fontWeight: 'bold',
//               }}
//             >
//               ❤️ {post.likes} &nbsp;&nbsp; 💬 {post.comments}
//             </Box>
//           </Box>
//         ))}
//       </Masonry>

//       {/* Infinite Scroll Loader */}
//       <Box ref={observerRef} sx={{ textAlign: 'center', mt: 3 }}>
//         {loading && <CircularProgress />}
//       </Box>

//       {/* Modal Preview */}
//       <Modal open={!!modalPost} onClose={handleClose}>
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: { xs: '95vw', sm: '70vw' },
//           bgcolor: 'background.paper',
//           p: 2,
//           borderRadius: 2,
//         }}>
//           {modalPost?.type === 'video' ? (
//             <video src={modalPost.src} controls style={{ width: '100%' }} />
//           ) : (
//             <img src={modalPost?.src} alt="" style={{ width: '100%' }} />
//           )}
//           <Typography mt={2}><strong>@{modalPost?.username}</strong></Typography>
//           <Typography variant="body2">{modalPost?.caption}</Typography>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Explore;



import React, { useEffect, useState, useRef } from 'react';
import { Box, Modal, Typography, CircularProgress } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import axios from 'axios';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/Explore`);
      const flatData = Array.isArray(res.data[0]) ? res.data[0] : res.data;
      setPosts(prev => [...prev, ...flatData]);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpen = (post) => setModalPost(post);
  const handleClose = () => setModalPost(null);

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, pt: 2, ml: { sm: '250px' } }}>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 4 }}
        spacing={1}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={1}
      >
        {posts.map(post => (
          <Box
            key={post.id}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              '&:hover .overlay': { opacity: 1 },
              '&:hover img, &:hover video': {
                filter: 'brightness(70%)',
              },
            }}
            onClick={() => handleOpen(post)}
          >
            <Box
              component={post.type === 'video' ? 'video' : 'img'}
              src={post.src}
              alt=""
              muted
              loop
              playsInline
              onMouseEnter={(e) => post.type === 'video' && e.target.play()}
              onMouseLeave={(e) => post.type === 'video' && e.target.pause()}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                display: 'block',
                transition: 'filter 0.3s ease',
              }}
            />
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
                fontWeight: 'bold',
              }}
            >
              ❤️ {post.likes} &nbsp;&nbsp; 💬 {post.comments}
            </Box>
          </Box>
        ))}
      </Masonry>

      {/* Infinite scroll trigger */}
      <Box ref={observerRef} sx={{ height: '10px' }} />
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 2 }} />}

      {/* Modal on click */}
      <Modal open={!!modalPost} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', sm: '70vw' },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
          }}
        >
          {modalPost?.type === 'video' ? (
            <video src={modalPost.src} controls style={{ width: '100%' }} />
          ) : (
            <img src={modalPost?.src} alt="" style={{ width: '100%' }} />
          )}
          <Typography mt={2}><strong>@{modalPost?.username}</strong></Typography>
          <Typography variant="body2">{modalPost?.caption}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Explore;

