// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';
// import Home from './Components/Home';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import ResetPasswordBox from './Components/ResetPasswordBox';
// import Facebooklogin from './Components/Facebooklogin';
// import Helpcenter from './Components/Helpcenter';
// import StoryViewerPage from './Components/StoryViewerPage';
// import Story from './Components/Story';
// import Explore from './Components/Explore';
// import Navbar from './Components/Navbar';
// import Reels from './Components/Reels';
// import CreatePost from './Components/CreatePost';
// import { ToastContainer } from 'react-toastify';
// import Messages from './Components/Messages';
// import Profile from './Components/Profile';
// import EditProfile from './Components/EditProfile';

// const useModalSync = (setOpen) => {
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/createpost') {
//       setOpen(true);
//     } else {
//       setOpen(false);
//     }
//   }, [location, setOpen]);
// };

// function App() {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => setOpen(false);
//   useModalSync(setOpen);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/reset-password" element={<ResetPasswordBox />} />
//         <Route path="/facebooklogin" element={<Facebooklogin />} />
//         <Route path="/helpcenter" element={<Helpcenter />} />
//       </Routes>

//       {/* Navbar globally rendered */}
//       <Navbar />

//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/story" element={<StoryViewerPage />} />
//         <Route path="/stories" element={<Story />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/reels" element={<Reels />} />
//         <Route path="/createpost" element={<CreatePost open={open} onClose={handleClose} />} />
//         <Route path="/messages" element={<Messages />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/editprofile" element={<EditProfile />} />
//       </Routes>

//       {/* CreatePost modal globally */}
//       <CreatePost open={open} onClose={handleClose} />
//       <ToastContainer position="top-right" />
//     </>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';

// import Home from './Components/Home';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import ResetPasswordBox from './Components/ResetPasswordBox';
// import Facebooklogin from './Components/Facebooklogin';
// import Helpcenter from './Components/Helpcenter';
// import StoryViewerPage from './Components/StoryViewerPage';
// import Story from './Components/Story';
// import Explore from './Components/Explore';
// import Navbar from './Components/Navbar';
// import Reels from './Components/Reels';
// import CreatePost from './Components/CreatePost';
// import Messages from './Components/Messages';
// import Profile from './Components/Profile';
// import EditProfile from './Components/EditProfile';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { Outlet } from 'react-router-dom';

// // ✅ MainLayout component with Navbar
// const MainLayout = ({ open, handleClose }) => (
//   <>
//     <Navbar />
//     <Outlet />
//     <CreatePost open={open} onClose={handleClose} />
//   </>
// );

// // ✅ Custom hook for modal sync
// const useModalSync = (setOpen) => {
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/createpost') {
//       setOpen(true);
//     } else {
//       setOpen(false);
//     }
//   }, [location, setOpen]);
// };

// function App() {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => setOpen(false);
//   useModalSync(setOpen);

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/reset-password" element={<ResetPasswordBox />} />
//         <Route path="/facebooklogin" element={<Facebooklogin />} />
//         <Route path="/helpcenter" element={<Helpcenter />} />

//         {/* Protected Routes with Navbar using MainLayout */}
//         <Route element={<MainLayout open={open} handleClose={handleClose} />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/story" element={<StoryViewerPage />} />
//           <Route path="/stories" element={<Story />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/reels" element={<Reels />} />
//           <Route path="/createpost" element={<CreatePost open={open} onClose={handleClose} />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/editprofile" element={<EditProfile />} />
//         </Route>
//       </Routes>

//       <ToastContainer position="top-right" />
//     </>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';

// import Home from './Components/Home';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import ResetPasswordBox from './Components/ResetPasswordBox';
// import Facebooklogin from './Components/Facebooklogin';
// import Helpcenter from './Components/Helpcenter';
// import StoryViewerPage from './Components/StoryViewerPage';
// import Story from './Components/Story';
// import Explore from './Components/Explore';
// import Navbar from './Components/Navbar';
// import Reels from './Components/Reels';
// import CreatePost from './Components/CreatePost';
// import Messages from './Components/Messages';
// import Profile from './Components/Profile';
// import EditProfile from './Components/EditProfile';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { Outlet } from 'react-router-dom';

// // ✅ MainLayout component with Navbar
// const MainLayout = ({ open, handleClose }) => (
//   <>
//     <Navbar />
//     <Outlet />
//     <CreatePost open={open} onClose={handleClose} />
//   </>
// );

// // ✅ Custom hook for modal sync
// const useModalSync = (setOpen) => {
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/createpost') {
//       setOpen(true);
//     } else {
//       setOpen(false);
//     }
//   }, [location, setOpen]);
// };

// function App() {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => setOpen(false);
//   useModalSync(setOpen);

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/reset-password" element={<ResetPasswordBox />} />
//         <Route path="/facebooklogin" element={<Facebooklogin />} />
//         <Route path="/helpcenter" element={<Helpcenter />} />

//         {/* Protected Routes with Navbar using MainLayout */}
//         <Route element={<MainLayout open={open} handleClose={handleClose} />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/story" element={<StoryViewerPage />} />
//           <Route path="/stories" element={<Story />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/reels" element={<Reels />} />
//           <Route path="/createpost" element={<CreatePost open={open} onClose={handleClose} />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/editprofile" element={<EditProfile />} />
//            {/* <Route path="/editprofile" element={<EditProfile />} /> */}
//         </Route>
//       </Routes>

//       <ToastContainer position="top-right" />
//     </>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ResetPasswordBox from './Components/ResetPasswordBox';
import Facebooklogin from './Components/Facebooklogin';
import Helpcenter from './Components/Helpcenter';
import StoryViewerPage from './Components/StoryViewerPage';
import Story from './Components/Story';
import Explore from './Components/Explore';
import Navbar from './Components/Navbar';
import Reels from './Components/Reels';
import CreatePost from './Components/CreatePost';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import Refreshpage from './Components/Refreshpage'; // Import your splash component

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';

// ✅ MainLayout component with Navbar
const MainLayout = ({ open, handleClose }) => (
  <>
    <Navbar />
    <Outlet />
    <CreatePost open={open} onClose={handleClose} />
  </>
);

// ✅ Custom hook for modal sync
const useModalSync = (setOpen) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/createpost') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location, setOpen]);
};

function App() {
  const [open, setOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const handleClose = () => setOpen(false);
  useModalSync(setOpen);

  // Splash screen logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show splash screen for 2 seconds
  if (showSplash) {
    return <Refreshpage />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasswordBox />} />
        <Route path="/facebooklogin" element={<Facebooklogin />} />
        <Route path="/helpcenter" element={<Helpcenter />} />

        {/* Protected Routes with Navbar using MainLayout */}
        <Route element={<MainLayout open={open} handleClose={handleClose} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/story" element={<StoryViewerPage />} />
          <Route path="/stories" element={<Story />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/createpost" element={<CreatePost open={open} onClose={handleClose} />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;