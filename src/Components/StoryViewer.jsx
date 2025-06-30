import React, { useEffect, useRef, useState } from 'react';
import Stories from 'react-insta-stories';
import { useSwipeable } from 'react-swipeable';
import '../Style/StoryViewer.css';

const StoryViewer = ({ story, onClose, onNext, onPrev }) => {
  const storyRef = useRef(null);
  const videoRefs = useRef([]); // Store refs for all video elements
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [processedStories, setProcessedStories] = useState([]);

  // Preprocess stories: calculate duration especially for videos
  useEffect(() => {
    if (!story || !Array.isArray(story.stories)) return;

    const loadStories = async () => {
      const promises = story.stories.map((s, idx) => {
        return new Promise((resolve) => {
          if (s.type === 'video') {
            const video = document.createElement('video');
            video.src = s.url;
            video.preload = 'metadata';

            const fallback = setTimeout(() => resolve(makeStory(s, 10000, idx)), 3000);

            video.onloadedmetadata = () => {
              clearTimeout(fallback);
              resolve(makeStory(s, Math.min(video.duration * 1000, 50000), idx));
            };

            video.onerror = () => {
              clearTimeout(fallback);
              resolve(makeStory(s, 10000, idx));
            };
          } else {
            resolve(makeStory(s, 5000, idx));
          }
        });
      });

      const results = await Promise.all(promises);
      setProcessedStories(results.filter(Boolean));
      setCurrentStoryIndex(0);
      setIsPaused(false);
      videoRefs.current = []; // Reset video refs
    };

    loadStories();
  }, [story]);

  // Helper to create story content and duration for react-insta-stories
  const makeStory = (s, duration, idx) => ({
    content: () => (
      <div className="story-content-wrapper">
        <div className="story-header">
          <img src={story.profilePic} alt="profile" className="story-profile-pic" />
          <div className="story-header-text">
            <p className="story-username">{story.username}</p>
            <p className="story-timestamp">{story.timestamp || 'Today'}</p>
          </div>
        </div>

        {s.type === 'video' ? (
          <video
            ref={(el) => (videoRefs.current[idx] = el)} // Assign ref for each video
            src={s.url}
            autoPlay
            muted={isMuted}
            playsInline
            controls={false}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <img src={s.url} alt="story" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </div>
    ),
    duration,
  });

  // Synchronize video playback and mute state when index or states change
  useEffect(() => {
    const currentVideo = videoRefs.current[currentStoryIndex];
    if (currentVideo && story.stories[currentStoryIndex]?.type === 'video') {
      currentVideo.muted = isMuted;
      if (isPaused) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch((err) => console.error('Video play failed:', err));
      }
    }
  }, [currentStoryIndex, isPaused, isMuted]);

  // When story changes, reset pause and mute states appropriately
  const handleStoryStart = (index) => {
    setCurrentStoryIndex(index);
    localStorage.setItem('storyMediaIndex', index);
    setIsPaused(false);
  };

  // Pause/play toggle for videos
  const togglePause = () => {
    setIsPaused((prev) => {
      const newPaused = !prev;
      const currentVideo = videoRefs.current[currentStoryIndex];
      if (currentVideo && story.stories[currentStoryIndex]?.type === 'video') {
        newPaused ? currentVideo.pause() : currentVideo.play().catch((err) => console.error('Video play failed:', err));
      }
      return newPaused;
    });
  };

  // Mute/unmute toggle for videos
  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      const currentVideo = videoRefs.current[currentStoryIndex];
      if (currentVideo && story.stories[currentStoryIndex]?.type === 'video') {
        currentVideo.muted = newMuted;
      }
      return newMuted;
    });
  };

  // Go to next story or if last story, trigger onNext user callback
  const goToNextStory = () => {
    if (currentStoryIndex < processedStories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      localStorage.removeItem('storyMediaIndex');
      if (onNext) onNext();
    }
  };

  // Go to previous story or if first story, trigger onPrev user callback
  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      if (onPrev) onPrev();
    }
  };

  // Swipe handlers for mobile / mouse drag navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNextStory,
    onSwipedRight: goToPreviousStory,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!story || processedStories.length === 0) return null;

  return (
    <div className="story-viewer">
      {/* Dark backdrop that closes viewer on click */}
      <div className="story-backdrop" onClick={onClose} />

      <div className="story-viewer-content">
        {/* Previous user preview */}
        {story.prevUser && (
          <div className="story-preview left" onClick={onPrev}>
            <img src={story.prevUser.profilePic} alt="prev user" />
            <p>{story.prevUser.username}</p>
          </div>
        )}

        {/* Main story display */}
        <div className="main-story" {...swipeHandlers}>
          <Stories
            ref={storyRef}
            stories={processedStories}
            currentIndex={currentStoryIndex}
            isPaused={isPaused}
            defaultInterval={5000}
            width={350}
            height={600}
            onStoryStart={handleStoryStart}
            onAllStoriesEnd={goToNextStory}
          />

          {/* Controls: prev, pause/play, mute/unmute, next */}
          <div className="story-controls">
            <button onClick={goToPreviousStory}>⬅️</button>

            {story.stories[currentStoryIndex]?.type === 'video' && (
              <>
                <button onClick={togglePause}>{isPaused ? '▶️' : '⏸️'}</button>
                <button onClick={toggleMute}>{isMuted ? '🔇' : '🔊'}</button>
              </>
            )}

            <button onClick={goToNextStory}>➡️</button>
          </div>

          {/* Reply input */}
          <div className="reply-section">
            <input type="text" placeholder={`Reply to ${story.username || 'user'}`} />
          </div>
        </div>

        {/* Next user preview */}
        {story.nextUser && (
          <div className="story-preview right" onClick={onNext}>
            <img src={story.nextUser.profilePic} alt="next user" />
            <p>{story.nextUser.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;

