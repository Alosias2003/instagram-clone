// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Avatar,
//   CircularProgress,
//   InputBase,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
// import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
// import { motion, AnimatePresence } from 'framer-motion';

// const dummyUsers = [
//   { username: 'ronaldo_cr7', name: 'Cristiano Ronaldo' },
//   { username: 'messi_leo', name: 'Lionel Messi' },
//   { username: 'neymarjr', name: 'Neymar Jr' },
//   { username: 'realmadrid', name: 'Real Madrid' },
//   { username: 'fcb', name: 'FC Barcelona' },
// ];

// const SearchSidebar = ({ open, onClose }) => {
//   const [recent, setRecent] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
//     setRecent(stored);
//   }, [open]);

//   useEffect(() => {
//     localStorage.setItem('recentSearches', JSON.stringify(recent));
//   }, [recent]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setLoading(true);
//     setTimeout(() => {
//       const filtered = dummyUsers.filter(user =>
//         user.username.toLowerCase().includes(value.toLowerCase()) ||
//         user.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filtered);
//       setLoading(false);
//     }, 600);
//   };

//   const handleEnter = (e) => {
//     if (e.key === 'Enter' && searchTerm.trim()) {
//       const updated = [searchTerm, ...recent.filter(term => term !== searchTerm)].slice(0, 10);
//       setRecent(updated);
//       setSearchTerm('');
//       setResults([]);
//     }
//   };

//   const handleRemoveRecent = (item) => {
//     setRecent(prev => prev.filter(term => term !== item));
//   };

//   if (!open) return null;

//   return (
//     <>
//       <Box
//         onClick={onClose}
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           bgcolor: 'rgba(0,0,0,0.3)',
//           zIndex: 10,
//         }}
//       />
//       <motion.div
//         initial={{ x: '-100%' }}
//         animate={{ x: 0 }}
//         exit={{ x: '-100%' }}
//         transition={{ duration: 0.3 }}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           zIndex: 11,
//         }}
//       >
//         <Box
//           sx={{
//             width: isMobile ? '100vw' : '400px',
//             height: '100vh',
//             bgcolor: 'white',
//             px: 3,
//             py: 2,
//             overflowY: 'auto',
//             boxSizing: 'border-box',
//             position: 'relative',
//           }}
//         >
//           {/* Close Button */}
//           <IconButton
//             onClick={onClose}
//             sx={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '20px', mb: 2 }}>
//             Search
//           </Typography>

//           {/* Instagram-like Search Bar */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               bgcolor: '#efefef',
//               borderRadius: '10px',
//               px: 2,
//               py: 1,
//             }}
//           >
//             <SearchIcon sx={{ color: 'gray', mr: 1 }} />
//             <InputBase
//               placeholder="Search"
//               fullWidth
//               value={searchTerm}
//               onChange={handleSearch}
//               onKeyDown={handleEnter}
//               sx={{ fontSize: '14px' }}
//             />
//           </Box>

//           {/* Search Results or Recent */}
//           {loading ? (
//             <Box mt={3} display="flex" justifyContent="center">
//               <CircularProgress size={25} />
//             </Box>
//           ) : searchTerm && results.length > 0 ? (
//             <Box mt={3}>
//               {results.map((user, i) => (
//                 <Box key={i} display="flex" alignItems="center" my={1}>
//                   <Avatar sx={{ mr: 2 }}>{user.username[0]}</Avatar>
//                   <Box>
//                     <Typography fontWeight="500">{user.name}</Typography>
//                     <Typography fontSize="13px" color="gray">@{user.username}</Typography>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           ) : searchTerm ? (
//             <Typography mt={2} color="gray">No results found.</Typography>
//           ) : (
//             <>
//               <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="subtitle1" fontWeight="bold">Recent</Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ color: '#0095f6', cursor: 'pointer' }}
//                   onClick={() => setRecent([])}
//                 >
//                   Clear all
//                 </Typography>
//               </Box>

//               {recent.length === 0 ? (
//                 <Typography mt={2} color="gray">No recent searches</Typography>
//               ) : (
//                 <Box mt={2}>
//                   <AnimatePresence>
//                     {recent.map((item, i) => (
//                       <motion.div
//                         key={item}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           my={1}
//                         >
//                           <Typography>{item}</Typography>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleRemoveRecent(item)}
//                           >
//                             <ClearIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </Box>
//               )}
//             </>
//           )}
//         </Box>
//       </motion.div>
//     </>
//   );
// };

// export default SearchSidebar;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   IconButton,
//   Typography,
//   InputBase,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
// import { motion, AnimatePresence } from 'framer-motion';

// const SearchSidebar = ({ open, onClose }) => {
//   const [recent, setRecent] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
//     setRecent(stored);
//   }, [open]);

//   useEffect(() => {
//     localStorage.setItem('recentSearches', JSON.stringify(recent));
//   }, [recent]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     // Simulate search delay
//     setTimeout(() => {
//       const filtered = [
//         { username: 'ishowspeed', name: 'iShowSpeed' },
//         { username: 'vidoememes.vm', name: 'Video Memes' },
//         { username: 'ramos_goal', name: 'Sergio Ramos' },
//       ].filter(user =>
//         user.username.toLowerCase().includes(value.toLowerCase()) ||
//         user.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filtered);
//     }, 500);
//   };

//   const handleEnter = (e) => {
//     if (e.key === 'Enter' && searchTerm.trim()) {
//       const updated = [searchTerm, ...recent.filter(term => term !== searchTerm)].slice(0, 5);
//       setRecent(updated);
//       setSearchTerm('');
//       setResults([]);
//     }
//   };

//   const handleRemoveRecent = (item) => {
//     setRecent(prev => prev.filter(term => term !== item));
//   };

//   if (!open) return null;

//   return (
//     <>
//       <Box
//         onClick={onClose}
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           bgcolor: 'rgba(0,0,0,0.5)',
//           zIndex: 1000,
//         }}
//       />
//       <motion.div
//         initial={{ x: '-100%' }}
//         animate={{ x: 0 }}
//         exit={{ x: '-100%' }}
//         transition={{ duration: 0.3 }}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           zIndex: 1001,
//           width: isMobile ? '100vw' : '350px',
//           height: '100vh',
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: 'white',
//             height: '100%',
//             px: 3,
//             py: 2,
//             overflowY: 'auto',
//             boxSizing: 'border-box',
//           }}
//         >
//           {/* Close Button */}
//           <IconButton
//             onClick={onClose}
//             sx={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Box sx={{mt:5}}></Box>
//           {/* Search Bar */}
//           <Box
//             sx={{
//               mb: 7,
//               display: 'flex',
//               alignItems: 'center',
//               bgcolor: '#fafafa',
            
//               border: '1px solid #dbdbdb',
//               borderRadius: '8px',
//               px: 2,
//               py: 1,
//               width: '100%',
//               maxWidth: '300px',
//               margin: '0 auto',
             
            
            
//             }}
//           >
//             <SearchIcon sx={{ color: '#8e8e8e', mr: 1 }} />
//             <InputBase
//               placeholder="Search"
//               fullWidth
//               value={searchTerm}
//               onChange={handleSearch}
//               onKeyDown={handleEnter}
//               sx={{
//                 fontSize: '14px',
//                 color: '#262626',
//               }}
//             />
//           </Box>

//           {/* Recent Searches or Results */}
//           <Box sx={{ mt: 2 }}>
//             {!searchTerm && (
//               <>
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                   <Typography variant="subtitle1" fontWeight="bold" color="#262626">
//                     Recent
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="#0095f6"
//                     sx={{ cursor: 'pointer', fontSize: '14px' }}
//                     onClick={() => setRecent([])}
//                   >
//                     Clear all
//                   </Typography>
//                 </Box>
//                 {recent.length === 0 ? (
//                   <Typography mt={2} color="#8e8e8e" fontSize="14px">
//                     No recent searches
//                   </Typography>
//                 ) : (
//                   <Box mt={1}>
//                     {recent.map((item, index) => (
//                       <Box
//                         key={index}
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         sx={{ py: 1, borderBottom: '1px solid #dbdbdb' }}
//                       >
//                         <Box display="flex" alignItems="center">
//                           <Box
//                             sx={{
//                               width: '24px',
//                               height: '24px',
//                               borderRadius: '50%',
//                               bgcolor: '#dbdbdb',
//                               mr: 2,
//                             }}
//                           />
//                           <Typography fontSize="14px" color="#262626">
//                             {item}
//                           </Typography>
//                         </Box>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleRemoveRecent(item)}
//                           sx={{ p: 0.5 }}
//                         >
//                           <ClearIcon sx={{ color: '#8e8e8e', fontSize: '16px' }} />
//                         </IconButton>
//                       </Box>
//                     ))}
//                   </Box>
//                 )}
//               </>
//             )}
//             {searchTerm && results.length > 0 && (
//               <Box mt={1}>
//                 {results.map((user, index) => (
//                   <Box
//                     key={index}
//                     display="flex"
//                     alignItems="center"
//                     sx={{ py: 1, borderBottom: '1px solid #dbdbdb' }}
//                   >
//                     <Box
//                       sx={{
//                         width: '24px',
//                         height: '24px',
//                         borderRadius: '50%',
//                         bgcolor: '#dbdbdb',
//                         mr: 2,
//                       }}
//                     />
//                     <Typography fontSize="14px" color="#262626">
//                       {user.name} (@{user.username})
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//             {searchTerm && results.length === 0 && (
//               <Typography mt={2} color="#8e8e8e" fontSize="14px">
//                 No results found
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </motion.div>
//     </>
//   );
// };

// export default SearchSidebar;


import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchSidebar = ({ open, onClose }) => {
  const [recent, setRecent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecent(stored);
  }, [open]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recent));
  }, [recent]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Simulate API search
    const filtered = [
      { username: 'ishowspeed', name: 'iShowSpeed' },
      { username: 'vidoememes_vm', name: 'Video Memes' },
      { username: 'ramos_goal', name: 'Sergio Ramos' },
    ].filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  if (!open) return null;

  return (
    <>
    
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1200,
        }}
      />
      
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isMobile ? '100vw' : 350,
          height: '100vh',
          bgcolor: 'white',
          zIndex: 1201,
          p: 2,
          overflowY: 'auto',
        }}
       
      >
        <Box sx={{display:{xl:'none',lg:'none',md:'none',sm:'block',xs:'block'},height:'42px',bgcolor:'red'}}>space</Box>
         {/* <Box sx={{height:{xs:'100px'},bgcolor:'yellow'}}></Box> */}
        
        {/* Close button */}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>


        {/* Search bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fafafa',
            borderRadius: 1,
            p: 1,
            mt: 5,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: '#8e8e8e' }} />
          <InputBase
            placeholder="Search"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ fontSize: '14px' }}
          />
        </Box>

        {/* Results or Recent */}
        <Box sx={{ mt: 3 }}>
          {searchTerm ? (
            results.length > 0 ? (
              results.map((user, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#dbdbdb',
                      mr: 2,
                    }}
                  />
                  <Typography>{user.name} (@{user.username})</Typography>
                </Box>
              ))
            ) : (
              <Typography mt={2} color="#8e8e8e" fontSize="14px">
                No results found
              </Typography>
            )
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography fontWeight="bold">Recent</Typography>
                <Typography
                  sx={{ cursor: 'pointer', color: '#0095f6' }}
                  onClick={() => setRecent([])}
                >
                  Clear all
                </Typography>
              </Box>
              {recent.length === 0 ? (
                <Typography color="#8e8e8e" fontSize="14px">
                  No recent searches
                </Typography>
              ) : (
                recent.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <Typography>{item}</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setRecent((prev) => prev.filter((term) => term !== item))
                      }
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchSidebar;
