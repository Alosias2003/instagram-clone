// import React, { useState } from 'react';
// import { Routes, Route ,} from "react-router-dom";
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


// function App() {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <Routes>
//       <Route path="/" element={<Login/>} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/reset-password" element={<ResetPasswordBox />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/facebooklogin" element={<Facebooklogin />} />
//       <Route path="/helpcenter" element={<Helpcenter />} />
//         <Route path="/story" element={<StoryViewerPage />} />
//           <Route path="/stories" element={<Story />} />
//           <Route
//            path="/explore"
//             element={
//               <>
//                 <Navbar />
//                 <Explore />
//               </>
//             }
//           />
//            <Route path="/reels" element={
//               <>
//                 <Navbar />
//                 <Reels />
//               </>

//            } />
//           <Route path='/createpost' element={<CreatePost open={open} onClose={handleClose}/>}></Route> 
      
//     </Routes>
    
    
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import {   Routes, Route, useLocation } from 'react-router-dom';
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


// // Custom hook to sync modal state with location
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

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Sync modal state with route
//   useModalSync(setOpen);

//   return (
//     <>
//    <Routes>
//       <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/reset-password" element={<ResetPasswordBox />} />
//          <Route path="/facebooklogin" element={<Facebooklogin />} />
//         <Route path="/helpcenter" element={<Helpcenter />} />
//    </Routes>

//       {/* Render Navbar globally */}
//       <Navbar />
//       <Routes>
        
//         <Route path="/home" element={<Home />} />
       
//         <Route path="/story" element={<StoryViewerPage />} />
//         <Route path="/stories" element={<Story />} />
//         <Route
//           path="/explore"
//           element={
//             <>
//               <Explore />
//             </>
//           }
//         />
//         <Route
//           path="/reels"element={<><Reels /></>}/>
//         <Route
//           path="/createpost"
//           element={<CreatePost open={open} onClose={handleClose} />}
//         />
//         <Route path="/messages" element={<Messages />} />
//         <Route path="/profile" element={<Profile/>} />
//         <Route path="/editprofile" element={<EditProfile />} />
      
      
//     </Routes>
//     {/* Render CreatePost modal globally */}
//       <CreatePost open={open} onClose={handleClose} />
//           <ToastContainer position="top-right" />
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
import { ToastContainer } from 'react-toastify';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';

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
  const handleClose = () => setOpen(false);
  useModalSync(setOpen);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasswordBox />} />
        <Route path="/facebooklogin" element={<Facebooklogin />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
      </Routes>

      {/* Navbar globally rendered */}
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<StoryViewerPage />} />
        <Route path="/stories" element={<Story />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/createpost" element={<CreatePost open={open} onClose={handleClose} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>

      {/* CreatePost modal globally */}
      <CreatePost open={open} onClose={handleClose} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
