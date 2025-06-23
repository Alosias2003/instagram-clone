import React, { useEffect, useRef, useState } from 'react';
import mediaData from '../Assets/media.json';

const StoryViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const videoRef = useRef(null);

  const currentMedia = mediaData[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaData.length);
  };

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (currentMedia.type === 'image') {
      // Automatically go to next image after 5 seconds
      timeoutRef.current = setTimeout(goToNext, 5000);
    } else if (currentMedia.type === 'video') {
      // Wait for video to end
      const video = videoRef.current;
      if (video) {
        video.onended = goToNext;
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div style={styles.container}>
      {currentMedia.type === 'image' ? (
        <img src={currentMedia.url} alt="story" style={styles.media} />
      ) : (
        <video ref={videoRef} style={styles.media} controls autoPlay muted>
          <source src={currentMedia.url} type="video/mp4" />
          Your browser does not support video.
        </video>
      )}

      {/* Optional manual navigation */}
      <button style={styles.prevButton} onClick={() => setCurrentIndex((prev) => (prev - 1 + mediaData.length) % mediaData.length)}>⟵</button>
      <button style={styles.nextButton} onClick={goToNext}>⟶</button>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '800px',
    height: '500px',
    margin: '20px auto',
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: '10px'
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    color: '#fff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    color: '#fff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
  }
};

export default StoryViewer;
