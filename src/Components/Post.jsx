

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Avatar, Box, Card, CardContent, IconButton,
  Typography, Stack, CircularProgress, useMediaQuery, useTheme, TextField, Button
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ChatBubbleOutline, MoreHoriz,
  BookmarkBorder, Send, EmojiEmotions
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ReactComponent as BlueTick } from '../Assets/icons8-instagram-verification-badge.svg';

const POSTS_PER_CHUNK = 10;

const Post = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const avatarSize = isMobile ? 32 : 32;
  const iconSize = isMobile ? 24 : 24;
  const usernameFontSize = isMobile ? '14px' : '14px';

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/posts`);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Update posts with current user's profile photo
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const updatedPosts = sorted.map(post => {
        if (post.author?.username === loggedInUser?.username) {
          return {
            ...post,
            author: {
              ...post.author,
              profileImage: loggedInUser.profilePic || post.author?.profileImage,
              profilePic: loggedInUser.profilePic || post.author?.profilePic
            }
          };
        }
        return post;
      });
      
      setAllPosts(updatedPosts);
      setVisiblePosts(updatedPosts.slice(0, POSTS_PER_CHUNK));
      
      const initialLikes = {};
      const initialComments = {};
      updatedPosts.forEach(post => {
        initialLikes[post.id] = post.likes;
        initialComments[post.id] = post.comments || [];
      });
      setLikesCount(initialLikes);
      setComments(initialComments);
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

  const handleAddComment = (postId) => {
    const comment = newComment[postId];
    if (comment && comment.trim()) {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const newCommentObj = {
        id: Date.now(),
        username: loggedInUser?.username || 'anonymous',
        text: comment.trim(),
        timestamp: new Date().toISOString()
      };
      
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newCommentObj]
      }));
      
      setNewComment(prev => ({
        ...prev,
        [postId]: ''
      }));
    }
  };

  const renderCaption = (post) => {
    if (!post.caption) return null;
    
    const words = post.caption.split(' ');
    const shouldTruncate = words.length > 15;
    const displayText = shouldTruncate ? words.slice(0, 15).join(' ') + '...' : post.caption;
    
    return (
      <Typography
        variant="body2"
        sx={{ 
          px: 2, 
          pb: 0.5, 
          fontSize: '14px', 
          lineHeight: 1.4, 
          color: '#262626',
          wordBreak: 'break-word'
        }}
      >
        <Typography 
          component="span" 
          fontWeight="600" 
          color="#262626" 
          sx={{ mr: 0.5 }}
        >
          {post.author?.username || 'unknown'}
        </Typography>
        {displayText}
        {shouldTruncate && (
          <Typography 
            component="span" 
            sx={{ color: '#8e8e8e', cursor: 'pointer', ml: 0.5 }}
          >
            more
          </Typography>
        )}
      </Typography>
    );
  };

  return (
    <Box sx={{
      width: '100%',
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: isMobile ? '#fafafa' : 'transparent',
      justifyContent: 'center',
      paddingLeft: { md: '375px', sm: '85px', xs: '0', lg: '250px' },
      paddingRight: { xs: '300px', xl: '0', md: '0', sm: '0', lg: '0' }
    }}>
      {visiblePosts.map((post) => (
        <Card
          key={post.id}
          sx={{
            width: isMobile ? '100vw' : '470px',
            maxWidth: isMobile ? '100vw' : '470px',
            marginBottom: isMobile ? '12px' : '20px',
            marginLeft: isMobile ? '0' : 'auto',
            marginRight: isMobile ? '0' : 'auto',
            borderRadius: isMobile ? 0 : '8px',
            boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
            border: isMobile ? 'none' : '1px solid #dbdbdb',
            overflow: 'visible',
            bgcolor: '#fff',
            position: 'relative'
          }}
        >
          {/* Header */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: isMobile ? '8px 16px' : '12px 16px',
            borderBottom: 'none'
          }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Avatar
                src={post.author?.profileImage || post.author?.profilePic || '/default-avatar.png'}
                alt={post.author?.username || 'Unknown user'}
                sx={{
                  width: avatarSize,
                  height: avatarSize,
                  border: '1px solid #dbdbdb',
                  cursor: 'pointer'
                }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  fontSize={usernameFontSize}
                  color="#262626"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    lineHeight: 1.2,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {post.author?.username || 'unknown'}
                  {post.author?.isVerified && (
                    <BlueTick style={{ width: 12, height: 12, marginLeft: 4 }} />
                  )}
                </Typography>
              </Box>
            </Stack>
            <IconButton 
              aria-label="More options" 
              size="small" 
              sx={{ 
                color: '#262626',
                p: 0.5,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }
              }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>

          {/* Media Content */}
          {post.content?.image && (
            <Box sx={{
              width: '100%',
              overflow: 'hidden',
              bgcolor: '#000',
              position: 'relative'
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
                  maxHeight: '600px',
                  minHeight: '200px'
                }}
              />
            </Box>
          )}
          
          {post.content?.video && (
            <Box sx={{
              width: '100%',
              overflow: 'hidden',
              bgcolor: '#000',
              position: 'relative'
            }}>
              <video
                src={post.content.video}
                controls
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </Box>
          )}

          {/* Actions and Content */}
          <CardContent sx={{ p: 0 }}>
            {/* Action Buttons */}
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
                    '&:hover': { 
                      bgcolor: 'rgba(0,0,0,0.04)', 
                      transform: 'scale(1.1)' 
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {likedPosts[post.id] ? (
                    <Favorite sx={{ fontSize: iconSize }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: iconSize }} />
                  )}
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ 
                    p: 0.5, 
                    color: '#262626',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                  }}
                >
                  <ChatBubbleOutline sx={{ fontSize: iconSize }} />
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ 
                    p: 0.5, 
                    color: '#262626',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                  }}
                >
                  <Send sx={{ fontSize: iconSize }} />
                </IconButton>
              </Stack>
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.5, 
                  color: '#262626',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <BookmarkBorder sx={{ fontSize: iconSize }} />
              </IconButton>
            </Stack>

            {/* Likes Count */}
            <Typography
              variant="subtitle2"
              fontWeight="600"
              color="#262626"
              sx={{ 
                px: 2, 
                pb: 0.5, 
                fontSize: '14px',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {likesCount[post.id] === 1 ? '1 like' : `${likesCount[post.id]?.toLocaleString() || 0} likes`}
            </Typography>

            {/* Caption */}
            {renderCaption(post)}

            {/* View Comments */}
            {comments[post.id]?.length > 0 && (
              <Typography
                variant="caption"
                sx={{
                  px: 2, 
                  pb: 0.5, 
                  color: '#8e8e8e', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  display: 'block',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                View all {comments[post.id].length} comments
              </Typography>
            )}

            {/* Recent Comments */}
            {comments[post.id]?.slice(-2).map((comment) => (
              <Typography
                key={comment.id}
                variant="body2"
                sx={{ 
                  px: 2, 
                  pb: 0.3, 
                  fontSize: '14px', 
                  lineHeight: 1.4, 
                  color: '#262626',
                  wordBreak: 'break-word'
                }}
              >
                <Typography 
                  component="span" 
                  fontWeight="600" 
                  color="#262626" 
                  sx={{ 
                    mr: 0.5,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {comment.username}
                </Typography>
                {comment.text}
              </Typography>
            ))}

            {/* Timestamp */}
            <Typography
              variant="caption"
              sx={{
                px: 2, 
                pb: 1, 
                color: '#8e8e8e', 
                fontSize: '12px', 
                textTransform: 'uppercase',
                letterSpacing: '0.2px',
                display: 'block'
              }}
            >
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>

            {/* Add Comment Section */}
            <Box sx={{ 
              borderTop: '1px solid #efefef', 
              px: 2, 
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.5, 
                  color: '#262626',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <EmojiEmotions sx={{ fontSize: 20 }} />
              </IconButton>
              
              <TextField
                placeholder="Add a comment..."
                variant="standard"
                fullWidth
                value={newComment[post.id] || ''}
                onChange={(e) => setNewComment(prev => ({
                  ...prev,
                  [post.id]: e.target.value
                }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddComment(post.id);
                  }
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '14px',
                    '& input': {
                      p: 0,
                      '&::placeholder': {
                        color: '#8e8e8e',
                        opacity: 1
                      }
                    }
                  }
                }}
              />
              
              {newComment[post.id]?.trim() && (
                <Button
                  onClick={() => handleAddComment(post.id)}
                  size="small"
                  sx={{
                    minWidth: 'auto',
                    p: 0,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0095f6',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Post
                </Button>
              )}
            </Box>
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