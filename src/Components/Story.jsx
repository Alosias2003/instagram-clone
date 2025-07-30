

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../Style/Story.css';
// import { useNavigate } from 'react-router-dom';

// const Story = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [seen, setSeen] = useState(() => {
//     const saved = localStorage.getItem('seenStories');
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
//     const clickedUser = users.find((u) => u.id === userId);
//     if (!clickedUser) return;

//     localStorage.setItem('currentStory', JSON.stringify(clickedUser));

//     if (!seen.includes(userId)) {
//       const updatedSeen = [...seen, userId];
//       setSeen(updatedSeen);
//       localStorage.setItem('seenStories', JSON.stringify(updatedSeen));
//     }

//     navigate('/story');
//   };

//   return (
//    <div className="story-container" >
//     <div className='Space'></div>
//      <div className="story-bar">
//       {users.map((user) => (
//         <div
//           key={user.id}
//           className={`story-avatar-container ${seen.includes(user.id) ? 'seen' : 'unseen'}`}
//           onClick={() => handleStoryClick(user.id)}
//         >
//           <div className="story-avatar">
//             <img src={user.profilePic} alt={user.username} />
//           </div>
//           <div className="story-username">{user.username}</div>
//         </div>
//       ))}
//     </div>
//    </div>
//   );
// };

// export default Story;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/Story.css';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material'; // <-- Import Skeleton

const Story = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setTimeout(() => setLoading(false), 1500); // smoother UX
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

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <div className="story-avatar-container" key={i}>
        <div className="story-avatar">
          <Skeleton
            variant="circular"
            width={60}
            height={60}
            animation="wave"
          />
        </div>
        <Skeleton
          variant="text"
          width={60}
          height={12}
          animation="wave"
          style={{ marginTop: 4 }}
        />
      </div>
    ));
  };

  return (
    <div className="story-container">
      <div className="Space"></div>
      <div className="story-bar">
        {loading
          ? renderSkeletons()
          : users.map((user) => (
              <div
                key={user.id}
                className={`story-avatar-container ${
                  seen.includes(user.id) ? 'seen' : 'unseen'
                }`}
                onClick={() => handleStoryClick(user.id)}
              >
                <div className="story-avatar">
                  <img src={user.profilePic} alt={user.username} />
                </div>
                <div className="story-username">{user.username}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Story;
