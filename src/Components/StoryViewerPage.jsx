


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StoryViewer from './StoryViewer';
import { useNavigate, useSearchParams } from 'react-router-dom';

const StoryViewerPage = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle story change within the same user
  const handleStoryChange = (newStoryIndex) => {
    setCurrentStoryIndex(newStoryIndex);
  };

  // 🔄 Fetch stories on mount and initialize from URL params
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/story');
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        
        // Get initial indices from URL parameters
        const userIndex = parseInt(searchParams.get('userIndex')) || 0;
        const storyIndex = parseInt(searchParams.get('storyIndex')) || 0;
        
        // Validate indices against actual data
        const validUserIndex = Math.min(userIndex, fetchedUsers.length - 1);
        const validStoryIndex = fetchedUsers[validUserIndex]?.stories 
          ? Math.min(storyIndex, fetchedUsers[validUserIndex].stories.length - 1)
          : 0;
        
        setCurrentIndex(validUserIndex);
        setCurrentStoryIndex(validStoryIndex);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []); // Remove searchParams dependency to avoid infinite loops

  // Update URL parameters when indices change (but not on initial load)
  useEffect(() => {
    if (!loading && users.length > 0) {
      const currentParams = {
        userIndex: currentIndex.toString(),
        storyIndex: currentStoryIndex.toString()
      };
      
      // Only update if the params are different from current URL
      const currentUserIndex = searchParams.get('userIndex');
      const currentStoryIndexParam = searchParams.get('storyIndex');
      
      if (currentUserIndex !== currentParams.userIndex || 
          currentStoryIndexParam !== currentParams.storyIndex) {
        setSearchParams(currentParams, { replace: true });
      }
    }
  }, [currentIndex, currentStoryIndex, loading, users.length]);

  // ▶️ Navigation handlers
  const handleNextUser = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentStoryIndex(0); // Start from first story of next user
    } else {
      handleClose();
    }
  };

  const handlePrevUser = () => {
    if (currentIndex > 0) {
      const prevUserIndex = currentIndex - 1;
      const prevUser = users[prevUserIndex];
      setCurrentIndex(prevUserIndex);
      // Start from the last story of the previous user
      setCurrentStoryIndex(prevUser?.stories ? prevUser.stories.length - 1 : 0);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    navigate('/home');
  };

  // 🔍 Helpers to get users
  const getPrevUser = () => (currentIndex > 0 ? users[currentIndex - 1] : null);
  const getCurrentUser = () => users[currentIndex];
  const getNextUser = () => (currentIndex < users.length - 1 ? users[currentIndex + 1] : null);

  // 📱 Swipe detection for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    };

    const handleGesture = () => {
      const deltaX = touchEndX - touchStartX;
      const minSwipeDistance = 50; // adjust as needed

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX < 0) {
          handleNextUser(); // swipe left → next user
        } else {
          handlePrevUser(); // swipe right → previous user
        }
      }
    };

    if (isMobile) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, currentIndex, users]);

  // ⏳ Loading state
  if (loading) {
    return (
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        zIndex: 9999,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  // ❌ No stories available or invalid indices
  if (!getCurrentUser() || !getCurrentUser()?.stories?.length) {
    return (
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        zIndex: 9999,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          {users.length === 0 ? 'No stories available' : 'Story not found'}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        zIndex: 9999, // ensures overlay above navbar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={handleClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white', zIndex: 10000 }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '100%' : 1200,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Previous user preview */}
        {!isMobile && getPrevUser() && (
          <Box sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
            <Box
              sx={{
                width: 80,
                height: 140,
                bgcolor: 'grey.900',
                borderRadius: 2,
                overflow: 'hidden',
                opacity: 0.5,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
              }}
              onClick={handlePrevUser}
            >
              <Box component="img" src={getPrevUser().stories[0]?.url} alt="Previous story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Box>
        )}

        {/* Current StoryViewer */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '100%' : 400,
          height: '100%',
          maxHeight: isMobile ? '100%' : 700,
          mx: 'auto',
          transition: 'all 0.3s',
          transform: isClosing ? 'scale(0.95)' : 'scale(1)',
          opacity: isClosing ? 0 : 1,
        }}>
          <StoryViewer
            story={getCurrentUser()}
            onClose={handleClose}
            onNextUser={handleNextUser}
            onPrevUser={handlePrevUser}
            initialStoryIndex={currentStoryIndex}
            onStoryChange={handleStoryChange}
          />
        </Box>

        {/* Next user preview */}
        {!isMobile && getNextUser() && (
          <Box sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
            <Box
              sx={{
                width: 80,
                height: 140,
                bgcolor: 'grey.900',
                borderRadius: 2,
                overflow: 'hidden',
                opacity: 0.5,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
              }}
              onClick={handleNextUser}
            >
              <Box component="img" src={getNextUser().stories[0]?.url} alt="Next story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default StoryViewerPage;