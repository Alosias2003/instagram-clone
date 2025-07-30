

import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Avatar, Divider, Grid,
  Tabs, Tab, Modal, IconButton, useTheme, useMediaQuery
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import GridOnIcon from '@mui/icons-material/GridOn';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (loggedInUser) {
      setUser(loggedInUser);
      const posts = allPosts.filter(post => post.author?.username === loggedInUser.username);
      setUserPosts(posts);
      const userReels = posts.filter(post => post.content?.video);
      setReels(userReels);
      const tagged = allPosts.filter(post => post.tags?.includes(loggedInUser.username));
      setTaggedPosts(tagged);
    }
  }, [location]);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const toggleLike = (postId) => setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  const handleOpenModal = (index, data) => {
    setCurrentIndex(index);
    setCurrentData(data);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? currentData.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === currentData.length - 1 ? 0 : prev + 1));

  const renderGrid = (data) => (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: isMobile ? '2px' : '4px',
      mt: 2
    }}>
      {data.map((post, index) => (
        <Box
          key={post.id || index}
          onClick={() => handleOpenModal(index, data)}
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            cursor: 'pointer',
            overflow: 'hidden',
            bgcolor: '#f5f5f5',
            '&:hover .overlay': { 
              opacity: isMobile ? 0 : 1 
            },
            '&:hover .media': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease'
            }
          }}
        >
          {/* Media Content */}
          {post.content?.image && (
            <Box
              className="media"
              component="img"
              src={post.content.image}
              alt={post.caption}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease'
              }}
            />
          )}
          {post.content?.video && (
            <Box
              className="media"
              component="video"
              src={post.content.video}
              muted
              loop
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease'
              }}
            />
          )}

          {/* Multiple Media Indicator */}
          {post.content?.images?.length > 1 && (
            <CollectionsIcon
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#fff',
                fontSize: 20,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
              }}
            />
          )}

          {/* Video Indicator */}
          {post.content?.video && (
            <VideocamIcon
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#fff',
                fontSize: 20,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
              }}
            />
          )}

          {/* Hover Overlay with Stats */}
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.3)',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              opacity: 0,
              transition: 'opacity 0.2s ease',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FavoriteBorderIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {post.likes || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {post.comments?.length || 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );

  if (!user) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', px: 2 }}>
      <Typography variant="h6" textAlign="center">
        User not found. Please log in again.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      maxWidth: { xs: '100%', sm: '600px', md: '535px',lg:'900px' }, 
      mx: 'auto', 
      // mt: { xs: 2, sm: 4 }, 
      // px: { xs: 0, sm: 2 }, 
       pb: 10 
    }}>
      {/* Header */}
      <Box sx={{ px: { xs: 2, sm: 0 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <Avatar
                src={user.profilePic || ""}
                sx={{
                  width: { xs: 77, sm: 150 }, 
                  height: { xs: 77, sm: 150 },
                  fontSize: { xs: 24, sm: 48 }, 
                  border: '2px solid', 
                  borderColor: 'divider'
                }}
              >
                {(!user.profilePic && user.username?.[0]?.toUpperCase()) || ""}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box textAlign={{ xs: 'center', sm: 'left' }}>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="h5" sx={{ fontWeight: 300, fontSize: { xs: '20px', sm: '28px' } }}>
                  {user.username}
                </Typography>
                <Button 
                  component={Link} 
                  to="/editprofile" 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    px: 2
                  }}
                >
                  Edit profile
                </Button>
              </Box>
              
              <Box display="flex" gap={{ xs: 3, sm: 4 }} mt={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="body1">
                  <strong>{userPosts.length}</strong> posts
                </Typography>
                <Typography variant="body1">
                  <strong>80</strong> followers
                </Typography>
                <Typography variant="body1">
                  <strong>100</strong> following
                </Typography>
              </Box>
              
              <Box mt={2}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {user.fullname || user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.bio || "Welcome to my profile!"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Highlights Section (placeholder) */}
      <Box sx={{ px: { xs: 2, sm: 0 }, mt: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {/* Add highlights here if needed */}
        </Box>
      </Box>

      <Divider sx={{ mx: { xs: 0, sm: 0 } }} />

      {/* Tabs */}
      <Tabs 
        value={tab} 
        onChange={handleTabChange} 
        centered
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#262626'
          },
          '& .MuiTab-root': {
            minHeight: '53px',
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#8e8e8e',
            '&.Mui-selected': {
              color: '#262626'
            }
          }
        }}
      >
        <Tab 
          icon={<GridOnIcon sx={{ fontSize: 12 }} />} 
          label="Posts" 
          iconPosition="start"
          sx={{ gap: 1 }}
        />
        <Tab 
          icon={<PlayCircleFilledIcon sx={{ fontSize: 12 }} />} 
          label="Reels" 
          iconPosition="start"
          sx={{ gap: 1 }}
        />
        <Tab 
          icon={<PersonPinIcon sx={{ fontSize: 12 }} />} 
          label="Tagged" 
          iconPosition="start"
          sx={{ gap: 1 }}
        />
      </Tabs>

      <Divider sx={{ mb: 0 }} />

      {/* Content */}
      <Box sx={{ px: { xs: 0, sm: 0 } }}>
        {tab === 0 && (
          userPosts.length > 0 ? (
            renderGrid(userPosts)
          ) : (
            <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
              <Box sx={{ 
                width: 60,
                height: 60,
                border: '2px solid #262626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <GridOnIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>
                Share Photos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When you share photos, they will appear on your profile.
              </Typography>
            </Box>
          )
        )}
        
        {tab === 1 && (
          reels.length > 0 ? (
            renderGrid(reels)
          ) : (
            <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
              <Box sx={{ 
                width: 60,
                height: 60,
                border: '2px solid #262626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <PlayCircleFilledIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>
                Share Reels
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When you share reels, they will appear on your profile.
              </Typography>
            </Box>
          )
        )}
        
        {tab === 2 && (
          taggedPosts.length > 0 ? (
            renderGrid(taggedPosts)
          ) : (
            <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
              <Box sx={{ 
                width: 60,
                height: 60,
                border: '2px solid #262626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <PersonPinIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>
                Photos of you
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When people tag you in photos, they'll appear here.
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* Modal View */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          bgcolor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          zIndex: 1300
        }}>
          {/* Navigation Arrows */}
          {currentData.length > 1 && (
            <>
              <IconButton 
                onClick={handlePrev} 
                sx={{ 
                  position: 'absolute', 
                  left: { xs: 5, sm: 20 }, 
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  zIndex: 1301
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton 
                onClick={handleNext} 
                sx={{ 
                  position: 'absolute', 
                  right: { xs: 5, sm: 20 }, 
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  zIndex: 1301
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          {/* Close Button */}
          <IconButton 
            onClick={handleCloseModal} 
            sx={{ 
              position: 'absolute', 
              top: { xs: 10, sm: 20 }, 
              right: { xs: 10, sm: 20 }, 
              color: '#fff',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              zIndex: 1301
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Post Content */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: { xs: '95%', sm: '80%', md: '70%' }, 
            maxHeight: '90vh', 
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {currentData.length > 0 && (
              <SinglePost
                post={currentData[currentIndex]}
                isLiked={likedPosts[currentData[currentIndex]?.id] || false}
                toggleLike={toggleLike}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;