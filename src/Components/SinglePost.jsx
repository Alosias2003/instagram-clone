import React from 'react';
import {
  Avatar, Box, Card, CardContent, IconButton,
  Typography, Stack
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz
} from '@mui/icons-material';
import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';
import { formatDistanceToNow } from 'date-fns';

const SinglePost = ({ post, isLiked, toggleLike }) => {
  return (
    <Card
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
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton>
            <ChatBubbleOutline />
          </IconButton>
        </Stack>

        <Typography variant="body2" fontWeight="bold" gutterBottom>
          {isLiked ? post.likes + 1 : post.likes} likes
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
  );
};

export default SinglePost;
