// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StoryViewer from './StoryViewer';
// import '../Style/Story.css'; 
// import { useNavigate } from 'react-router-dom';

// const Story = () => {

//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [seen, setSeen] = useState(() => {
//     const saved = localStorage.getItem("seenStories");
//     return saved ? JSON.parse(saved) : [];
//   });



//    useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/story');
//         setUsers(res.data);
//       } catch (err) {
//         console.error('Error loading stories:', err);
//       }
//     };

//     fetchStories();
//   }, []);



//   const handleStoryClick = (userId, storyData) => {
//   const clickedIndex = users.findIndex(u => u.id === userId);
//   if (clickedIndex === -1) return;

//   setCurrentIndex(clickedIndex);
//   setSelectedStory(users[clickedIndex]);

//   localStorage.setItem('currentStory', JSON.stringify(users[clickedIndex]));

//   if (!seen.includes(userId)) {
//     const updatedSeen = [...seen, userId];
//     setSeen(updatedSeen);
//     localStorage.setItem("seenStories", JSON.stringify(updatedSeen));
//   }

//   navigate('/story');
// };


//   const goNext = () => {
//     const nextIndex = currentIndex + 1;
//     if (nextIndex < users.length) {
//       setCurrentIndex(nextIndex);
//       setSelectedStory(users[nextIndex]);
//     }
//   };

//   const goPrev = () => {
//     const prevIndex = currentIndex - 1;
//     if (prevIndex >= 0) {
//       setCurrentIndex(prevIndex);
//       setSelectedStory(users[prevIndex]);
//     }
//   };
    
//   return (
//     <div className="story-bar">
//       {users.map(user => (
//         <div
//           key={user.id}
//           className={`story-avatar ${seen.includes(user.id) ? 'seen' : 'unseen'}`}
//           onClick={() => handleStoryClick(user.id)}
//           title={user.username}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => e.key === 'Enter' && handleStoryClick(user.id)}
//         >
//           <img src={user.profilePic} alt={`${user.username}'s story`} />
//           <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{user.username}</div>
//         </div>
//       ))}

//       {selectedStory && (
//         <StoryViewer
        
//           story={selectedStory}
//           onClose={() => setSelectedStory(null)}
//           onNext={goNext}
//           onPrev={goPrev}
//         />
//       )}
//     </div>
//   );
// };

// export default Story;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StoryViewer from './StoryViewer';
// import '../Style/Story.css'; 
// import { useNavigate } from 'react-router-dom';

// const Story = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [seen, setSeen] = useState(() => {
//     const saved = localStorage.getItem("seenStories");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/story');
//         setUsers(res.data);
//       } catch (err) {
//         console.error('Error loading stories:', err);
//       }
//     };

//     fetchStories();
//   }, []);

//   const handleStoryClick = (userId) => {
//     const clickedIndex = users.findIndex(u => u.id === userId);
//     if (clickedIndex === -1) return;

//     setCurrentIndex(clickedIndex);
//     setSelectedStory(users[clickedIndex]);

//     localStorage.setItem('currentStory', JSON.stringify(users[clickedIndex]));

//     if (!seen.includes(userId)) {
//       const updatedSeen = [...seen, userId];
//       setSeen(updatedSeen);
//       localStorage.setItem("seenStories", JSON.stringify(updatedSeen));
//     }

//     navigate('/story'); // Or any route you use for story viewer
//   };

//   const goNext = () => {
//     const nextIndex = currentIndex + 1;
//     if (nextIndex < users.length) {
//       setCurrentIndex(nextIndex);
//       setSelectedStory(users[nextIndex]);
//     }
//   };

//   const goPrev = () => {
//     const prevIndex = currentIndex - 1;
//     if (prevIndex >= 0) {
//       setCurrentIndex(prevIndex);
//       setSelectedStory(users[prevIndex]);
//     }
//   };
    
//   return (
//     <div className="story-bar">
//       {users.map(user => (
//         <div
//           key={user.id}
//           className={`story-avatar ${seen.includes(user.id) ? 'seen' : 'unseen'}`}
//           onClick={() => handleStoryClick(user.id)}
//           title={user.username}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => e.key === 'Enter' && handleStoryClick(user.id)}
//         >
//           <img src={user.profilePic} alt={`${user.username}'s story`} />
//           <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{user.username}</div>
//         </div>
//       ))}

//       {selectedStory && (
//         <StoryViewer
//           story={selectedStory}
//           onClose={() => setSelectedStory(null)}
//           onNext={goNext}
//           onPrev={goPrev}
//         />
//       )}
//     </div>
//   );
// };

// export default Story;

// Story.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StoryViewer from './StoryViewer';
// import '../Style/Story.css';
// import { useNavigate } from 'react-router-dom';

// const Story = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [seen, setSeen] = useState(() => {
//     const saved = localStorage.getItem('seenStories');
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Fetch stories from server on mount
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/story');
//         setUsers(res.data);
//       } catch (err) {
//         console.error('Error loading stories:', err);
//       }
//     };

//     fetchStories();
//   }, []);

//   // When clicking a story avatar
//   const handleStoryClick = (userId) => {
//     const clickedIndex = users.findIndex(u => u.id === userId);
//     if (clickedIndex === -1) return;

//     setCurrentIndex(clickedIndex);
//     setSelectedStory(users[clickedIndex]);

//     localStorage.setItem('currentStory', JSON.stringify(users[clickedIndex]));

//     if (!seen.includes(userId)) {
//       const updatedSeen = [...seen, userId];
//       setSeen(updatedSeen);
//       localStorage.setItem("seenStories", JSON.stringify(updatedSeen));
//     }

//     navigate('/story'); // Navigate to story viewer page
//   };

//   // Navigate to next story (within current user)
//   const goNext = () => {
//     const nextIndex = currentIndex + 1;
//     if (nextIndex < users.length) {
//       setCurrentIndex(nextIndex);
//       setSelectedStory(users[nextIndex]);
//       localStorage.setItem('currentStory', JSON.stringify(users[nextIndex]));
//     }
//   };

//   // Navigate to previous story
//   const goPrev = () => {
//     const prevIndex = currentIndex - 1;
//     if (prevIndex >= 0) {
//       setCurrentIndex(prevIndex);
//       setSelectedStory(users[prevIndex]);
//       localStorage.setItem('currentStory', JSON.stringify(users[prevIndex]));
//     }
//   };

//   return (
//     <div className="story-bar">
//       {users.map(user => (
//         <div
//           key={user.id}
//           className={`story-avatar ${seen.includes(user.id) ? 'seen' : 'unseen'}`}
//           onClick={() => handleStoryClick(user.id)}
//           title={user.username}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => e.key === 'Enter' && handleStoryClick(user.id)}
//         >
//           <img src={user.profilePic} alt={`${user.username}'s story`} />
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{user.username}</div>
//         </div>
//       ))}

//       {selectedStory && (
//         <StoryViewer
//           story={selectedStory}
//           onClose={() => setSelectedStory(null)}
//           onNext={goNext}
//           onPrev={goPrev}
//         />
//       )}
//     </div>
//   );
// };

// export default Story;


// Story.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/Story.css';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [seen, setSeen] = useState(() => {
    const saved = localStorage.getItem('seenStories');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/story');
        setUsers(res.data);
      } catch (err) {
        console.error('Error loading stories:', err);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (userId) => {
    const clickedUser = users.find((u) => u.id === userId);
    if (!clickedUser) return;

    localStorage.setItem('currentStory', JSON.stringify(clickedUser));

    if (!seen.includes(userId)) {
      const updatedSeen = [...seen, userId];
      setSeen(updatedSeen);
      localStorage.setItem('seenStories', JSON.stringify(updatedSeen));
    }

    navigate('/story');
  };

  return (
     <div className="story-bar">
    {users.map((user) => (
      <div
        key={user.id}
        className={`story-avatar-container ${seen.includes(user.id) ? 'seen' : 'unseen'}`}
        onClick={() => handleStoryClick(user.id)}
      >
        <div className="story-avatar">
          <img src={user.profilePic} alt={user.username} />
        </div>
        <div className="story-username">{user.username}</div>
      </div>
    ))}
  </div>
  );
};

export default Story;
