

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box, IconButton, Avatar, Typography, Stack
// } from '@mui/material';
// import PauseIcon from '@mui/icons-material/Pause';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// const StoryViewer = ({ story, onClose, onNextUser, onPrevUser }) => {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   const intervalRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     setCurrentStoryIndex(0);
//     setProgress(0);
//   }, [story]);

//   useEffect(() => {
//     if (!story?.stories || isPaused) return;

//     const current = story.stories[currentStoryIndex];
//     const duration = current?.duration || 5000;
//     const startTime = Date.now();

//     const update = () => {
//       const elapsed = Date.now() - startTime;
//       const percent = Math.min((elapsed / duration) * 100, 100);
//       setProgress(percent);
//       if (percent >= 100) handleNextStory();
//     };

//     intervalRef.current = setInterval(update, 50);
//     return () => clearInterval(intervalRef.current);
//   }, [currentStoryIndex, story, isPaused]);

//   const handleNextStory = () => {
//     if (currentStoryIndex < story.stories.length - 1) {
//       setCurrentStoryIndex((prev) => prev + 1);
//       setProgress(0);
//     } else {
//       onNextUser();
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex((prev) => prev - 1);
//       setProgress(0);
//     } else {
//       onPrevUser();
//     }
//   };

//   const current = story?.stories?.[currentStoryIndex];
//   if (!current) return null;

//   return (
//     <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
//       {/* Progress */}
//       <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
//         {story.stories.map((_, i) => (
//           <Box key={i} sx={{ flex: 1, height: 3, bgcolor: 'grey.800', borderRadius: 1 }}>
//             <Box sx={{
//               height: '100%',
//               bgcolor: 'white',
//               width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? `${progress}%` : '0%',
//               transition: 'width 0.1s linear',
//             }} />
//           </Box>
//         ))}
//       </Stack>

//       {/* Header */}
//       <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 40, left: 8, zIndex: 10 }}>
//         <Avatar src={story.profilePic} />
//         <Typography variant="body2" color="white">{story.username}</Typography>
//         <Typography variant="caption" color="gray">1h</Typography>
//       </Stack>

//       {/* Controls */}
//       <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 40, right: 8, zIndex: 10 }}>
//         <IconButton
//           onClick={() => {
//             setIsPaused((prev) => {
//               if (current.type === 'video' && videoRef.current) {
//                 prev ? videoRef.current.play() : videoRef.current.pause();
//               }
//               return !prev;
//             });
//           }}
//           sx={{ color: 'white' }}
//         >
//           {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
//         </IconButton>
//         {current.type === 'video' && (
//           <IconButton onClick={() => setIsMuted((prev) => !prev)} sx={{ color: 'white' }}>
//             {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//           </IconButton>
//         )}
//       </Stack>

//       {/* Content */}
//       {current.type === 'image' ? (
//         <Box component="img" src={current.url} alt="Story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//       ) : (
//         <Box
//           component="video"
//           src={current.url}
//           autoPlay
//           muted={isMuted}
//           ref={videoRef}
//           onEnded={handleNextStory}
//           sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       )}

//       {/* Click zones for touch */}
//       <Box onClick={handlePrevStory} sx={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />
//       <Box onClick={handleNextStory} sx={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />

//       {/* Arrows for desktop */}
//       <IconButton onClick={handlePrevStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronLeftIcon />
//       </IconButton>
//       <IconButton onClick={handleNextStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronRightIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default StoryViewer;


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box, IconButton, Avatar, Typography, Stack
// } from '@mui/material';
// import PauseIcon from '@mui/icons-material/Pause';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// const StoryViewer = ({ story, onClose, onNextUser, onPrevUser, initialStoryIndex = 0 }) => {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   const intervalRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     setCurrentStoryIndex(initialStoryIndex);
//     setProgress(0);
//   }, [story, initialStoryIndex]);

//   useEffect(() => {
//     if (!story?.stories || isPaused) return;

//     const current = story.stories[currentStoryIndex];
//     const duration = current?.duration || 5000;
//     const startTime = Date.now();

//     const update = () => {
//       const elapsed = Date.now() - startTime;
//       const percent = Math.min((elapsed / duration) * 100, 100);
//       setProgress(percent);
//       if (percent >= 100) handleNextStory();
//     };

//     intervalRef.current = setInterval(update, 50);
//     return () => clearInterval(intervalRef.current);
//   }, [currentStoryIndex, story, isPaused]);

//   const handleNextStory = () => {
//     if (currentStoryIndex < story.stories.length - 1) {
//       setCurrentStoryIndex((prev) => prev + 1);
//       setProgress(0);
//     } else {
//       onNextUser();
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex((prev) => prev - 1);
//       setProgress(0);
//     } else {
//       onPrevUser();
//     }
//   };

//   const current = story?.stories?.[currentStoryIndex];
//   if (!current) return null;

//   return (
//     <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
//       {/* Progress */}
//       <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
//         {story.stories.map((_, i) => (
//           <Box key={i} sx={{ flex: 1, height: 3, bgcolor: 'grey.800', borderRadius: 1 }}>
//             <Box sx={{
//               height: '100%',
//               bgcolor: 'white',
//               width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? `${progress}%` : '0%',
//               transition: 'width 0.1s linear',
//             }} />
//           </Box>
//         ))}
//       </Stack>

//       {/* Header */}
//       <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 40, left: 8, zIndex: 10 }}>
//         <Avatar src={story.profilePic} />
//         <Typography variant="body2" color="white">{story.username}</Typography>
//         <Typography variant="caption" color="gray">1h</Typography>
//       </Stack>

//       {/* Controls */}
//       <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 40, right: 8, zIndex: 10 }}>
//         <IconButton
//           onClick={() => {
//             setIsPaused((prev) => {
//               if (current.type === 'video' && videoRef.current) {
//                 prev ? videoRef.current.play() : videoRef.current.pause();
//               }
//               return !prev;
//             });
//           }}
//           sx={{ color: 'white' }}
//         >
//           {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
//         </IconButton>
//         {current.type === 'video' && (
//           <IconButton onClick={() => setIsMuted((prev) => !prev)} sx={{ color: 'white' }}>
//             {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//           </IconButton>
//         )}
//       </Stack>

//       {/* Content */}
//       {current.type === 'image' ? (
//         <Box component="img" src={current.url} alt="Story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//       ) : (
//         <Box
//           component="video"
//           src={current.url}
//           autoPlay
//           muted={isMuted}
//           ref={videoRef}
//           onEnded={handleNextStory}
//           sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       )}

//       {/* Click zones for touch */}
//       <Box onClick={handlePrevStory} sx={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />
//       <Box onClick={handleNextStory} sx={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />

//       {/* Arrows for desktop */}
//       <IconButton onClick={handlePrevStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronLeftIcon />
//       </IconButton>
//       <IconButton onClick={handleNextStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronRightIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default StoryViewer;



// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box, IconButton, Avatar, Typography, Stack
// } from '@mui/material';
// import PauseIcon from '@mui/icons-material/Pause';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// const StoryViewer = ({ story, onClose, onNextUser, onPrevUser, initialStoryIndex = 0, onStoryChange }) => {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   const intervalRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     setCurrentStoryIndex(initialStoryIndex);
//     setProgress(0);
//   }, [story, initialStoryIndex]);

//   useEffect(() => {
//     if (!story?.stories || isPaused) return;

//     const current = story.stories[currentStoryIndex];
//     const duration = current?.duration || 5000;
//     const startTime = Date.now();

//     const update = () => {
//       const elapsed = Date.now() - startTime;
//       const percent = Math.min((elapsed / duration) * 100, 100);
//       setProgress(percent);
//       if (percent >= 100) handleNextStory();
//     };

//     intervalRef.current = setInterval(update, 50);
//     return () => clearInterval(intervalRef.current);
//   }, [currentStoryIndex, story, isPaused]);

//   const handleNextStory = () => {
//     if (currentStoryIndex < story.stories.length - 1) {
//       const newIndex = currentStoryIndex + 1;
//       setCurrentStoryIndex(newIndex);
//       setProgress(0);
//       onStoryChange?.(newIndex);
//     } else {
//       onNextUser();
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       const newIndex = currentStoryIndex - 1;
//       setCurrentStoryIndex(newIndex);
//       setProgress(0);
//       onStoryChange?.(newIndex);
//     } else {
//       onPrevUser();
//     }
//   };

//   const current = story?.stories?.[currentStoryIndex];
//   if (!current) return null;

//   return (
//     <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
//       {/* Progress */}
//       <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
//         {story.stories.map((_, i) => (
//           <Box key={i} sx={{ flex: 1, height: 3, bgcolor: 'grey.800', borderRadius: 1 }}>
//             <Box sx={{
//               height: '100%',
//               bgcolor: 'white',
//               width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? `${progress}%` : '0%',
//               transition: 'width 0.1s linear',
//             }} />
//           </Box>
//         ))}
//       </Stack>

//       {/* Header */}
//       <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 40, left: 8, zIndex: 10 }}>
//         <Avatar src={story.profilePic} />
//         <Typography variant="body2" color="white">{story.username}</Typography>
//         <Typography variant="caption" color="gray">1h</Typography>
//       </Stack>

//       {/* Controls */}
//       <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 40, right: 8, zIndex: 10 }}>
//         <IconButton
//           onClick={() => {
//             setIsPaused((prev) => {
//               if (current.type === 'video' && videoRef.current) {
//                 prev ? videoRef.current.play() : videoRef.current.pause();
//               }
//               return !prev;
//             });
//           }}
//           sx={{ color: 'white' }}
//         >
//           {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
//         </IconButton>
//         {current.type === 'video' && (
//           <IconButton onClick={() => setIsMuted((prev) => !prev)} sx={{ color: 'white' }}>
//             {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//           </IconButton>
//         )}
//       </Stack>

//       {/* Content */}
//       {current.type === 'image' ? (
//         <Box component="img" src={current.url} alt="Story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//       ) : (
//         <Box
//           component="video"
//           src={current.url}
//           autoPlay
//           muted={isMuted}
//           ref={videoRef}
//           onEnded={handleNextStory}
//           sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       )}

//       {/* Click zones for touch */}
//       <Box onClick={handlePrevStory} sx={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />
//       <Box onClick={handleNextStory} sx={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />

//       {/* Arrows for desktop */}
//       <IconButton onClick={handlePrevStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronLeftIcon />
//       </IconButton>
//       <IconButton onClick={handleNextStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronRightIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default StoryViewer;



// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box, IconButton, Avatar, Typography, Stack
// } from '@mui/material';
// import PauseIcon from '@mui/icons-material/Pause';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// const StoryViewer = ({ story, onClose, onNextUser, onPrevUser, initialStoryIndex = 0, onStoryChange }) => {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [videoDuration, setVideoDuration] = useState(0);

//   const intervalRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     setCurrentStoryIndex(initialStoryIndex);
//     setProgress(0);
//     setVideoDuration(0);
//   }, [story, initialStoryIndex]);

//   useEffect(() => {
//     if (!story?.stories || isPaused) return;

//     const current = story.stories[currentStoryIndex];
    
//     // For videos, use actual video duration; for images, use JSON duration
//     const duration = current?.type === 'video' && videoDuration > 0 
//       ? videoDuration * 1000 // Convert to milliseconds
//       : (current?.duration || 5000);
    
//     const startTime = Date.now();

//     const update = () => {
//       // For videos, sync with video currentTime if available
//       if (current?.type === 'video' && videoRef.current && videoDuration > 0) {
//         const videoProgress = (videoRef.current.currentTime / videoDuration) * 100;
//         setProgress(Math.min(videoProgress, 100));
//         if (videoProgress >= 100) handleNextStory();
//       } else {
//         // For images, use timer-based progress
//         const elapsed = Date.now() - startTime;
//         const percent = Math.min((elapsed / duration) * 100, 100);
//         setProgress(percent);
//         if (percent >= 100) handleNextStory();
//       }
//     };

//     intervalRef.current = setInterval(update, 50);
//     return () => clearInterval(intervalRef.current);
//   }, [currentStoryIndex, story, isPaused, videoDuration]);

//   const handleNextStory = () => {
//     if (currentStoryIndex < story.stories.length - 1) {
//       const newIndex = currentStoryIndex + 1;
//       setCurrentStoryIndex(newIndex);
//       setProgress(0);
//       setVideoDuration(0);
//       onStoryChange?.(newIndex);
//     } else {
//       onNextUser();
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       const newIndex = currentStoryIndex - 1;
//       setCurrentStoryIndex(newIndex);
//       setProgress(0);
//       setVideoDuration(0);
//       onStoryChange?.(newIndex);
//     } else {
//       onPrevUser();
//     }
//   };

//   const current = story?.stories?.[currentStoryIndex];
//   if (!current) return null;

//   return (
//     <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
//       {/* Progress */}
//       <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
//         {story.stories.map((_, i) => (
//           <Box key={i} sx={{ flex: 1, height: 3, bgcolor: 'grey.800', borderRadius: 1 }}>
//             <Box sx={{
//               height: '100%',
//               bgcolor: 'white',
//               width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? `${progress}%` : '0%',
//               transition: 'width 0.1s linear',
//             }} />
//           </Box>
//         ))}
//       </Stack>

//       {/* Header */}
//       <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 40, left: 8, zIndex: 10 }}>
//         <Avatar src={story.profilePic} />
//         <Typography variant="body2" color="white">{story.username}</Typography>
//         <Typography variant="caption" color="gray">1h</Typography>
//       </Stack>

//       {/* Controls */}
//       <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 40, right: 8, zIndex: 10 }}>
//         <IconButton
//           onClick={() => {
//             setIsPaused((prev) => {
//               if (current.type === 'video' && videoRef.current) {
//                 prev ? videoRef.current.play() : videoRef.current.pause();
//               }
//               return !prev;
//             });
//           }}
//           sx={{ color: 'white' }}
//         >
//           {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
//         </IconButton>
//         {current.type === 'video' && (
//           <IconButton onClick={() => setIsMuted((prev) => !prev)} sx={{ color: 'white' }}>
//             {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//           </IconButton>
//         )}
//       </Stack>

//       {/* Content */}
//       {current.type === 'image' ? (
//         <Box component="img" src={current.url} alt="Story" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//       ) : (
//         <Box
//           component="video"
//           src={current.url}
//           autoPlay
//           muted={isMuted}
//           ref={videoRef}
//           onLoadedMetadata={() => {
//             if (videoRef.current) {
//               setVideoDuration(videoRef.current.duration);
//             }
//           }}
//           onTimeUpdate={() => {
//             // This ensures smooth progress updates while video is playing
//             if (videoRef.current && videoDuration > 0 && !isPaused) {
//               const videoProgress = (videoRef.current.currentTime / videoDuration) * 100;
//               setProgress(Math.min(videoProgress, 100));
//             }
//           }}
//           onEnded={handleNextStory}
//           sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       )}

//       {/* Click zones for touch */}
//       <Box onClick={handlePrevStory} sx={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />
//       <Box onClick={handleNextStory} sx={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />

//       {/* Arrows for desktop */}
//       <IconButton onClick={handlePrevStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronLeftIcon />
//       </IconButton>
//       <IconButton onClick={handleNextStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
//         <ChevronRightIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default StoryViewer;


import React, { useEffect, useRef, useState } from 'react';
import {
  Box, IconButton, Avatar, Typography, Stack
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StoryViewer = ({ story, onClose, onNextUser, onPrevUser, initialStoryIndex = 0, onStoryChange }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
    setProgress(0);
    setVideoDuration(0);
    setVideoDimensions({ width: 0, height: 0 });
  }, [story, initialStoryIndex]);

  useEffect(() => {
    if (!story?.stories || isPaused) return;

    const current = story.stories[currentStoryIndex];
    
    // For videos, use actual video duration; for images, use JSON duration
    const duration = current?.type === 'video' && videoDuration > 0 
      ? videoDuration * 1000 // Convert to milliseconds
      : (current?.duration || 5000);
    
    const startTime = Date.now();

    const update = () => {
      // For videos, sync with video currentTime if available
      if (current?.type === 'video' && videoRef.current && videoDuration > 0) {
        const videoProgress = (videoRef.current.currentTime / videoDuration) * 100;
        setProgress(Math.min(videoProgress, 100));
        if (videoProgress >= 100) handleNextStory();
      } else {
        // For images, use timer-based progress
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);
        if (percent >= 100) handleNextStory();
      }
    };

    intervalRef.current = setInterval(update, 50);
    return () => clearInterval(intervalRef.current);
  }, [currentStoryIndex, story, isPaused, videoDuration]);

  const handleNextStory = () => {
    if (currentStoryIndex < story.stories.length - 1) {
      const newIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(newIndex);
      setProgress(0);
      setVideoDuration(0);
      setVideoDimensions({ width: 0, height: 0 });
      onStoryChange?.(newIndex);
    } else {
      onNextUser();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      const newIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(newIndex);
      setProgress(0);
      setVideoDuration(0);
      setVideoDimensions({ width: 0, height: 0 });
      onStoryChange?.(newIndex);
    } else {
      onPrevUser();
    }
  };

  const current = story?.stories?.[currentStoryIndex];
  if (!current) return null;

  // Calculate dynamic video size
  const getVideoStyle = () => {
    if (current.type !== 'video' || !videoDimensions.width || !videoDimensions.height) {
      return { width: '100%', height: '100%', objectFit: 'cover' };
    }

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const videoAspectRatio = videoDimensions.width / videoDimensions.height;
    const containerAspectRatio = containerWidth / containerHeight;

    let width, height;

    if (videoAspectRatio > containerAspectRatio) {
      // Video is wider than container
      width = containerWidth;
      height = containerWidth / videoAspectRatio;
    } else {
      // Video is taller than container
      height = containerHeight;
      width = containerHeight * videoAspectRatio;
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
      objectFit: 'contain',
      maxWidth: '100%',
      maxHeight: '100%'
    };
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
      {/* Progress */}
      <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
        {story.stories.map((_, i) => (
          <Box key={i} sx={{ flex: 1, height: 3, bgcolor: 'grey.800', borderRadius: 1 }}>
            <Box sx={{
              height: '100%',
              bgcolor: 'white',
              width: i < currentStoryIndex ? '100%' : i === currentStoryIndex ? `${progress}%` : '0%',
              transition: 'width 0.1s linear',
            }} />
          </Box>
        ))}
      </Stack>

      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 40, left: 8, zIndex: 10 }}>
        <Avatar src={story.profilePic} />
        <Typography variant="body2" color="white">{story.username}</Typography>
        <Typography variant="caption" color="gray">1h</Typography>
      </Stack>

      {/* Controls */}
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 40, right: 8, zIndex: 10 }}>
        <IconButton
          onClick={() => {
            setIsPaused((prev) => {
              if (current.type === 'video' && videoRef.current) {
                prev ? videoRef.current.play() : videoRef.current.pause();
              }
              return !prev;
            });
          }}
          sx={{ color: 'white' }}
        >
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
        {current.type === 'video' && (
          <IconButton onClick={() => setIsMuted((prev) => !prev)} sx={{ color: 'white' }}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        )}
      </Stack>

      {/* Content */}
      {current.type === 'image' ? (
        <Box 
          component="img" 
          src={current.url} 
          alt="Story" 
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%' 
          }} 
        />
      ) : (
        <Box
          component="video"
          src={current.url}
          autoPlay
          muted={isMuted}
          ref={videoRef}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoDuration(videoRef.current.duration);
              setVideoDimensions({
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
              });
            }
          }}
          onTimeUpdate={() => {
            // This ensures smooth progress updates while video is playing
            if (videoRef.current && videoDuration > 0 && !isPaused) {
              const videoProgress = (videoRef.current.currentTime / videoDuration) * 100;
              setProgress(Math.min(videoProgress, 100));
            }
          }}
          onEnded={handleNextStory}
          sx={getVideoStyle()}
        />
      )}

      {/* Click zones for touch */}
      <Box onClick={handlePrevStory} sx={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />
      <Box onClick={handleNextStory} sx={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 5 }} />

      {/* Arrows for desktop */}
      <IconButton onClick={handlePrevStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton onClick={handleNextStory} sx={{ display: { xs: 'none', sm: 'flex' }, position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'red', zIndex: 10 }}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default StoryViewer;