



import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  Favorite, FavoriteBorder, Comment,
  VolumeOff, VolumeUp, Send, BookmarkBorder
} from '@mui/icons-material';

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <Box
      sx={{
        height: { xs: '500px', sm: '600px', md: '650px' },
        width: '100%',
        position: 'relative',
        backgroundColor: 'black',
        overflow: 'hidden',
        mb: 1,
      }}
    >
      <video
        ref={videoRef}
        src={reel.src}
        autoPlay
        muted
        loop
        playsInline
        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />

      {/* Mute/Unmute */}
      <IconButton
        onClick={toggleMute}
        sx={{
          position: 'absolute', top: 20, right: 20,
          backgroundColor: 'rgba(0,0,0,0.4)', color: 'white',
        }}
      >
        {muted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>

      {/* Bottom Left Info */}
      <Box sx={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
        <Typography variant="subtitle2">@{reel.username}</Typography>
        <Typography variant="body2" mt={0.5}>{reel.caption}</Typography>
        <Typography variant="caption" mt={0.5}>🎵 {reel.audio || "Original audio"}</Typography>
      </Box>

      {/* Right Side Buttons */}
      <Box
        sx={{
          position: 'absolute', right: 20, bottom: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: 'white',
        }}
      >
        <IconButton onClick={handleLike} sx={{ color: liked ? 'red' : 'white' }}>
          {liked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="caption">{likes}</Typography>

        <IconButton sx={{ color: 'white' }}><Comment /></IconButton>
        <IconButton sx={{ color: 'white' }}><Send /></IconButton>
        <IconButton sx={{ color: 'white' }}><BookmarkBorder /></IconButton>
      </Box>
    </Box>
  );
};

export default ReelCard;
