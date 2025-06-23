// import React, { useEffect, useState } from 'react';
// import StoryViewer from './StoryViewer';
// import Refreshpage from './Refreshpage';

// const StoryViewerPage = () => {
//   const [story, setStory] = useState(null);

//   useEffect(() => {
//     const currentStory = localStorage.getItem('currentStory');
//     if (currentStory) {
//       setStory(JSON.parse(currentStory));
//     }
//   }, []);

//   if (!story) return <div><Refreshpage/></div>;

//   return (
//     <StoryViewer
//       story={story}
//       onClose={() => {
//         localStorage.removeItem('currentStory');
//         window.history.back(); // or navigate(-1)
//       }}
//       onNextUser={() => {}}
//       onPrevUser={() => {}}
//     />
//   );
// };

// export default StoryViewerPage;



// // StoryViewerPage.jsx
// import React, { useEffect, useState } from 'react';
// import StoryViewer from './StoryViewer';
// import Refreshpage from './Refreshpage';
// import { useNavigate } from 'react-router-dom';

// const StoryViewerPage = () => {
//   const [story, setStory] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentStory = localStorage.getItem('currentStory');
//     if (currentStory) {
//       setStory(JSON.parse(currentStory));
//     }
//   }, []);

//   if (!story) return <div><Refreshpage /></div>;

//   // Pass onNextUser and onPrevUser handlers for switching users
//   const onNextUser = () => {
//     // For now, just clear story and navigate back or implement actual logic
//     localStorage.removeItem('currentStory');
//     navigate(-1);
//   };

//   const onPrevUser = () => {
//     localStorage.removeItem('currentStory');
//     navigate(-1);
//   };

//   return (
//     <StoryViewer
//       story={story}
//       onClose={() => {
//         localStorage.removeItem('currentStory');
//         navigate(-1);
//       }}
//       onNext={onNextUser}
//       onPrev={onPrevUser}
//     />
//   );
// };

// export default StoryViewerPage;


// StoryViewerPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoryViewer from './StoryViewer';
import Refreshpage from './Refreshpage';

const StoryViewerPage = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/story');
        const allUsers = res.data;
        const current = JSON.parse(localStorage.getItem('currentStory'));

        const index = allUsers.findIndex((u) => u.id === current?.id);
        if (index === -1) return navigate('/');

        setUsers(allUsers);
        setCurrentIndex(index);
      } catch (err) {
        console.error('Error fetching stories', err);
        navigate('/stories');
      }
    };

    fetchStories();
  }, [navigate]);

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      const nextIndex = currentIndex + 1;
      localStorage.setItem('currentStory', JSON.stringify(users[nextIndex]));
      setCurrentIndex(nextIndex);
    } else {
      navigate('/stories');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      localStorage.setItem('currentStory', JSON.stringify(users[prevIndex]));
      setCurrentIndex(prevIndex);
    } else {
      navigate('/stories');
    }
  };

  if (!users.length) return <div><Refreshpage/></div>;

  return (
    <StoryViewer
      story={users[currentIndex]}
      onClose={() => navigate('/home')}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
};

export default StoryViewerPage;

