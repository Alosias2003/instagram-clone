


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   BottomNavigation,
//   BottomNavigationAction,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Popover,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import instagram from '../Assets/Instagram-Logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ProfileIcon from '@mui/icons-material/Person';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';

// import SearchSidebar from './SearchSidebar';
// import NotificationSidebar from './NotificationSidebar';
// import '../Style/Navbar.css';

// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, isNotification: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, isMore: true },
// ];

// const mobileNavItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const Navbar = () => {
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (isMobile || isSmallScreen) {
//       const currentPath = location.pathname;
//       const mobileNavIndex = mobileNavItems.findIndex((item) => {
//         if (item.path === currentPath) return true;
//         if (item.isSearch && (currentPath.includes('/search') || openSearch)) return true;
//         return false;
//       });
//       setActiveTab(mobileNavIndex !== -1 ? mobileNavIndex : 0);
//     }
//   }, [location.pathname, isMobile, isSmallScreen, openSearch]);

//   const handleSearchToggle = () => {
//     const newSearchState = !openSearch;
//     setOpenSearch(newSearchState);
//     setIsCollapsed(newSearchState);
//     if (newSearchState && openNotification) setOpenNotification(false);
//   };

//   const handleNotificationToggle = () => {
//     const newNotificationState = !openNotification;
//     setOpenNotification(newNotificationState);
//     if (newNotificationState && openSearch) {
//       setOpenSearch(false);
//       setIsCollapsed(false);
//     }
//   };

//   const handleMoreClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMoreClose = () => setAnchorEl(null);

//   const handleLogoutClick = () => {
//     setOpenLogoutConfirm(true);
//     handleMoreClose();
//   };

//   const handleLogoutConfirm = () => {
//     try {
//       localStorage.removeItem('loggedInUser');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userSession');
//       setOpenLogoutConfirm(false);
//       toast.success('Logged out successfully!', { position: 'top-center', autoClose: 2000 });
//       setTimeout(() => navigate('/login', { replace: true }), 2100);
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('Error logging out. Please try again.', { position: 'top-center', autoClose: 3000 });
//     }
//   };

//   const handleLogoutCancel = () => setOpenLogoutConfirm(false);

//   const handleNavigation = (path) => {
//     if (path && typeof path === 'string') {
//       try {
//         navigate(path);
//       } catch (error) {
//         console.error('Navigation error:', error);
//         toast.error('Navigation failed. Please try again.', { position: 'top-center', autoClose: 2000 });
//       }
//     }
//   };

//   const handleMobileNavChange = (event, newValue) => {
//     if (newValue < 0 || newValue >= mobileNavItems.length) return;
//     setActiveTab(newValue);
//     const item = mobileNavItems[newValue];
//     if (item.isSearch) handleSearchToggle();
//     else if (item.path) handleNavigation(item.path);
//   };

//   const sidebarWidth = isCollapsed ? '75px' : '245px';

//   return (
//     <>
//       {isSmallScreen && (
//         <style jsx global>{`
//           body {
//             padding-top: 56px;
//             padding-bottom: 50px;
//           }
//           .mobile-content {
//             margin-top: 56px;
//             margin-bottom: 50px;
//             min-height: calc(100vh - 106px);
//           }
//         `}</style>
//       )}

//       {/* Desktop Sidebar */}
//       {!isMobile && !isTablet && (
//         <Box sx={{ width: sidebarWidth, bgcolor: 'white', position: 'fixed', height: '100vh', borderRight: '1px solid #dbdbdb', zIndex: 1200, transition: 'width 0.3s ease', overflow: 'hidden', }}>
//           <Box sx={{ p: isCollapsed ? '25px 0' : '25px 24px', textAlign: isCollapsed ? 'center' : 'left' }}>
//             <img src={instagram} alt="Instagram" style={{ width: isCollapsed ? '24px' : '103px', cursor: 'pointer', transition: 'width 0.3s ease' }} onClick={() => handleNavigation('/home')} />
//           </Box>
//          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         {navItems.map((item) => (
//           <Box
//             key={item.label}
//             onClick={() => {
//               if (item.isSearch) handleSearchToggle();
//               else if (item.isNotification) handleNotificationToggle();
//               else if (item.path) handleNavigation(item.path);
//             }}
//             sx={{
//               p: isCollapsed ? '12px 0' : '12px 12px',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: isCollapsed ? 'center' : 'flex-start',
//               borderRadius: '8px',
//               margin: '0 8px',
//               '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//               {item.icon}
//             </Box>
//             {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//           </Box>
//         ))}
//       </Box>

//           <Box sx={{ position: 'absolute', bottom: 0, width: '100%', pb: 2 }}>
//             {belowNavItems.map((item) => (
//               <Box key={item.label} onClick={(e) => handleMoreClick(e)} sx={{ p: isCollapsed ? '12px 0' : '12px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', borderRadius: '8px', margin: '0 8px 4px', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>{item.icon}</Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* Tablet Sidebar */}
//       {isTablet && (
//         <Box sx={{ width: '75px', bgcolor: 'white', position: 'fixed', height: '100vh', borderRight: '1px solid #dbdbdb', zIndex: 1200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Box sx={{ p: '20px' }}>
//             <img src={instagram} alt="Instagram" style={{ width: '24px', cursor: 'pointer' }} onClick={() => handleNavigation('/home')} />
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
//             {navItems.map((item) => (
//               <IconButton key={item.label} onClick={() => handleNavigation(item.path)} sx={{ margin: '4px 8px' }}>{item.icon}</IconButton>
//             ))}
//           </Box>
//         </Box>
//       )}



//       {/* Mobile Top Navbar */}
// {isSmallScreen && (
//   <>
//     <AppBar
//       position="fixed"
//       sx={{
//         top: 0,
//         bgcolor: 'white',
//         color: 'black',
//         zIndex: 1300,
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//         borderBottom: '1px solid #dbdbdb',
//       }}
//     >
//       <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
//         <img
//           src={instagram}
//           alt="Instagram"
//           style={{ width: '103px', cursor: 'pointer', height: 'auto' }}
//           onClick={() => handleNavigation('/home')}
//         />
//         <Box sx={{ flexGrow: 1 }} />
//         <IconButton onClick={() => handleNotificationToggle()}>
//           <FavoriteBorderOutlinedIcon />
//         </IconButton>
//         <IconButton onClick={() => handleNavigation('/messages')}>
//           <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />
//         </IconButton>
//       </Toolbar>
//     </AppBar>

//     <BottomNavigation
//       value={activeTab}
//       onChange={handleMobileNavChange}
//       showLabels={false}
//       sx={{
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         padding: 0,
//         margin: 0,
//         width: '100%',
//         maxWidth:'614px',
//         display: 'flex',
//         height: '50px',
//         zIndex: 1300,
//         borderTop: '1px solid #dbdbdb',
//         backgroundColor: 'white',
//       }}
//     >
//       {mobileNavItems.map((item, index) => (
//         <BottomNavigationAction
//           key={`${item.label}-${index}`}
//           icon={React.cloneElement(item.icon, {
//             style: {
//               ...item.icon.props.style,
//               fontSize: '24px',
//               width: '24px',
//               height: '24px',
//             },
//           })}
//           sx={{ color: '#262626', '&.Mui-selected': { color: '#000' } }}
//         />
//       ))}
//     </BottomNavigation>

//     {/* Ensure main content is visible below AppBar */}
//     <style jsx global>{`
//       .mobile-content {
//         margin-top: 56px;
//         margin-bottom: 50px;
//         min-height: calc(100vh - 106px);
//       }
//     `}</style>
//   </>
// )}


//       {/* Sidebars and popovers */}
//       <SearchSidebar open={openSearch} onClose={() => { setOpenSearch(false); setIsCollapsed(false); }} />
//       <NotificationSidebar open={openNotification} onClose={() => setOpenNotification(false)} />

//       {/* <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMoreClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
//         <Box sx={{ p: 2, minWidth: '150px' }}>
//           <Button fullWidth onClick={handleLogoutClick} sx={{ justifyContent: 'flex-start' }}>Log Out</Button>
//         </Box>
//       </Popover> */}


//       <Popover
//   open={Boolean(anchorEl)}
//   anchorEl={anchorEl}
//   onClose={handleMoreClose}
//   anchorOrigin={{ vertical: 'top'}}
//   transformOrigin={{ vertical: 'top'}}
//   PaperProps={{
//     sx: { borderRadius: 3, p: 1, minWidth: 200 },
//   }}
// >
//   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Settings</Button>
//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Your activity</Button>
//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Saved</Button>
//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Switch appearance</Button>
//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Report a problem</Button>

//     <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>Switch accounts</Button>

//     <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//     <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }} onClick={handleLogoutClick}>
//       Log out
//     </Button>
//   </Box>
// </Popover>


//       <Dialog open={openLogoutConfirm} onClose={handleLogoutCancel} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ textAlign: 'center' }}>Log Out?</DialogTitle>
//         <DialogContent><DialogContentText sx={{ textAlign: 'center' }}>Are you sure you want to log out of your account?</DialogContentText></DialogContent>
//         <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
//           <Button onClick={handleLogoutCancel} variant="outlined" sx={{ minWidth: '100px' }}>Cancel</Button>
//           <Button onClick={handleLogoutConfirm} color="error" variant="contained" sx={{ minWidth: '100px' }}>Log Out</Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover style={{ zIndex: 9999 }} />
//     </>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   BottomNavigation,
//   BottomNavigationAction,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Popover,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ================================
// // ASSET IMPORTS
// // ================================
// import instagram from '../Assets/Instagram-Logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ProfileIcon from '@mui/icons-material/Person';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';

// import SearchSidebar from './SearchSidebar';
// import NotificationSidebar from './NotificationSidebar';
// import '../Style/Navbar.css';

// // ================================
// // NAVIGATION CONFIGURATION
// // ================================
// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, isNotification: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, isMore: true },
// ];

// const mobileNavItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// // ================================
// // MAIN COMPONENT
// // ================================
// const Navbar = () => {
//   // ================================
//   // STATE MANAGEMENT
//   // ================================
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // ================================
//   // HOOKS & NAVIGATION
//   // ================================
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ================================
//   // EFFECTS
//   // ================================
//   useEffect(() => {
//     if (isMobile || isSmallScreen) {
//       const currentPath = location.pathname;
//       const mobileNavIndex = mobileNavItems.findIndex((item) => {
//         if (item.path === currentPath) return true;
//         if (item.isSearch && (currentPath.includes('/search') || openSearch)) return true;
//         return false;
//       });
//       setActiveTab(mobileNavIndex !== -1 ? mobileNavIndex : 0);
//     }
//   }, [location.pathname, isMobile, isSmallScreen, openSearch]);

//   // ================================
//   // EVENT HANDLERS
//   // ================================
  
//   // Search Toggle Handler
//   const handleSearchToggle = () => {
//     const newSearchState = !openSearch;
//     setOpenSearch(newSearchState);
//     setIsCollapsed(newSearchState);
//     if (newSearchState && openNotification) setOpenNotification(false);
//   };

//   // Notification Toggle Handler
//   const handleNotificationToggle = () => {
//     const newNotificationState = !openNotification;
//     setOpenNotification(newNotificationState);
//     if (newNotificationState && openSearch) {
//       setOpenSearch(false);
//       setIsCollapsed(false);
//     }
//   };

//   // More Menu Handlers
//   const handleMoreClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMoreClose = () => setAnchorEl(null);

//   // Logout Handlers
//   const handleLogoutClick = () => {
//     setOpenLogoutConfirm(true);
//     handleMoreClose();
//   };

//   const handleLogoutConfirm = () => {
//     try {
//       localStorage.removeItem('loggedInUser');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userSession');
//       setOpenLogoutConfirm(false);
//       toast.success('Logged out successfully!', { position: 'top-center', autoClose: 2000 });
//       setTimeout(() => navigate('/login', { replace: true }), 2100);
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('Error logging out. Please try again.', { position: 'top-center', autoClose: 3000 });
//     }
//   };

//   const handleLogoutCancel = () => setOpenLogoutConfirm(false);

//   // Navigation Handler
//   const handleNavigation = (path) => {
//     if (path && typeof path === 'string') {
//       try {
//         navigate(path);
//       } catch (error) {
//         console.error('Navigation error:', error);
//         toast.error('Navigation failed. Please try again.', { position: 'top-center', autoClose: 2000 });
//       }
//     }
//   };

//   // Mobile Navigation Handler
//   const handleMobileNavChange = (event, newValue) => {
//     if (newValue < 0 || newValue >= mobileNavItems.length) return;
//     setActiveTab(newValue);
//     const item = mobileNavItems[newValue];
//     if (item.isSearch) handleSearchToggle();
//     else if (item.path) handleNavigation(item.path);
//   };

//   // ================================
//   // COMPUTED VALUES
//   // ================================
//   const sidebarWidth = isCollapsed ? '75px' : '245px';

//   // ================================
//   // RENDER FUNCTIONS
//   // ================================
//   return (
//     <>
//       {/* ================================ */}
//       {/* GLOBAL MOBILE STYLES */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <style jsx global>{`
//           body {
//             padding-top: 56px;
//             padding-bottom: 50px;
//           }
//           .mobile-content {
//             margin-top: 56px;
//             margin-bottom: 50px;
//             min-height: calc(100vh - 106px);
//           }
//         `}</style>
//       )}

//       {/* ================================ */}
//       {/* DESKTOP SIDEBAR */}
//       {/* ================================ */}
//       {!isMobile && !isTablet && (
//         <Box sx={{ 
//           width: sidebarWidth, 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           transition: 'width 0.3s ease', 
//           overflow: 'hidden', 
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ 
//             p: isCollapsed ? '25px 0' : '25px 24px', 
//             textAlign: isCollapsed ? 'center' : 'left' 
//           }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ 
//                 width: isCollapsed ? '24px' : '103px', 
//                 cursor: 'pointer', 
//                 transition: 'width 0.3s ease' 
//               }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Main Navigation Items */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             {navItems.map((item) => (
//               <Box
//                 key={item.label}
//                 onClick={() => {
//                   if (item.isSearch) handleSearchToggle();
//                   else if (item.isNotification) handleNotificationToggle();
//                   else if (item.path) handleNavigation(item.path);
//                 }}
//                 sx={{
//                   p: isCollapsed ? '12px 0' : '12px 12px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: isCollapsed ? 'center' : 'flex-start',
//                   borderRadius: '8px',
//                   margin: '0 8px',
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>

//           {/* Bottom Navigation Items */}
//           <Box sx={{ position: 'absolute', bottom: 0, width: '100%', pb: 2 }}>
//             {belowNavItems.map((item) => (
//               <Box 
//                 key={item.label} 
//                 onClick={(e) => handleMoreClick(e)} 
//                 sx={{ 
//                   p: isCollapsed ? '12px 0' : '12px 12px', 
//                   cursor: 'pointer', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: isCollapsed ? 'center' : 'flex-start', 
//                   borderRadius: '8px', 
//                   margin: '0 8px 4px', 
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* TABLET SIDEBAR */}
//       {/* ================================ */}
//       {isTablet && (
//         <Box sx={{ 
//           width: '75px', 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center' 
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ p: '20px' }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ width: '24px', cursor: 'pointer' }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Navigation Items */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
//             {navItems.map((item) => (
//               <IconButton 
//                 key={item.label} 
//                 onClick={() => handleNavigation(item.path)} 
//                 sx={{ margin: '4px 8px' }}
//               >
//                 {item.icon}
//               </IconButton>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* MOBILE NAVIGATION */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <>
//           {/* Top App Bar */}
//           <AppBar
//             position="fixed"
//             sx={{
//               top: 0,
//               bgcolor: 'white',
//               color: 'black',
//               zIndex: 1300,
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               borderBottom: '1px solid #dbdbdb',
//             }}
//           >
//             <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
//               {/* Logo */}
//               <img
//                 src={instagram}
//                 alt="Instagram"
//                 style={{ width: '103px', cursor: 'pointer', height: 'auto' }}
//                 onClick={() => handleNavigation('/home')}
//               />
//               <Box sx={{ flexGrow: 1 }} />
              
//               {/* Right Side Icons */}
//               <IconButton onClick={() => handleNotificationToggle()}>
//                 <FavoriteBorderOutlinedIcon />
//               </IconButton>
//               <IconButton onClick={() => handleNavigation('/messages')}>
//                 <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />
//               </IconButton>
//             </Toolbar>
//           </AppBar>

//           {/* Bottom Navigation */}
//           <BottomNavigation
//             value={activeTab}
//             onChange={handleMobileNavChange}
//             showLabels={false}
//             sx={{
//               position: 'fixed',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               padding: 0,
//               margin: 0,
//               width: '100%',
//               maxWidth:'614px',
//               display: 'flex',
//               height: '50px',
//               zIndex: 1300,
//               borderTop: '1px solid #dbdbdb',
//               backgroundColor: 'white',
//             }}
//           >
//             {mobileNavItems.map((item, index) => (
//               <BottomNavigationAction
//                 key={`${item.label}-${index}`}
//                 icon={React.cloneElement(item.icon, {
//                   style: {
//                     ...item.icon.props.style,
//                     fontSize: '24px',
//                     width: '24px',
//                     height: '24px',
//                   },
//                 })}
//                 sx={{ color: '#262626', '&.Mui-selected': { color: '#000' } }}
//               />
//             ))}
//           </BottomNavigation>

//           {/* Mobile Content Spacing Styles */}
//           <style jsx global>{`
//             .mobile-content {
//               margin-top: 56px;
//               margin-bottom: 50px;
//               min-height: calc(100vh - 106px);
//             }
//           `}</style>
//         </>
//       )}

//       {/* ================================ */}
//       {/* SIDEBARS & OVERLAYS */}
//       {/* ================================ */}
//       <SearchSidebar 
//         open={openSearch} 
//         onClose={() => { 
//           setOpenSearch(false); 
//           setIsCollapsed(false); 
//         }} 
//       />
//       <NotificationSidebar 
//         open={openNotification} 
//         onClose={() => setOpenNotification(false)} 
//       />

//       {/* ================================ */}
//       {/* MORE MENU POPOVER */}
//       {/* ================================ */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleMoreClose}
//         anchorOrigin={{ vertical: 'top'}}
//         transformOrigin={{ vertical: 'top'}}
//         PaperProps={{
//           sx: { borderRadius: 3, p: 1, minWidth: 200 },
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Settings
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Your activity
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Saved
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Switch appearance
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Report a problem
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Switch accounts
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }} 
//             onClick={handleLogoutClick}
//           >
//             Log out
//           </Button>
//         </Box>
//       </Popover>

//       {/* ================================ */}
//       {/* LOGOUT CONFIRMATION DIALOG */}
//       {/* ================================ */}
//       <Dialog 
//         open={openLogoutConfirm} 
//         onClose={handleLogoutCancel} 
//         maxWidth="sm" 
//         fullWidth
//       >
//         <DialogTitle sx={{ textAlign: 'center' }}>
//           Log Out?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ textAlign: 'center' }}>
//             Are you sure you want to log out of your account?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
//           <Button 
//             onClick={handleLogoutCancel} 
//             variant="outlined" 
//             sx={{ minWidth: '100px' }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleLogoutConfirm} 
//             color="error" 
//             variant="contained" 
//             sx={{ minWidth: '100px' }}
//           >
//             Log Out
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================================ */}
//       {/* TOAST NOTIFICATIONS */}
//       {/* ================================ */}
//       <ToastContainer 
//         position="top-center" 
//         autoClose={3000} 
//         hideProgressBar={false} 
//         newestOnTop 
//         closeOnClick 
//         pauseOnHover 
//         style={{ zIndex: 9999 }} 
//       />
//     </>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   BottomNavigation,
//   BottomNavigationAction,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Popover,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ================================
// // ASSET IMPORTS
// // ================================
// import instagram from '../Assets/Instagram-Logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ProfileIcon from '@mui/icons-material/Person';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';

// import SearchSidebar from './SearchSidebar';
// import NotificationSidebar from './NotificationSidebar';
// import '../Style/Navbar.css';

// // ================================
// // NAVIGATION CONFIGURATION
// // ================================
// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, isNotification: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, isMore: true },
// ];

// const mobileNavItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// // ================================
// // MAIN COMPONENT
// // ================================
// const Navbar = () => {
//   // ================================
//   // STATE MANAGEMENT
//   // ================================
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // ================================
//   // HOOKS & NAVIGATION
//   // ================================
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ================================
//   // EFFECTS
//   // ================================
//   useEffect(() => {
//     if (isMobile || isSmallScreen) {
//       const currentPath = location.pathname;
//       const mobileNavIndex = mobileNavItems.findIndex((item) => {
//         if (item.path === currentPath) return true;
//         if (item.isSearch && (currentPath.includes('/search') || openSearch)) return true;
//         return false;
//       });
//       setActiveTab(mobileNavIndex !== -1 ? mobileNavIndex : 0);
//     }
//   }, [location.pathname, isMobile, isSmallScreen, openSearch]);

//   // ================================
//   // EVENT HANDLERS
//   // ================================
  
//   // Search Toggle Handler
//   const handleSearchToggle = () => {
//     const newSearchState = !openSearch;
//     setOpenSearch(newSearchState);
//     setIsCollapsed(newSearchState);
//     if (newSearchState && openNotification) setOpenNotification(false);
//   };

//   // Notification Toggle Handler
//   const handleNotificationToggle = () => {
//     const newNotificationState = !openNotification;
//     setOpenNotification(newNotificationState);
//     if (newNotificationState && openSearch) {
//       setOpenSearch(false);
//       setIsCollapsed(false);
//     }
//   };

//   // More Menu Handlers
//   const handleMoreClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMoreClose = () => setAnchorEl(null);

//   // Logout Handlers
//   const handleLogoutClick = () => {
//     setOpenLogoutConfirm(true);
//     handleMoreClose();
//   };

//   const handleLogoutConfirm = () => {
//     try {
//       localStorage.removeItem('loggedInUser');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userSession');
//       setOpenLogoutConfirm(false);
//       toast.success('Logged out successfully!', { position: 'top-center', autoClose: 2000 });
//       setTimeout(() => navigate('/login', { replace: true }), 2100);
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('Error logging out. Please try again.', { position: 'top-center', autoClose: 3000 });
//     }
//   };

//   const handleLogoutCancel = () => setOpenLogoutConfirm(false);

//   // Navigation Handler
//   const handleNavigation = (path) => {
//     if (path && typeof path === 'string') {
//       try {
//         navigate(path);
//       } catch (error) {
//         console.error('Navigation error:', error);
//         toast.error('Navigation failed. Please try again.', { position: 'top-center', autoClose: 2000 });
//       }
//     }
//   };

//   // Mobile Navigation Handler
//   const handleMobileNavChange = (event, newValue) => {
//     if (newValue < 0 || newValue >= mobileNavItems.length) return;
//     setActiveTab(newValue);
//     const item = mobileNavItems[newValue];
//     if (item.isSearch) handleSearchToggle();
//     else if (item.path) handleNavigation(item.path);
//   };

//   // ================================
//   // COMPUTED VALUES
//   // ================================
//   const sidebarWidth = isCollapsed ? '75px' : '245px';

//   // ================================
//   // RENDER FUNCTIONS
//   // ================================
//   return (
//     <>
//       {/* ================================ */}
//       {/* GLOBAL MOBILE STYLES */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <style jsx global>{`
//           body {
//             padding-top: 56px;
//             padding-bottom: 50px;
//           }
//           .mobile-content {
//             margin-top: 56px;
//             margin-bottom: 50px;
//             min-height: calc(100vh - 106px);
//           }
//         `}</style>
//       )}

//       {/* ================================ */}
//       {/* DESKTOP SIDEBAR */}
//       {/* ================================ */}
//       {!isMobile && !isTablet && (
//         <Box sx={{ 
//           width: sidebarWidth, 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           // transition: 'width 0.3s ease', 
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ 
//             p: isCollapsed ? '25px 0' : '25px 24px', 
//             textAlign: isCollapsed ? 'center' : 'left' 
//           }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ 
//                 width: isCollapsed ? '24px' : '103px', 
//                 cursor: 'pointer', 
//                 transition: 'width 0.3s ease' 
//               }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Main Navigation Items */}
//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             gap: 1,
//             flex: 1,
//             overflow: 'auto'
//           }}>
//             {navItems.map((item) => (
//               <Box
//                 key={item.label}
//                 onClick={() => {
//                   if (item.isSearch) handleSearchToggle();
//                   else if (item.isNotification) handleNotificationToggle();
//                   else if (item.path) handleNavigation(item.path);
//                 }}
//                 sx={{
//                   p: isCollapsed ? '12px 0' : '12px 12px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: isCollapsed ? 'center' : 'flex-start',
//                   borderRadius: '8px',
//                   margin: '0 8px',
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>

//           {/* Bottom Navigation Items */}
//           <Box sx={{ 
//             marginTop: 'auto', 
//             width: '100%', 
//             pb: 2,
//             pt: 2,
//             borderTop: '1px solid rgba(0,0,0,0.05)',
//             mt: 2
//           }}>
//             {belowNavItems.map((item) => (
//               <Box 
//                 key={item.label} 
//                 onClick={(e) => handleMoreClick(e)} 
//                 sx={{ 
//                   p: isCollapsed ? '12px 0' : '12px 12px', 
//                   cursor: 'pointer', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: isCollapsed ? 'center' : 'flex-start', 
//                   borderRadius: '8px', 
//                   margin: '0 8px 4px', 
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* TABLET SIDEBAR */}
//       {/* ================================ */}
//       {isTablet && (
//         <Box sx={{ 
//           width: '75px', 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center' 
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ p: '20px' }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ width: '24px', cursor: 'pointer' }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Navigation Items */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
//             {navItems.map((item) => (
//               <IconButton 
//                 key={item.label} 
//                 onClick={() => handleNavigation(item.path)} 
//                 sx={{ margin: '4px 8px' }}
//               >
//                 {item.icon}
//               </IconButton>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* MOBILE NAVIGATION */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <>
//           {/* Top App Bar */}
//           <AppBar
//             position="fixed"
//             sx={{
//               top: 0,
//               bgcolor: 'white',
//               color: 'black',
//               zIndex: 1300,
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               borderBottom: '1px solid #dbdbdb',
//             }}
//           >
//             <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
//               {/* Logo */}
//               <img
//                 src={instagram}
//                 alt="Instagram"
//                 style={{ width: '103px', cursor: 'pointer', height: 'auto' }}
//                 onClick={() => handleNavigation('/home')}
//               />
//               <Box sx={{ flexGrow: 1 }} />
              
//               {/* Right Side Icons */}
//               <IconButton onClick={() => handleNotificationToggle()}>
//                 <FavoriteBorderOutlinedIcon />
//               </IconButton>
//               <IconButton onClick={() => handleNavigation('/messages')}>
//                 <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />
//               </IconButton>
//             </Toolbar>
//           </AppBar>

//           {/* Bottom Navigation */}
//           <BottomNavigation
//             value={activeTab}
//             onChange={handleMobileNavChange}
//             showLabels={false}
//             sx={{
//               position: 'fixed',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               padding: 0,
//               margin: 0,
//               width: '100%',
//               maxWidth:'614px',
//               display: 'flex',
//               height: '50px',
//               zIndex: 1300,
//               borderTop: '1px solid #dbdbdb',
//               backgroundColor: 'white',
//             }}
//           >
//             {mobileNavItems.map((item, index) => (
//               <BottomNavigationAction
//                 key={`${item.label}-${index}`}
//                 icon={React.cloneElement(item.icon, {
//                   style: {
//                     ...item.icon.props.style,
//                     fontSize: '24px',
//                     width: '24px',
//                     height: '24px',
//                   },
//                 })}
//                 sx={{ color: '#262626', '&.Mui-selected': { color: '#000' } }}
//               />
//             ))}
//           </BottomNavigation>

//           {/* Mobile Content Spacing Styles */}
//           <style jsx global>{`
//             .mobile-content {
//               margin-top: 56px;
//               margin-bottom: 50px;
//               min-height: calc(100vh - 106px);
//             }
//           `}</style>
//         </>
//       )}

//       {/* ================================ */}
//       {/* SIDEBARS & OVERLAYS */}
//       {/* ================================ */}
//       <SearchSidebar 
//         open={openSearch} 
//         onClose={() => { 
//           setOpenSearch(false); 
//           setIsCollapsed(false); 
//         }} 
//       />
//       <NotificationSidebar 
//         open={openNotification} 
//         onClose={() => setOpenNotification(false)} 
//       />

//       {/* ================================ */}
//       {/* MORE MENU POPOVER */}
//       {/* ================================ */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleMoreClose}
//         anchorOrigin={{ vertical: 'top'}}
//         transformOrigin={{ vertical: 'top'}}
//         PaperProps={{
//           sx: { borderRadius: 3, p: 1, minWidth: 200 },
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Settings
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Your activity
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Saved
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Switch appearance
//           </Button>
//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Report a problem
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }}>
//             Switch accounts
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1 }} 
//             onClick={handleLogoutClick}
//           >
//             Log out
//           </Button>
//         </Box>
//       </Popover>

//       {/* ================================ */}
//       {/* LOGOUT CONFIRMATION DIALOG */}
//       {/* ================================ */}
//       <Dialog 
//         open={openLogoutConfirm} 
//         onClose={handleLogoutCancel} 
//         maxWidth="sm" 
//         fullWidth
//       >
//         <DialogTitle sx={{ textAlign: 'center' }}>
//           Log Out?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ textAlign: 'center' }}>
//             Are you sure you want to log out of your account?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
//           <Button 
//             onClick={handleLogoutCancel} 
//             variant="outlined" 
//             sx={{ minWidth: '100px' }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleLogoutConfirm} 
//             color="error" 
//             variant="contained" 
//             sx={{ minWidth: '100px' }}
//           >
//             Log Out
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================================ */}
//       {/* TOAST NOTIFICATIONS */}
//       {/* ================================ */}
//       <ToastContainer 
//         position="top-center" 
//         autoClose={3000} 
//         hideProgressBar={false} 
//         newestOnTop 
//         closeOnClick 
//         pauseOnHover 
//         style={{ zIndex: 9999 }} 
//       />
//     </>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   BottomNavigation,
//   BottomNavigationAction,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Popover,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ================================
// // ASSET IMPORTS
// // ================================
// import instagram from '../Assets/Instagram-Logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ProfileIcon from '@mui/icons-material/Person';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';

// import SearchSidebar from './SearchSidebar';
// import NotificationSidebar from './NotificationSidebar';
// import '../Style/Navbar.css';

// // ================================
// // NAVIGATION CONFIGURATION
// // ================================
// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, isNotification: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, isMore: true },
// ];

// const mobileNavItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// // ================================
// // MAIN COMPONENT
// // ================================
// const Navbar = () => {
//   // ================================
//   // STATE MANAGEMENT
//   // ================================
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // ================================
//   // HOOKS & NAVIGATION
//   // ================================
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ================================
//   // EFFECTS
//   // ================================
//   useEffect(() => {
//     if (isMobile || isSmallScreen) {
//       const currentPath = location.pathname;
//       const mobileNavIndex = mobileNavItems.findIndex((item) => {
//         if (item.path === currentPath) return true;
//         if (item.isSearch && (currentPath.includes('/search') || openSearch)) return true;
//         return false;
//       });
//       setActiveTab(mobileNavIndex !== -1 ? mobileNavIndex : 0);
//     }
//   }, [location.pathname, isMobile, isSmallScreen, openSearch]);

//   // ================================
//   // EVENT HANDLERS
//   // ================================
  
//   // Search Toggle Handler
//   const handleSearchToggle = () => {
//     const newSearchState = !openSearch;
//     setOpenSearch(newSearchState);
//     setIsCollapsed(newSearchState);
//     if (newSearchState && openNotification) setOpenNotification(false);
//   };

//   // Notification Toggle Handler
//   const handleNotificationToggle = () => {
//     const newNotificationState = !openNotification;
//     setOpenNotification(newNotificationState);
//     if (newNotificationState && openSearch) {
//       setOpenSearch(false);
//       setIsCollapsed(false);
//     }
//   };

//   // More Menu Handlers
//   const handleMoreClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMoreClose = () => setAnchorEl(null);

//   // Logout Handlers
//   const handleLogoutClick = () => {
//     setOpenLogoutConfirm(true);
//     handleMoreClose();
//   };

//   const handleLogoutConfirm = () => {
//     try {
//       localStorage.removeItem('loggedInUser');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userSession');
//       setOpenLogoutConfirm(false);
//       toast.success('Logged out successfully!', { position: 'top-center', autoClose: 2000 });
//       setTimeout(() => navigate('/login', { replace: true }), 2100);
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('Error logging out. Please try again.', { position: 'top-center', autoClose: 3000 });
//     }
//   };

//   const handleLogoutCancel = () => setOpenLogoutConfirm(false);

//   // Navigation Handler
//   const handleNavigation = (path) => {
//     if (path && typeof path === 'string') {
//       try {
//         navigate(path);
//       } catch (error) {
//         console.error('Navigation error:', error);
//         toast.error('Navigation failed. Please try again.', { position: 'top-center', autoClose: 2000 });
//       }
//     }
//   };

//   // Mobile Navigation Handler
//   const handleMobileNavChange = (event, newValue) => {
//     if (newValue < 0 || newValue >= mobileNavItems.length) return;
//     setActiveTab(newValue);
//     const item = mobileNavItems[newValue];
//     if (item.isSearch) handleSearchToggle();
//     else if (item.path) handleNavigation(item.path);
//   };

//   // ================================
//   // COMPUTED VALUES
//   // ================================
//   const sidebarWidth = isCollapsed ? '75px' : '245px';

//   // ================================
//   // RENDER FUNCTIONS
//   // ================================
//   return (
//     <>
//       {/* ================================ */}
//       {/* GLOBAL MOBILE STYLES */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <style jsx global>{`
//           body {
//             padding-top: 56px;
//             padding-bottom: 50px;
//           }
//           .mobile-content {
//             margin-top: 56px;
//             margin-bottom: 50px;
//             min-height: calc(100vh - 106px);
//           }
//         `}</style>
//       )}

//       {/* ================================ */}
//       {/* DESKTOP SIDEBAR */}
//       {/* ================================ */}
//       {!isMobile && !isTablet && (
//         <Box sx={{ 
//           width: sidebarWidth, 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           transition: 'width 0.3s ease', 
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ 
//             p: isCollapsed ? '25px 0' : '25px 24px', 
//             textAlign: isCollapsed ? 'center' : 'left' 
//           }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ 
//                 width: isCollapsed ? '24px' : '103px', 
//                 cursor: 'pointer', 
//                 transition: 'width 0.3s ease' 
//               }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Main Navigation Items */}
//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             gap: 1,
//             flex: 1,
//             overflow: 'auto',
//             // Hide scrollbar for all browsers
//             '&::-webkit-scrollbar': {
//               display: 'none'
//             },
//             '-ms-overflow-style': 'none',  // IE and Edge
//             'scrollbar-width': 'none'      // Firefox
//           }}>
//             {navItems.map((item) => (
//               <Box
//                 key={item.label}
//                 onClick={() => {
//                   if (item.isSearch) handleSearchToggle();
//                   else if (item.isNotification) handleNotificationToggle();
//                   else if (item.path) handleNavigation(item.path);
//                 }}
//                 sx={{
//                   p: isCollapsed ? '12px 0' : '12px 12px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: isCollapsed ? 'center' : 'flex-start',
//                   borderRadius: '8px',
//                   margin: '0 8px',
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>

//           {/* Bottom Navigation Items */}
//           <Box sx={{ 
//             marginTop: 'auto', 
//             width: '100%', 
//             pb: 2,
//             pt: 2,
//             borderTop: '1px solid rgba(0,0,0,0.05)',
//             mt: 2
//           }}>
//             {belowNavItems.map((item) => (
//               <Box 
//                 key={item.label} 
//                 onClick={(e) => {
//                   if (item.isMore) {
//                     handleMoreClick(e);
//                   } else if (item.path) {
//                     handleNavigation(item.path);
//                   }
//                 }}
//                 sx={{ 
//                   p: isCollapsed ? '12px 0' : '12px 12px', 
//                   cursor: 'pointer', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: isCollapsed ? 'center' : 'flex-start', 
//                   borderRadius: '8px', 
//                   margin: '0 8px 4px', 
//                   '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
//                   {item.icon}
//                 </Box>
//                 {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* TABLET SIDEBAR */}
//       {/* ================================ */}
//       {isTablet && (
//         <Box sx={{ 
//           width: '75px', 
//           bgcolor: 'white', 
//           position: 'fixed', 
//           height: '100vh', 
//           borderRight: '1px solid #dbdbdb', 
//           zIndex: 1200, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center' 
//         }}>
//           {/* Logo Section */}
//           <Box sx={{ p: '20px' }}>
//             <img 
//               src={instagram} 
//               alt="Instagram" 
//               style={{ width: '24px', cursor: 'pointer' }} 
//               onClick={() => handleNavigation('/home')} 
//             />
//           </Box>

//           {/* Navigation Items */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
//             {navItems.map((item) => (
//               <IconButton 
//                 key={item.label} 
//                 onClick={() => handleNavigation(item.path)} 
//                 sx={{ margin: '4px 8px' }}
//               >
//                 {item.icon}
//               </IconButton>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* ================================ */}
//       {/* MOBILE NAVIGATION */}
//       {/* ================================ */}
//       {isSmallScreen && (
//         <>
//           {/* Top App Bar */}
//           <AppBar
//             position="fixed"
//             sx={{
//               top: 0,
//               bgcolor: 'white',
//               color: 'black',
//               zIndex: 1300,
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               borderBottom: '1px solid #dbdbdb',
//             }}
//           >
//             <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
//               {/* Logo */}
//               <img
//                 src={instagram}
//                 alt="Instagram"
//                 style={{ width: '103px', cursor: 'pointer', height: 'auto' }}
//                 onClick={() => handleNavigation('/home')}
//               />
//               <Box sx={{ flexGrow: 1 }} />
              
//               {/* Right Side Icons */}
//               <IconButton onClick={() => handleNotificationToggle()}>
//                 <FavoriteBorderOutlinedIcon />
//               </IconButton>
//               <IconButton onClick={() => handleNavigation('/messages')}>
//                 <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />
//               </IconButton>
//             </Toolbar>
//           </AppBar>

//           {/* Bottom Navigation */}
//           <BottomNavigation
//             value={activeTab}
//             onChange={handleMobileNavChange}
//             showLabels={false}
//             sx={{
//               position: 'fixed',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               padding: 0,
//               margin: 0,
//               width: '100%',
//               maxWidth:'614px',
//               display: 'flex',
//               height: '50px',
//               zIndex: 1300,
//               borderTop: '1px solid #dbdbdb',
//               backgroundColor: 'white',
//             }}
//           >
//             {mobileNavItems.map((item, index) => (
//               <BottomNavigationAction
//                 key={`${item.label}-${index}`}
//                 icon={React.cloneElement(item.icon, {
//                   style: {
//                     ...item.icon.props.style,
//                     fontSize: '24px',
//                     width: '24px',
//                     height: '24px',
//                   },
//                 })}
//                 sx={{ color: '#262626', '&.Mui-selected': { color: '#000' } }}
//               />
//             ))}
//           </BottomNavigation>

//           {/* Mobile Content Spacing Styles */}
//           <style jsx global>{`
//             .mobile-content {
//               margin-top: 56px;
//               margin-bottom: 50px;
//               min-height: calc(100vh - 106px);
//             }
//           `}</style>
//         </>
//       )}

//       {/* ================================ */}
//       {/* SIDEBARS & OVERLAYS */}
//       {/* ================================ */}
//       <SearchSidebar 
//         open={openSearch} 
//         onClose={() => { 
//           setOpenSearch(false); 
//           setIsCollapsed(false); 
//         }} 
//       />
//       <NotificationSidebar 
//         open={openNotification} 
//         onClose={() => setOpenNotification(false)} 
//       />

//       {/* ================================ */}
//       {/* MORE MENU POPOVER */}
//       {/* ================================ */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleMoreClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
//         transformOrigin={{ vertical: 'bottom', horizontal: 'left'}}
//         disableScrollLock={true}
//         PaperProps={{
//           sx: { 
//             borderRadius: 3, 
//             p: 1, 
//             minWidth: 200,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//             border: '1px solid #dbdbdb'
//           },
//         }}
//         sx={{
//           '& .MuiBackdrop-root': {
//             backgroundColor: 'transparent'
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Settings
//           </Button>
//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Your activity
//           </Button>
//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Saved
//           </Button>
//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Switch appearance
//           </Button>
//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Report a problem
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
//             onClick={handleMoreClose}
//           >
//             Switch accounts
//           </Button>

//           <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

//           <Button 
//             sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }} 
//             onClick={handleLogoutClick}
//           >
//             Log out
//           </Button>
//         </Box>
//       </Popover>

//       {/* ================================ */}
//       {/* LOGOUT CONFIRMATION DIALOG */}
//       {/* ================================ */}
//       <Dialog 
//         open={openLogoutConfirm} 
//         onClose={handleLogoutCancel} 
//         maxWidth="sm" 
//         fullWidth
//       >
//         <DialogTitle sx={{ textAlign: 'center' }}>
//           Log Out?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ textAlign: 'center' }}>
//             Are you sure you want to log out of your account?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
//           <Button 
//             onClick={handleLogoutCancel} 
//             variant="outlined" 
//             sx={{ minWidth: '100px' }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleLogoutConfirm} 
//             color="error" 
//             variant="contained" 
//             sx={{ minWidth: '100px' }}
//           >
//             Log Out
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================================ */}
//       {/* TOAST NOTIFICATIONS */}
//       {/* ================================ */}
//       <ToastContainer 
//         position="top-center" 
//         autoClose={3000} 
//         hideProgressBar={false} 
//         newestOnTop 
//         closeOnClick 
//         pauseOnHover 
//         style={{ zIndex: 9999 }} 
//       />
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Popover,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ================================
// ASSET IMPORTS
// ================================
import instagram from '../Assets/Instagram-Logo.png';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ProfileIcon from '@mui/icons-material/Person';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';

import SearchSidebar from './SearchSidebar';
import NotificationSidebar from './NotificationSidebar';
import '../Style/Navbar.css';

// ================================
// NAVIGATION CONFIGURATION
// ================================
const navItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Search', icon: <SearchIcon />, isSearch: true },
  { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
  { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
  { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
  { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, isNotification: true },
  { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
  { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
];

const belowNavItems = [
  { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
  { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
  { label: 'More', icon: <MenuOutlinedIcon />, isMore: true },
];

const mobileNavItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Search', icon: <SearchIcon />, isSearch: true },
  { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
  { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
  { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
];

// ================================
// MAIN COMPONENT
// ================================
const Navbar = () => {
  // ================================
  // STATE MANAGEMENT
  // ================================
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ================================
  // HOOKS & NAVIGATION
  // ================================
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const location = useLocation();

  // ================================
  // EFFECTS
  // ================================
  useEffect(() => {
    if (isMobile || isSmallScreen) {
      const currentPath = location.pathname;
      const mobileNavIndex = mobileNavItems.findIndex((item) => {
        if (item.path === currentPath) return true;
        if (item.isSearch && (currentPath.includes('/search') || openSearch)) return true;
        return false;
      });
      setActiveTab(mobileNavIndex !== -1 ? mobileNavIndex : 0);
    }
  }, [location.pathname, isMobile, isSmallScreen, openSearch]);

  // ================================
  // EVENT HANDLERS
  // ================================
  
  // Search Toggle Handler
  const handleSearchToggle = () => {
    const newSearchState = !openSearch;
    setOpenSearch(newSearchState);
    setIsCollapsed(newSearchState);
    if (newSearchState && openNotification) setOpenNotification(false);
  };

  // Notification Toggle Handler
  const handleNotificationToggle = () => {
    const newNotificationState = !openNotification;
    setOpenNotification(newNotificationState);
    if (newNotificationState && openSearch) {
      setOpenSearch(false);
      setIsCollapsed(false);
    }
  };

  // More Menu Handlers
  const handleMoreClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => setAnchorEl(null);

  // Logout Handlers
  const handleLogoutClick = () => {
    setOpenLogoutConfirm(true);
    handleMoreClose();
  };

  const handleLogoutConfirm = () => {
    try {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userSession');
      setOpenLogoutConfirm(false);
      toast.success('Logged out successfully!', { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/login', { replace: true }), 2100);
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error logging out. Please try again.', { position: 'top-center', autoClose: 3000 });
    }
  };

  const handleLogoutCancel = () => setOpenLogoutConfirm(false);

  // Navigation Handler
  const handleNavigation = (path) => {
    if (path && typeof path === 'string') {
      try {
        navigate(path);
      } catch (error) {
        console.error('Navigation error:', error);
        toast.error('Navigation failed. Please try again.', { position: 'top-center', autoClose: 2000 });
      }
    }
  };

  // Mobile Navigation Handler
  const handleMobileNavChange = (event, newValue) => {
    if (newValue < 0 || newValue >= mobileNavItems.length) return;
    setActiveTab(newValue);
    const item = mobileNavItems[newValue];
    if (item.isSearch) handleSearchToggle();
    else if (item.path) handleNavigation(item.path);
  };

  // ================================
  // COMPUTED VALUES
  // ================================
  const sidebarWidth = isCollapsed ? '75px' : '245px';

  // ================================
  // RENDER FUNCTIONS
  // ================================
  return (
    <>
      {/* ================================ */}
      {/* GLOBAL MOBILE STYLES */}
      {/* ================================ */}
      {isSmallScreen && (
        <style jsx global>{`
          body {
            padding-top: 56px;
            padding-bottom: 50px;
          }
          .mobile-content {
            margin-top: 56px;
            margin-bottom: 50px;
            min-height: calc(100vh - 106px);
          }
        `}</style>
      )}

      {/* ================================ */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================ */}
      {!isMobile && !isTablet && (
        <Box sx={{ 
          width: sidebarWidth, 
          bgcolor: 'white', 
          position: 'fixed', 
          height: '100vh', 
          borderRight: '1px solid #dbdbdb', 
          zIndex: 1200, 
          transition: 'width 0.3s ease', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo Section */}
          <Box sx={{ 
            p: isCollapsed ? '25px 0' : '25px 24px', 
            textAlign: isCollapsed ? 'center' : 'left' 
          }}>
            <img 
              src={instagram} 
              alt="Instagram" 
              style={{ 
                width: isCollapsed ? '24px' : '103px', 
                cursor: 'pointer', 
                transition: 'width 0.3s ease' 
              }} 
              onClick={() => handleNavigation('/home')} 
            />
          </Box>

          {/* Main Navigation Items */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            flex: 1,
            overflow: 'auto',
            // Hide scrollbar for all browsers
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',  // IE and Edge
            'scrollbar-width': 'none'      // Firefox
          }}>
            {navItems.map((item) => (
              <Box
                key={item.label}
                onClick={() => {
                  if (item.isSearch) handleSearchToggle();
                  else if (item.isNotification) handleNotificationToggle();
                  else if (item.path) handleNavigation(item.path);
                }}
                sx={{
                  p: isCollapsed ? '12px 0' : '12px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  borderRadius: '8px',
                  margin: '0 8px',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
                  {item.icon}
                </Box>
                {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
              </Box>
            ))}
          </Box>

          {/* Bottom Navigation Items */}
          <Box sx={{ 
            marginTop: 'auto', 
            width: '100%', 
            pb: 2,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.05)',
            mt: 2
          }}>
            {belowNavItems.map((item) => (
              <Box 
                key={item.label} 
                onClick={(e) => {
                  if (item.isMore) {
                    handleMoreClick(e);
                  } else if (item.path) {
                    handleNavigation(item.path);
                  }
                }}
                sx={{ 
                  p: isCollapsed ? '12px 0' : '12px 12px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: isCollapsed ? 'center' : 'flex-start', 
                  borderRadius: '8px', 
                  margin: '0 8px 4px', 
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
                  {item.icon}
                </Box>
                {!isCollapsed && <Typography sx={{ ml: 2 }}>{item.label}</Typography>}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ================================ */}
      {/* TABLET SIDEBAR */}
      {/* ================================ */}
      {isTablet && (
        <Box sx={{ 
          width: '75px', 
          bgcolor: 'white', 
          position: 'fixed', 
          height: '100vh', 
          borderRight: '1px solid #dbdbdb', 
          zIndex: 1200, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          {/* Logo Section */}
          <Box sx={{ p: '20px' }}>
            <img 
              src={instagram} 
              alt="Instagram" 
              style={{ width: '24px', cursor: 'pointer' }} 
              onClick={() => handleNavigation('/home')} 
            />
          </Box>

          {/* Navigation Items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            {navItems.map((item) => (
              <IconButton 
                key={item.label} 
                onClick={() => handleNavigation(item.path)} 
                sx={{ margin: '4px 8px' }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      )}

      {/* ================================ */}
      {/* MOBILE NAVIGATION */}
      {/* ================================ */}
      {isSmallScreen && (
        <>
          {/* Top App Bar */}
          <AppBar
            position="fixed"
            sx={{
              top: 0,
              bgcolor: 'white',
              color: 'black',
              zIndex: 1300,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderBottom: '1px solid #dbdbdb',
            }}
          >
            <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
              {/* Logo */}
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: '103px', cursor: 'pointer', height: 'auto' }}
                onClick={() => handleNavigation('/home')}
              />
              <Box sx={{ flexGrow: 1 }} />
              
              {/* Right Side Icons */}
              <IconButton onClick={() => handleNotificationToggle()}>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => handleNavigation('/messages')}>
                <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Bottom Navigation */}
          <BottomNavigation
            value={activeTab}
            onChange={handleMobileNavChange}
            showLabels={false}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 0,
              margin: 0,
              width: '100%',
              display: 'flex',
              height: '50px',
              zIndex: 1300,
              borderTop: '1px solid #dbdbdb',
              backgroundColor: 'white',
              // Ensure proper spacing on very small screens
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                padding: '6px 4px',
                flex: 1,
              }
            }}
          >
            {mobileNavItems.map((item, index) => (
              <BottomNavigationAction
                key={`${item.label}-${index}`}
                icon={React.cloneElement(item.icon, {
                  style: {
                    ...item.icon.props.style,
                    fontSize: '20px',
                    width: '20px',
                    height: '20px',
                  },
                })}
                sx={{ 
                  color: '#262626', 
                  '&.Mui-selected': { color: '#000' },
                  minWidth: 'auto',
                  padding: '6px 2px',
                  flex: 1
                }}
              />
            ))}
          </BottomNavigation>

          {/* Mobile Content Spacing Styles */}
          <style jsx global>{`
            .mobile-content {
              margin-top: 56px;
              margin-bottom: 50px;
              min-height: calc(100vh - 106px);
            }
          `}</style>
        </>
      )}

      {/* ================================ */}
      {/* SIDEBARS & OVERLAYS */}
      {/* ================================ */}
      <SearchSidebar 
        open={openSearch} 
        onClose={() => { 
          setOpenSearch(false); 
          setIsCollapsed(false); 
        }} 
      />
      <NotificationSidebar 
        open={openNotification} 
        onClose={() => setOpenNotification(false)} 
      />

      {/* ================================ */}
      {/* MORE MENU POPOVER */}
      {/* ================================ */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMoreClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left'}}
        disableScrollLock={true}
        PaperProps={{
          sx: { 
            borderRadius: 3, 
            p: 1, 
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #dbdbdb'
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Settings
          </Button>
          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Your activity
          </Button>
          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Saved
          </Button>
          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Switch appearance
          </Button>
          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Report a problem
          </Button>

          <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }}
            onClick={handleMoreClose}
          >
            Switch accounts
          </Button>

          <Box sx={{ borderTop: '1px solid #dbdbdb', my: 1 }} />

          <Button 
            sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5, px: 2 }} 
            onClick={handleLogoutClick}
          >
            Log out
          </Button>
        </Box>
      </Popover>

      {/* ================================ */}
      {/* LOGOUT CONFIRMATION DIALOG */}
      {/* ================================ */}
      <Dialog 
        open={openLogoutConfirm} 
        onClose={handleLogoutCancel} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Log Out?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center' }}>
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 3 }}>
          <Button 
            onClick={handleLogoutCancel} 
            variant="outlined" 
            sx={{ minWidth: '100px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm} 
            color="error" 
            variant="contained" 
            sx={{ minWidth: '100px' }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================ */}
      {/* TOAST NOTIFICATIONS */}
      {/* ================================ */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
        style={{ zIndex: 9999 }} 
      />
    </>
  );
};

export default Navbar;