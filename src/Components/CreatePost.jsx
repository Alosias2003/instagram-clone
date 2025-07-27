

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const CLOUD_NAME = 'dpggrwvvt';
const UPLOAD_PRESET = 'n5tt5ixs';

const CreatePost = ({ open, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

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
    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100MB.');
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
          username: user?.username || user?.name || 'Anonymous',
          profileImage: user?.profileImage || '/default-avatar.png',
          isVerified: user?.isVerified || false,
        },
      };

      const response = await axios.post('http://localhost:5000/posts', newPost);

      // ✅ Update posts in localStorage
      const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = [...existingPosts, response.data];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      toast.success('Post uploaded successfully!');

      setCaption('');
      setMedia(null);
      setPreview(null);
      setError('');
      onClose();

      if (onPostCreated) onPostCreated(response.data);

      navigate('/profile');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Failed to upload.');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCaption('');
    setMedia(null);
    setPreview(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
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
        <Button onClick={handleCancel} color="inherit">Cancel</Button>
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
