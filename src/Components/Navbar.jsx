// import React, { useState } from 'react';
// import { Box } from '@mui/material';
// import { Link } from 'react-router-dom';

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
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';

// import SearchSidebar from './SearchSidebar';
// import '../Style/Navbar.css';

// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ height: 31, fill: 'black' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ height: 31, fill: 'black' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, path: '/notifications' },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ height: 31, fill: 'black' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, path: '/more' },
// ];

// const Navbar = () => {
//   const [openSearch, setOpenSearch] = useState(false);

//   return (
//     <>
//       <Box
//         sx={{
//           flex: 0.35,
//           bgcolor: 'white',
//           color: 'black',
//           alignItems: 'center',
//           display: { xs: 'none', sm: 'none', md: 'flex' },
//           height: '100vh',
//           position: 'fixed',
//           borderRight: '1px solid #ddd',
//           width: openSearch ? '75px' : '245px',
//           transition: 'width 0.3s ease',
//           zIndex: 20
//         }}
//       >
//         <Box width="100%">
//           <Box sx={{ padding: '25px 20px' }}>
//             <img src={instagram} alt="Instagram Logo" style={{ width: openSearch ? '30px' : '103px', cursor: 'pointer', transition: '0.3s' }} />
//           </Box>

//           <Box className="navlinkpart" sx={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'black' }}>
//             {navItems.map(({ label, icon, path, isSearch }) => (
//               <Box
//                 key={label}
//                 className="navlink"
//                 onClick={() => {
//                   if (isSearch) setOpenSearch(true);
//                 }}
//                 component={isSearch ? 'div' : Link}
//                 to={isSearch ? undefined : path}
//               >
//                 <Box sx={{ marginRight: '9px', display: 'flex', alignItems: 'center', fontSize: '31px', color: 'black' }}>
//                   {icon}
//                 </Box>
//                 {!openSearch && <Box className="navname">{label}</Box>}
//               </Box>
//             ))}

//             <Box className="belowpart">
//               {belowNavItems.map(({ label, icon, path }) => (
//                 <Link key={label} to={path} className="navlink">
//                   <Box sx={{ marginRight: '9px', display: 'flex', alignItems: 'center', fontSize: '31px', color: 'black' }}>
//                     {icon}
//                   </Box>
//                   {!openSearch && <Box className="navname">{label}</Box>}
//                 </Link>
//               ))}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <SearchSidebar open={openSearch} onClose={() => setOpenSearch(false)} />
//     </>
//   );
// };

// export default Navbar;

// import React, { useState } from 'react';
// import { Box, IconButton, useMediaQuery, useTheme, BottomNavigation, BottomNavigationAction,Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import instagram from '../Assets/Instagram-Logo.png';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
// import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
// import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import ProfileIcon from '@mui/icons-material/Person';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import SearchSidebar from './SearchSidebar';
// import '../Style/Navbar.css';

// const navItems = [
//   { label: 'Home', icon: <HomeIcon />, path: '/home' },
//   { label: 'Search', icon: <SearchIcon />, isSearch: true },
//   { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
//   { label: 'Reels', icon: <ReelsIcon style={{ height: 31, fill: 'black' }} />, path: '/reels' },
//   { label: 'Messages', icon: <MessageIcon style={{ height: 31, fill: 'black' }} />, path: '/messages' },
//   { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, path: '/notifications' },
//   { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
//   { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
// ];

// const belowNavItems = [
//   { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
//   { label: 'Threads', icon: <ThreadsIcon style={{ height: 31, fill: 'black' }} />, path: '/threads' },
//   { label: 'More', icon: <MenuOutlinedIcon />, path: '/more' },
// ];

// const Navbar = () => {
//   const [openSearch, setOpenSearch] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const [activeTab, setActiveTab] = useState(0);

//   const handleSearchToggle = () => {
//     setOpenSearch(true);
//   };

//   const handleCloseSearch = () => {
//     setOpenSearch(false);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <>
//       {/* Sidebar for md and up */}
//       {!isMobile && (
//         <Box
//           sx={{
//             flex: 0.35,
//             bgcolor: 'white',
//             color: '#262626',
//             display: 'flex',
//             height: '100vh',
//             position: 'fixed',
//             borderRight: '1px solid #dbdbdb',
//             width: openSearch ? '75px' : '245px',
//             transition: 'width 0.3s ease',
//             zIndex: 20,
//             overflow: 'hidden',
//           }}
//         >
//           <Box width="100%">
//             <Box sx={{ padding: '25px 20px', display: 'flex', justifyContent: openSearch ? 'center' : 'flex-start' }}>
//               <img
//                 src={instagram}
//                 alt="Instagram Logo"
//                 style={{
//                   width: openSearch ? '30px' : '103px',
//                   cursor: 'pointer',
//                   transition: 'width 0.3s ease',
//                 }}
//               />
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', color: '#262626', padding: '0 10px' }}>
//               {navItems.map(({ label, icon, path, isSearch }, index) => (
//                 <Box
//                   key={label}
//                   className="navlink"
//                   onClick={() => {
//                     if (isSearch) handleSearchToggle();
//                   }}
//                   component={isSearch ? 'div' : Link}
//                   to={isSearch ? undefined : path}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '8px 12px',
//                     borderRadius: '8px',
//                     '&:hover': { bgcolor: '#fafafa' },
//                     bgcolor: activeTab === index && !isSearch ? '#e9ecef' : 'transparent',
//                     cursor: 'pointer',
//                   }}
//                   aria-label={`${label} navigation`}
//                 >
//                   <Box sx={{ marginRight: openSearch ? 0 : '12px', fontSize: '24px' }}>
//                     {React.isValidElement(icon) ? React.cloneElement(icon, { sx: { color: '#262626' } }) : icon}
//                   </Box>
//                   {!openSearch && (
//                     <Typography
//                       className="navname"
//                       sx={{ fontSize: '14px', fontWeight: 500, color: '#262626' }}
//                     >
//                       {label}
//                     </Typography>
//                   )}
//                 </Box>
//               ))}

//               <Box sx={{ marginTop: 'auto' }}>
//                 {belowNavItems.map(({ label, icon, path }, index) => (
//                   <Link
//                     key={label}
//                     to={path}
//                     className="navlink"
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '8px 12px',
//                       borderRadius: '8px',
//                       '&:hover': { bgcolor: '#fafafa' },
//                       bgcolor: activeTab === navItems.length + index ? '#e9ecef' : 'transparent',
//                       textDecoration: 'none',
//                       cursor: 'pointer',
//                     }}
//                     aria-label={`${label} navigation`}
//                   >
//                     <Box sx={{ marginRight: openSearch ? 0 : '12px', fontSize: '24px' }}>
//                       {React.isValidElement(icon) ? React.cloneElement(icon, { sx: { color: '#262626' } }) : icon}
//                     </Box>
//                     {!openSearch && (
//                       <Typography
//                         className="navname"
//                         sx={{ fontSize: '14px', fontWeight: 500, color: '#262626' }}
//                       >
//                         {label}
//                       </Typography>
//                     )}
//                   </Link>
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Bottom Navigation for sm and xs */}
//       {isSmallScreen && (
//         <BottomNavigation
//           value={activeTab}
//           onChange={handleTabChange}
//           sx={{ width: '100%', position: 'fixed', bottom: 0, bgcolor: 'white', borderTop: '1px solid #dbdbdb', zIndex: 20 }}
//         >
//           {navItems.map((item, index) => (
//             <BottomNavigationAction
//               key={item.label}
//               label={item.label}
//               icon={React.isValidElement(item.icon) ? React.cloneElement(item.icon, { sx: { color: '#262626' } }) : item.icon}
//               component={item.isSearch ? 'div' : Link}
//               to={item.isSearch ? undefined : item.path}
//               onClick={() => item.isSearch && handleSearchToggle()}
//               sx={{ color: '#262626', '&.Mui-selected': { color: '#0095f6' } }}
//             />
//           ))}
//         </BottomNavigation>
//       )}

//       <SearchSidebar open={openSearch} onClose={handleCloseSearch} />
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Box,  useMediaQuery, useTheme, BottomNavigation, BottomNavigationAction,Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import instagram from '../Assets/Instagram-Logo.png';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { ReactComponent as ReelsIcon } from '../Assets/instagram-reels-icon (1).svg';
import { ReactComponent as MessageIcon } from '../Assets/facebook-messenger-black-icon.svg';
import { ReactComponent as ThreadsIcon } from '../Assets/threads-icon.svg';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ProfileIcon from '@mui/icons-material/Person';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchSidebar from './SearchSidebar';
import '../Style/Navbar.css';

const navItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Search', icon: <SearchIcon />, isSearch: true },
  { label: 'Explore', icon: <ExploreOutlinedIcon />, path: '/explore' },
  { label: 'Reels', icon: <ReelsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/reels' },
  { label: 'Messages', icon: <MessageIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/messages' },
  { label: 'Notifications', icon: <FavoriteBorderOutlinedIcon />, path: '/notifications' },
  { label: 'Create', icon: <AddBoxOutlinedIcon />, path: '/createpost' },
  { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
];

const belowNavItems = [
  { label: 'Meta AI', icon: <CircleOutlinedIcon />, path: '/meta-ai' },
  { label: 'Threads', icon: <ThreadsIcon style={{ width: 24, height: 24, fill: '#262626' }} />, path: '/threads' },
  { label: 'More', icon: <MenuOutlinedIcon />, path: '/more' },
];

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);

  const handleSearchToggle = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* Sidebar for md and up */}
      {!isMobile && (
        <Box
          sx={{
            flex: 0.35,
            bgcolor: 'white',
            color: '#262626',
            display: 'flex',
            height: '100vh',
            position: 'fixed',
            borderRight: '1px solid #dbdbdb',
            width: openSearch ? '75px' : '245px',
            transition: 'width 0.3s ease-in-out',
            zIndex: 20,
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <Box width="100%">
            <Box sx={{ padding: '20px', display: 'flex', justifyContent: openSearch ? 'center' : 'flex-start', borderBottom: '1px solid #dbdbdb' }}>
              <img
                src={instagram}
                alt="Instagram Logo"
                style={{
                  width: openSearch ? '30px' : '103px',
                  cursor: 'pointer',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#262626', padding: '10px 12px', pt: 2 }}>
              {navItems.map(({ label, icon, path, isSearch }, index) => (
                <Box
                  key={label}
                  className="navlink"
                  onClick={() => {
                    if (isSearch) handleSearchToggle();
                  }}
                  component={isSearch ? 'div' : Link}
                  to={isSearch ? undefined : path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    // '&:hover': { bgcolor: '#fafafa', transition: 'all 0.2s' },
                    // bgcolor: activeTab === index && !isSearch ? '#e9ecef' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  aria-label={`${label} navigation`}
                >
                  <Box sx={{ marginRight: openSearch ? 0 : '16px', fontSize: '24px' }}>
                    {React.isValidElement(icon) ? React.cloneElement(icon, { sx: { fontSize: 24, color: '#262626' } }) : icon}
                  </Box>
                  {!openSearch && (
                    <Typography
                      className="navname"
                      sx={{ fontSize: '16px', fontWeight: 600, color: '#262626' }}
                    >
                      {label}
                    </Typography>
                  )}
                </Box>
              ))}

              <Box sx={{ marginTop: 'auto', mt: 4 }}>
                {belowNavItems.map(({ label, icon, path }, index) => (
                  <Link
                    key={label}
                    to={path}
                    className="navlink"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      // '&:hover': { bgcolor: '#fafafa', transition: 'all 0.2s' },
                      // bgcolor: activeTab === navItems.length + index ? '#e9ecef' : 'transparent',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    aria-label={`${label} navigation`}
                  >
                    <Box sx={{ marginRight: openSearch ? 0 : '16px', fontSize: '24px' }}>
                      {React.isValidElement(icon) ? React.cloneElement(icon, { sx: { fontSize: 24, color: '#262626' } }) : icon}
                    </Box>
                    {!openSearch && (
                      <Typography
                        className="navname"
                        sx={{ fontSize: '16px', fontWeight: 600, color: '#262626' }}
                      >
                        {label}
                      </Typography>
                    )}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Bottom Navigation for sm and xs */}
      {isSmallScreen && (
        <BottomNavigation
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            bgcolor: 'white',
            borderTop: '1px solid #dbdbdb',
            zIndex: 20,
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={React.isValidElement(item.icon) ? React.cloneElement(item.icon, { sx: { fontSize: 24, color: '#262626' } }) : item.icon}
              component={item.isSearch ? 'div' : Link}
              to={item.isSearch ? undefined : item.path}
              onClick={() => item.isSearch && handleSearchToggle()}
              sx={{
                color: '#262626',
                '&.Mui-selected': { color: '#0095f6' },
                minWidth: 0,
                padding: '6px 12px',
              }}
            />
          ))}
        </BottomNavigation>
      )}

      <SearchSidebar open={openSearch} onClose={handleCloseSearch} />
    </>
  );
};

export default Navbar;