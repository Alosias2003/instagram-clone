// // CreatePost.jsx (Pop-up Version)
// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const CreatePost = ({ open, onClose }) => {
//   const [caption, setCaption] = useState('');
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//     if (!validTypes.includes(file.type)) {
//       setError('Please upload a JPEG/PNG image or MP4 video.');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB.');
//       return;
//     }

//     setError('');
//     setMedia(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handlePost = async () => {
//     if (!media) {
//       setError('Please upload an image or video.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('media', media);
//       formData.append('caption', caption);

//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log('Post Submitted:', { caption, media });

//       setCaption('');
//       setMedia(null);
//       setPreview(null);
//       onClose(); // Close dialog on success
//     } catch (err) {
//       setError('Failed to post. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       sx={{
//         '& .MuiPaper-root': {
//           borderRadius: 2,
//           backgroundColor: '#fff',
//         },
//       }}
//     >
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Create New Post
//       </DialogTitle>
//       <DialogContent>
//         {error && (
//           <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <Button
//           variant="outlined"
//           component="label"
//           startIcon={<CloudUploadIcon />}
//           fullWidth
//           sx={{ mb: 2, borderColor: '#dbdbdb', color: '#262626' }}
//         >
//           Upload Image/Video
//           <input
//             hidden
//             accept="image/jpeg,image/png,video/mp4"
//             type="file"
//             onChange={handleMediaChange}
//           />
//         </Button>

//         {preview && (
//           <Box sx={{ mb: 2, textAlign: 'center' }}>
//             {media?.type.startsWith('video') ? (
//               <video src={preview} controls style={{ maxWidth: '100%' }} />
//             ) : (
//               <img
//                 src={preview}
//                 alt={caption || 'Image preview'}
//                 style={{ maxWidth: '100%' }}
//               />
//             )}
//           </Box>
//         )}

//         <TextField
//           label="Write a caption..."
//           fullWidth
//           multiline
//           minRows={2}
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
//         <Button onClick={onClose} color="inherit">
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handlePost}
//           disabled={loading}
//           sx={{ backgroundColor: '#0095f6' }}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Post'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreatePost;



// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const CreatePost = ({ open, onClose }) => {
//   const [caption, setCaption] = useState('');
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//     if (!validTypes.includes(file.type)) {
//       setError('Please upload a JPEG, PNG image, or MP4 video.');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB.');
//       return;
//     }

//     setError('');
//     setMedia(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handlePost = async () => {
//     if (!media) {
//       setError('Please upload an image or video.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('media', media);
//       formData.append('caption', caption);

//       // Simulate upload with a potential mock failure
//       await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           const randomFail = Math.random() > 0.8; // 20% chance of failure
//           randomFail ? reject(new Error('Upload failed')) : resolve();
//         }, 1000);
//       });
//       console.log('Post Submitted:', { caption, media });

//       setCaption('');
//       setMedia(null);
//       setPreview(null);
//       onClose(); // Close dialog on success
//     } catch (err) {
//       setError(`Failed to post. Please try again. (${err.message})`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       aria-labelledby="create-post-title"
//       sx={{
//         '& .MuiPaper-root': {
//           borderRadius: 2,
//           backgroundColor: '#fff',
//         },
//       }}
//     >
//       <DialogTitle id="create-post-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Create New Post
//       </DialogTitle>
//       <DialogContent>
//         {error && (
//           <Typography color="error" variant="body2" sx={{ mb: 2 }} role="alert">
//             {error}
//           </Typography>
//         )}

//         <Button
//           variant="outlined"
//           component="label"
//           startIcon={<CloudUploadIcon />}
//           fullWidth
//           sx={{ mb: 2, borderColor: '#dbdbdb', color: '#262626' }}
//           aria-label="Upload image or video"
//         >
//           Upload Image/Video
//           <input
//             hidden
//             accept="image/jpeg,image/png,video/mp4"
//             type="file"
//             onChange={handleMediaChange}
//             aria-describedby={error ? 'upload-error' : undefined}
//           />
//         </Button>

//         {preview && (
//           <Box sx={{ mb: 2, textAlign: 'center' }}>
//             {media?.type.startsWith('video') ? (
//               <video src={preview} controls style={{ maxWidth: '100%' }} aria-label="Video preview" />
//             ) : (
//               <img
//                 src={preview}
//                 alt={caption || 'Image preview'}
//                 style={{ maxWidth: '100%' }}
//               />
//             )}
//           </Box>
//         )}

//         <TextField
//           label="Write a caption..."
//           fullWidth
//           multiline
//           minRows={2}
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           sx={{ mb: 2 }}
//           aria-label="Post caption"
//         />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
//         <Button onClick={onClose} color="inherit" aria-label="Cancel post creation">
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handlePost}
//           disabled={loading}
//           sx={{ backgroundColor: '#0095f6' }}
//           aria-label="Submit post"
//         >
//           {loading ? <CircularProgress size={24} /> : 'Post'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreatePost;


// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import axios from 'axios';

// const CreatePost = ({ open, onClose }) => {
//   const [caption, setCaption] = useState('');
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//     if (!validTypes.includes(file.type)) {
//       setError('Please upload a JPEG, PNG image, or MP4 video.');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB.');
//       return;
//     }

//     setError('');
//     setMedia(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handlePost = async () => {
//     if (!media) {
//       setError('Please upload an image or video.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const isVideo = media.type.startsWith('video');
//       const mediaURL = URL.createObjectURL(media);

//       const newPost = {
//         caption,
//         content: isVideo ? { video: mediaURL } : { image: mediaURL },
//         likes: 0,
//         comments: [],
//         createdAt: new Date().toISOString(),
//         author: {
//           username: 'your_username', // Replace dynamically if needed
//           profileImage: '/default-avatar.png',
//           isVerified: false,
//         },
//       };

//       await axios.post('http://localhost:5000/posts', newPost);

//       // Reset form and close dialog
//       setCaption('');
//       setMedia(null);
//       setPreview(null);
//       onClose();
//     } catch (err) {
//       setError(`Failed to post. Please try again. (${err.message})`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       aria-labelledby="create-post-title"
//       sx={{
//         '& .MuiPaper-root': {
//           borderRadius: 2,
//           backgroundColor: '#fff',
//         },
//       }}
//     >
//       <DialogTitle id="create-post-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Create New Post
//       </DialogTitle>
//       <DialogContent>
//         {error && (
//           <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <Button
//           variant="outlined"
//           component="label"
//           startIcon={<CloudUploadIcon />}
//           fullWidth
//           sx={{ mb: 2, borderColor: '#dbdbdb', color: '#262626' }}
//         >
//           Upload Image/Video
//           <input
//             hidden
//             accept="image/jpeg,image/png,video/mp4"
//             type="file"
//             onChange={handleMediaChange}
//           />
//         </Button>

//         {preview && (
//           <Box sx={{ mb: 2, textAlign: 'center' }}>
//             {media?.type.startsWith('video') ? (
//               <video src={preview} controls style={{ maxWidth: '100%' }} />
//             ) : (
//               <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
//             )}
//           </Box>
//         )}

//         <TextField
//           label="Write a caption..."
//           fullWidth
//           multiline
//           minRows={2}
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
//         <Button onClick={onClose} color="inherit">
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handlePost}
//           disabled={loading}
//           sx={{ backgroundColor: '#0095f6' }}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Post'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreatePost;


// ✅ Final CreatePost Component using Cloudinary + Toast + Realtime update

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, Box, Typography, CircularProgress
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CLOUD_NAME = ' dpggrwvvt'; // Replace with your Cloudinary cloud name
// const UPLOAD_PRESET = 'n5tt5ixs'; // Replace with your unsigned preset name

// const CreatePost = ({ open, onClose, onPostCreated }) => {
//   const [caption, setCaption] = useState('');
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//     if (!validTypes.includes(file.type)) {
//       setError('Please upload a JPEG, PNG image, or MP4 video.');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size must be less than 10MB.');
//       return;
//     }

//     setError('');
//     setMedia(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const uploadToCloudinary = async () => {
//     const formData = new FormData();
//     formData.append('file', media);
//     formData.append('upload_preset', UPLOAD_PRESET);
//     formData.append('cloud_name', CLOUD_NAME);

//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
//       formData
//     );
//     return res.data.secure_url;
//   };

//   const handlePost = async () => {
//     if (!media) {
//       setError('Please upload an image or video.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const mediaUrl = await uploadToCloudinary();
//       const isVideo = media.type.startsWith('video');

//       const newPost = {
//         caption,
//         content: isVideo ? { video: mediaUrl } : { image: mediaUrl },
//         likes: 0,
//         comments: [],
//         createdAt: new Date().toISOString(),
//         author: {
//           username: 'your_username', // Replace dynamically if needed
//           profileImage: '/default-avatar.png',
//           isVerified: false,
//         },
//       };

//       const response = await axios.post('http://localhost:5000/posts', newPost);

//       toast.success('Post uploaded successfully!');
//       setCaption('');
//       setMedia(null);
//       setPreview(null);
//       onClose();

//       // Inform parent to refresh post list
//       if (onPostCreated) onPostCreated(response.data);

//     } catch (err) {
//       console.error('Upload error:', err);
//       toast.error('Failed to upload.');
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Create New Post
//       </DialogTitle>
//       <DialogContent>
//         {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

//         <Button
//           variant="outlined"
//           component="label"
//           startIcon={<CloudUploadIcon />}
//           fullWidth
//           sx={{ mb: 2 }}
//         >
//           Upload Image/Video
//           <input
//             hidden
//             accept="image/jpeg,image/png,video/mp4"
//             type="file"
//             onChange={handleMediaChange}
//           />
//         </Button>

//         {preview && (
//           <Box sx={{ mb: 2, textAlign: 'center' }}>
//             {media?.type.startsWith('video') ? (
//               <video src={preview} controls style={{ maxWidth: '100%' }} />
//             ) : (
//               <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
//             )}
//           </Box>
//         )}

//         <TextField
//           label="Write a caption..."
//           fullWidth
//           multiline
//           minRows={2}
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
//         <Button onClick={onClose} color="inherit">
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handlePost}
//           disabled={loading}
//           sx={{ backgroundColor: '#0095f6' }}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Post'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreatePost;


import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CLOUD_NAME = 'dpggrwvvt';
const UPLOAD_PRESET = 'n5tt5ixs';

const CreatePost = ({ open, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG, PNG image, or MP4 video.');
      return;
    }
    if (file.size > 100* 1024 * 1024) {
      setError('File size must be less than 1GB.');
      return;
    }

    setError('');
    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', media);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const handlePost = async () => {
    if (!media) {
      setError('Please upload an image or video.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const mediaUrl = await uploadToCloudinary();
      const isVideo = media.type.startsWith('video');

      const newPost = {
        caption,
        content: isVideo ? { video: mediaUrl } : { image: mediaUrl },
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        author: {
          username: 'your_username',
          profileImage: '/default-avatar.png',
          isVerified: false,
        },
      };

      const response = await axios.post('http://localhost:5000/posts', newPost);
      toast.success('Post uploaded successfully!');
      setCaption('');
      setMedia(null);
      setPreview(null);
      onClose();

      if (onPostCreated) onPostCreated(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Failed to upload.');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Create New Post
      </DialogTitle>
      <DialogContent>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          Upload Image/Video
          <input
            hidden
            accept="image/jpeg,image/png,video/mp4"
            type="file"
            onChange={handleMediaChange}
          />
        </Button>

        {preview && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            {media?.type.startsWith('video') ? (
              <video src={preview} controls style={{ maxWidth: '100%' }} />
            ) : (
              <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
            )}
          </Box>
        )}

        <TextField
          label="Write a caption..."
          fullWidth
          multiline
          minRows={2}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePost}
          disabled={loading}
          sx={{ backgroundColor: '#0095f6' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
