
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Avatar,
//   Stack,
//   Input,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../Components/cropImage"; // adjust path if needed

// const CLOUDINARY_UPLOAD_PRESET = "dpggrwvvt";
// const CLOUDINARY_CLOUD_NAME = "n5tt5ixs";

// const EditProfile = () => {
//   const [user, setUser] = useState(null);
//   const [fullname, setFullname] = useState("");
//   const [bio, setBio] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [cropping, setCropping] = useState(false);
//   const [openToast, setOpenToast] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (loggedInUser) {
//       setUser(loggedInUser);
//       setFullname(loggedInUser.fullname || "");
//       setBio(loggedInUser.bio || "");
//       setProfilePic(loggedInUser.profilePic || "");
//     }
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 100 * 1024 * 1024) {
//       alert("File size must be less than 100MB");
//       return;
//     }
//     const fileURL = URL.createObjectURL(file);
//     setImageFile(fileURL);
//     setCropping(true);
//   };

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const uploadCroppedImage = async () => {
//     const canvasBlob = await getCroppedImg(imageFile, croppedAreaPixels);
//     const formData = new FormData();
//     formData.append("file", canvasBlob);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//       { method: "POST", body: formData }
//     );

//     const data = await res.json();
//     setProfilePic(data.secure_url);
//     setCropping(false);
//     setOpenToast(true);
//   };

//   const handleSave = () => {
//     if (!user) return;

//     const updatedUser = {
//       ...user,
//       fullname,
//       bio,
//       profilePic,
//     };

//     localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const updatedUsers = users.map((u) =>
//       u.username === user.username ? updatedUser : u
//     );
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     navigate("/profile", { state: { refresh: true } });
//     window.location.reload(); // force reload to update immediately
//   };

//   if (!user) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <Typography variant="h6">Please log in to edit profile.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
//         Edit Profile
//       </Typography>

//       <Stack spacing={3}>
//         <Box textAlign="center">
//           <Avatar
//             src={profilePic}
//             sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
//           />
//           <Button
//             variant="outlined"
//             component="label"
//             size="small"
//             sx={{ fontWeight: "bold", mt: 1 }}
//           >
//             Upload Photo
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               sx={{ display: "none" }}
//             />
//           </Button>
//         </Box>

//         {cropping && imageFile && (
//           <Box sx={{ position: "relative", width: "100%", height: 300 }}>
//             <Cropper
//               image={imageFile}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//             <Button fullWidth variant="contained" onClick={uploadCroppedImage}>
//               Crop & Upload
//             </Button>
//           </Box>
//         )}

//         <TextField
//           label="Full Name"
//           fullWidth
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//         />

//         <TextField
//           label="Bio"
//           fullWidth
//           multiline
//           rows={3}
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleSave}
//           sx={{ backgroundColor: "#0095f6", fontWeight: "bold" }}
//         >
//           Save Changes
//         </Button>
//       </Stack>

//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000}
//         onClose={() => setOpenToast(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="success" variant="filled" onClose={() => setOpenToast(false)}>
//           Profile photo updated!
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default EditProfile;




// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Avatar,
//   Stack,
//   Snackbar,
//   Alert,
//   Paper,
//   IconButton,
//   CircularProgress,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../Components/cropImage";

// const CLOUDINARY_UPLOAD_PRESET = "dpggrwvvt";
// const CLOUDINARY_CLOUD_NAME = "n5tt5ixs";

// const EditProfile = () => {
//   const [user, setUser] = useState(null);
//   const [fullname, setFullname] = useState("");
//   const [bio, setBio] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [cropping, setCropping] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [openToast, setOpenToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastSeverity, setToastSeverity] = useState("success");
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (loggedInUser) {
//       setUser(loggedInUser);
//       setFullname(loggedInUser.fullname || "");
//       setBio(loggedInUser.bio || "");
//       setProfilePic(loggedInUser.profilePic || "");
//     }
//   }, []);

//   const showToast = (message, severity = "success") => {
//     setToastMessage(message);
//     setToastSeverity(severity);
//     setOpenToast(true);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       showToast("Please select a valid image file", "error");
//       return;
//     }
    
//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       showToast("File size must be less than 5MB", "error");
//       return;
//     }
    
//     const fileURL = URL.createObjectURL(file);
//     setImageFile(fileURL);
//     setCropping(true);
//   };

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const uploadCroppedImage = async () => {
//     if (!imageFile || !croppedAreaPixels) {
//       showToast("Please select and crop an image first", "error");
//       return;
//     }

//     setUploading(true);
    
//     try {
//       // Get cropped image blob
//       const croppedImageBlob = await getCroppedImg(imageFile, croppedAreaPixels);
      
//       // Create form data
//       const formData = new FormData();
//       formData.append("file", croppedImageBlob, "profile.jpg");
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//       formData.append("folder", "profile_pics");
      
//       // Upload to Cloudinary
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         { 
//           method: "POST", 
//           body: formData 
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Upload failed: ${response.statusText}`);
//       }

//       const data = await response.json();
      
//       if (data.secure_url) {
//         setProfilePic(data.secure_url);
//         setCropping(false);
//         setImageFile(null);
//         showToast("Profile photo updated successfully!");
//       } else {
//         throw new Error("No secure URL received from Cloudinary");
//       }
      
//     } catch (error) {
//       console.error("Upload error:", error);
//       showToast("Failed to upload image. Please try again.", "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       const updatedUser = {
//         ...user,
//         fullname: fullname.trim(),
//         bio: bio.trim(),
//         profilePic,
//       };

//       // Update in localStorage
//       localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const updatedUsers = users.map((u) =>
//         u.username === user.username ? updatedUser : u
//       );
//       localStorage.setItem("users", JSON.stringify(updatedUsers));

//       // Update posts with new profile pic if changed
//       if (profilePic !== user.profilePic) {
//         const posts = JSON.parse(localStorage.getItem("posts")) || [];
//         const updatedPosts = posts.map(post => 
//           post.author?.username === user.username 
//             ? { ...post, author: { ...post.author, profilePic } }
//             : post
//         );
//         localStorage.setItem("posts", JSON.stringify(updatedPosts));
//       }

//       showToast("Profile updated successfully!");
      
//       // Navigate back after a short delay
//       setTimeout(() => {
//         navigate("/profile", { state: { refresh: true } });
//       }, 1500);
      
//     } catch (error) {
//       console.error("Save error:", error);
//       showToast("Failed to save profile. Please try again.", "error");
//     }
//   };

//   const cancelCrop = () => {
//     setCropping(false);
//     setImageFile(null);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   if (!user) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '50vh',
//           px: 2
//         }}
//       >
//         <Typography variant="h6" textAlign="center">
//           Please log in to edit profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container 
//       maxWidth="sm" 
//       sx={{ 
//         mt: { xs: 2, sm: 4 }, 
//         px: { xs: 2, sm: 3 },
//         pb: { xs: 10, sm: 4 }
//       }}
//     >
//       <Typography 
//         variant={isMobile ? "h6" : "h5"} 
//         mb={3} 
//         textAlign="center" 
//         fontWeight="600"
//         color="text.primary"
//       >
//         Edit Profile
//       </Typography>

//       <Paper 
//         elevation={isMobile ? 0 : 1}
//         sx={{ 
//           p: { xs: 2, sm: 3 },
//           borderRadius: { xs: 0, sm: 2 },
//           border: isMobile ? '1px solid' : 'none',
//           borderColor: 'divider'
//         }}
//       >
//         <Stack spacing={{ xs: 3, sm: 4 }}>
//           {/* Profile Photo Section */}
//           <Box textAlign="center">
//             <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
//               <Avatar
//                 src={profilePic}
//                 sx={{ 
//                   width: { xs: 100, sm: 120 }, 
//                   height: { xs: 100, sm: 120 }, 
//                   mx: "auto",
//                   border: '3px solid',
//                   borderColor: 'primary.main'
//                 }}
//               >
//                 {(!profilePic && user.username?.[0]?.toUpperCase()) || ""}
//               </Avatar>
              
//               <IconButton
//                 component="label"
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   backgroundColor: 'primary.main',
//                   color: 'white',
//                   width: { xs: 32, sm: 40 },
//                   height: { xs: 32, sm: 40 },
//                   '&:hover': {
//                     backgroundColor: 'primary.dark',
//                   }
//                 }}
//               >
//                 <PhotoCameraIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   style={{ display: "none" }}
//                 />
//               </IconButton>
//             </Box>
            
//             <Button
//               variant="outlined"
//               component="label"
//               size={isMobile ? "small" : "medium"}
//               sx={{ 
//                 fontWeight: "600", 
//                 textTransform: 'none',
//                 borderRadius: 2
//               }}
//             >
//               Change Photo
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//             </Button>
//           </Box>

//           {/* Image Cropper Modal */}
//           {cropping && imageFile && (
//             <Paper 
//               elevation={3}
//               sx={{ 
//                 p: 2, 
//                 borderRadius: 2,
//                 backgroundColor: 'grey.50'
//               }}
//             >
//               <Typography variant="h6" mb={2} textAlign="center">
//                 Crop Your Photo
//               </Typography>
              
//               <Box sx={{ 
//                 position: "relative", 
//                 width: "100%", 
//                 height: { xs: 250, sm: 300 },
//                 backgroundColor: '#000',
//                 borderRadius: 1,
//                 mb: 2
//               }}>
//                 <Cropper
//                   image={imageFile}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                 />
//               </Box>
              
//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button 
//                   variant="outlined" 
//                   onClick={cancelCrop}
//                   disabled={uploading}
//                   size={isMobile ? "small" : "medium"}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   variant="contained" 
//                   onClick={uploadCroppedImage}
//                   disabled={uploading}
//                   size={isMobile ? "small" : "medium"}
//                   startIcon={uploading && <CircularProgress size={16} />}
//                 >
//                   {uploading ? "Uploading..." : "Crop & Upload"}
//                 </Button>
//               </Stack>
//             </Paper>
//           )}

//           {/* Form Fields */}
//           <TextField
//             label="Full Name"
//             fullWidth
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             variant="outlined"
//             size={isMobile ? "small" : "medium"}
//             inputProps={{ maxLength: 50 }}
//             helperText={`${fullname.length}/50 characters`}
//           />

//           <TextField
//             label="Bio"
//             fullWidth
//             multiline
//             rows={isMobile ? 3 : 4}
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             variant="outlined"
//             size={isMobile ? "small" : "medium"}
//             inputProps={{ maxLength: 150 }}
//             helperText={`${bio.length}/150 characters`}
//             placeholder="Tell people about yourself..."
//           />

//           {/* Save Button */}
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSave}
//             size={isMobile ? "medium" : "large"}
//             sx={{ 
//               backgroundColor: "#0095f6", 
//               fontWeight: "600",
//               textTransform: 'none',
//               borderRadius: 2,
//               py: { xs: 1.5, sm: 2 },
//               fontSize: { xs: '0.9rem', sm: '1rem' },
//               '&:hover': {
//                 backgroundColor: "#0084e6"
//               }
//             }}
//           >
//             Save Changes
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Toast Notification */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={4000}
//         onClose={() => setOpenToast(false)}
//         anchorOrigin={{ 
//           vertical: isMobile ? "top" : "bottom", 
//           horizontal: "center" 
//         }}
//         sx={{ mt: isMobile ? 8 : 0 }}
//       >
//         <Alert 
//           severity={toastSeverity} 
//           variant="filled" 
//           onClose={() => setOpenToast(false)}
//           sx={{ 
//             width: '100%',
//             fontSize: { xs: '0.875rem', sm: '1rem' }
//           }}
//         >
//           {toastMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default EditProfile;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Avatar,
//   Stack,
//   Snackbar,
//   Alert,
//   Paper,
//   IconButton,
//   CircularProgress,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../Components/cropImage";

// const CLOUDINARY_UPLOAD_PRESET = "dpggrwvvt";
// const CLOUDINARY_CLOUD_NAME = "n5tt5ixs";

// const EditProfile = () => {
//   const [user, setUser] = useState(null);
//   const [fullname, setFullname] = useState("");
//   const [bio, setBio] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [cropping, setCropping] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [openToast, setOpenToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastSeverity, setToastSeverity] = useState("success");
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (loggedInUser) {
//       setUser(loggedInUser);
//       setFullname(loggedInUser.fullname || "");
//       setBio(loggedInUser.bio || "");
//       setProfilePic(loggedInUser.profilePic || "");
//     }
//   }, []);

//   const showToast = (message, severity = "success") => {
//     setToastMessage(message);
//     setToastSeverity(severity);
//     setOpenToast(true);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       showToast("Please select a valid image file", "error");
//       return;
//     }
    
//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       showToast("File size must be less than 5MB", "error");
//       return;
//     }
    
//     const fileURL = URL.createObjectURL(file);
//     setImageFile(fileURL);
//     setCropping(true);
//   };

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const uploadCroppedImage = async () => {
//     if (!imageFile || !croppedAreaPixels) {
//       showToast("Please select and crop an image first", "error");
//       return;
//     }

//     setUploading(true);
    
//     try {
//       console.log("Starting image crop and upload process...");
//       console.log("Crop area:", croppedAreaPixels);
      
//       // Get cropped image blob
//       const croppedImageBlob = await getCroppedImg(imageFile, croppedAreaPixels);
//       console.log("Cropped image blob size:", croppedImageBlob.size);
      
//       // Validate blob
//       if (!croppedImageBlob || croppedImageBlob.size === 0) {
//         throw new Error("Failed to create cropped image");
//       }
      
//       // Create form data
//       const formData = new FormData();
//       formData.append("file", croppedImageBlob, "profile.jpg");
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//       formData.append("folder", "profile_pics");
//       formData.append("resource_type", "image");
      
//       console.log("Uploading to Cloudinary...");
      
//       // Upload to Cloudinary
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         { 
//           method: "POST", 
//           body: formData 
//         }
//       );

//       console.log("Response status:", response.status);
      
//       const data = await response.json();
//       console.log("Cloudinary response:", data);

//       if (!response.ok) {
//         throw new Error(data.error?.message || `Upload failed: ${response.status} ${response.statusText}`);
//       }
      
//       if (data.secure_url) {
//         setProfilePic(data.secure_url);
//         setCropping(false);
//         setImageFile(null);
//         showToast("Profile photo updated successfully!");
//       } else {
//         throw new Error("No secure URL received from Cloudinary");
//       }
      
//     } catch (error) {
//       console.error("Upload error:", error);
//       showToast(`Failed to upload image: ${error.message}`, "error");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       const updatedUser = {
//         ...user,
//         fullname: fullname.trim(),
//         bio: bio.trim(),
//         profilePic,
//       };

//       // Update in localStorage
//       localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const updatedUsers = users.map((u) =>
//         u.username === user.username ? updatedUser : u
//       );
//       localStorage.setItem("users", JSON.stringify(updatedUsers));

//       // Update posts with new profile pic if changed
//       if (profilePic !== user.profilePic) {
//         const posts = JSON.parse(localStorage.getItem("posts")) || [];
//         const updatedPosts = posts.map(post => 
//           post.author?.username === user.username 
//             ? { ...post, author: { ...post.author, profilePic } }
//             : post
//         );
//         localStorage.setItem("posts", JSON.stringify(updatedPosts));
//       }

//       showToast("Profile updated successfully!");
      
//       // Navigate back after a short delay
//       setTimeout(() => {
//         navigate("/profile", { state: { refresh: true } });
//       }, 1500);
      
//     } catch (error) {
//       console.error("Save error:", error);
//       showToast("Failed to save profile. Please try again.", "error");
//     }
//   };

//   const cancelCrop = () => {
//     setCropping(false);
//     setImageFile(null);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   if (!user) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '50vh',
//           px: 2
//         }}
//       >
//         <Typography variant="h6" textAlign="center">
//           Please log in to edit profile.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container 
//       maxWidth="sm" 
//       sx={{ 
//         mt: { xs: 2, sm: 4 }, 
//         px: { xs: 2, sm: 3 },
//         pb: { xs: 10, sm: 4 }
//       }}
//     >
//       <Typography 
//         variant={isMobile ? "h6" : "h5"} 
//         mb={3} 
//         textAlign="center" 
//         fontWeight="600"
//         color="text.primary"
//       >
//         Edit Profile
//       </Typography>

//       <Paper 
//         elevation={isMobile ? 0 : 1}
//         sx={{ 
//           p: { xs: 2, sm: 3 },
//           borderRadius: { xs: 0, sm: 2 },
//           border: isMobile ? '1px solid' : 'none',
//           borderColor: 'divider'
//         }}
//       >
//         <Stack spacing={{ xs: 3, sm: 4 }}>
//           {/* Profile Photo Section */}
//           <Box textAlign="center">
//             <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
//               <Avatar
//                 src={profilePic}
//                 sx={{ 
//                   width: { xs: 100, sm: 120 }, 
//                   height: { xs: 100, sm: 120 }, 
//                   mx: "auto",
//                   border: '3px solid',
//                   borderColor: 'primary.main'
//                 }}
//               >
//                 {(!profilePic && user.username?.[0]?.toUpperCase()) || ""}
//               </Avatar>
              
//               <IconButton
//                 component="label"
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   backgroundColor: 'primary.main',
//                   color: 'white',
//                   width: { xs: 32, sm: 40 },
//                   height: { xs: 32, sm: 40 },
//                   '&:hover': {
//                     backgroundColor: 'primary.dark',
//                   }
//                 }}
//               >
//                 <PhotoCameraIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   style={{ display: "none" }}
//                 />
//               </IconButton>
//             </Box>
            
//             <Button
//               variant="outlined"
//               component="label"
//               size={isMobile ? "small" : "medium"}
//               sx={{ 
//                 fontWeight: "600", 
//                 textTransform: 'none',
//                 borderRadius: 2
//               }}
//             >
//               Change Photo
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//             </Button>
//           </Box>

//           {/* Image Cropper Modal */}
//           {cropping && imageFile && (
//             <Paper 
//               elevation={3}
//               sx={{ 
//                 p: 2, 
//                 borderRadius: 2,
//                 backgroundColor: 'grey.50'
//               }}
//             >
//               <Typography variant="h6" mb={2} textAlign="center">
//                 Crop Your Photo
//               </Typography>
              
//               <Box sx={{ 
//                 position: "relative", 
//                 width: "100%", 
//                 height: { xs: 250, sm: 300 },
//                 backgroundColor: '#000',
//                 borderRadius: 1,
//                 mb: 2
//               }}>
//                 <Cropper
//                   image={imageFile}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                 />
//               </Box>
              
//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button 
//                   variant="outlined" 
//                   onClick={cancelCrop}
//                   disabled={uploading}
//                   size={isMobile ? "small" : "medium"}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   variant="contained" 
//                   onClick={uploadCroppedImage}
//                   disabled={uploading}
//                   size={isMobile ? "small" : "medium"}
//                   startIcon={uploading && <CircularProgress size={16} />}
//                 >
//                   {uploading ? "Uploading..." : "Crop & Upload"}
//                 </Button>
//               </Stack>
//             </Paper>
//           )}

//           {/* Form Fields */}
//           <TextField
//             label="Full Name"
//             fullWidth
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             variant="outlined"
//             size={isMobile ? "small" : "medium"}
//             inputProps={{ maxLength: 50 }}
//             helperText={`${fullname.length}/50 characters`}
//           />

//           <TextField
//             label="Bio"
//             fullWidth
//             multiline
//             rows={isMobile ? 3 : 4}
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             variant="outlined"
//             size={isMobile ? "small" : "medium"}
//             inputProps={{ maxLength: 150 }}
//             helperText={`${bio.length}/150 characters`}
//             placeholder="Tell people about yourself..."
//           />

//           {/* Save Button */}
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSave}
//             size={isMobile ? "medium" : "large"}
//             sx={{ 
//               backgroundColor: "#0095f6", 
//               fontWeight: "600",
//               textTransform: 'none',
//               borderRadius: 2,
//               py: { xs: 1.5, sm: 2 },
//               fontSize: { xs: '0.9rem', sm: '1rem' },
//               '&:hover': {
//                 backgroundColor: "#0084e6"
//               }
//             }}
//           >
//             Save Changes
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Toast Notification */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={4000}
//         onClose={() => setOpenToast(false)}
//         anchorOrigin={{ 
//           vertical: isMobile ? "top" : "bottom", 
//           horizontal: "center" 
//         }}
//         sx={{ mt: isMobile ? 8 : 0 }}
//       >
//         <Alert 
//           severity={toastSeverity} 
//           variant="filled" 
//           onClose={() => setOpenToast(false)}
//           sx={{ 
//             width: '100%',
//             fontSize: { xs: '0.875rem', sm: '1rem' }
//           }}
//         >
//           {toastMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default EditProfile;



import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Cropper from "react-easy-crop";
import getCroppedImg from "../Components/cropImage";

const CLOUDINARY_CLOUD_NAME = "dpggrwvvt";
const CLOUDINARY_UPLOAD_PRESET = "n5tt5ixs";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFullname(loggedInUser.fullname || "");
      setBio(loggedInUser.bio || "");
      setProfilePic(loggedInUser.profilePic || "");
    }
  }, []);

  const showToast = (message, severity = "success") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setOpenToast(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast("Please select a valid image file", "error");
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB", "error");
      return;
    }
    
    const fileURL = URL.createObjectURL(file);
    setImageFile(fileURL);
    setCropping(true);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const uploadCroppedImage = async () => {
    if (!imageFile || !croppedAreaPixels) {
      showToast("Please select and crop an image first", "error");
      return;
    }

    setUploading(true);
    
    try {
      console.log("Starting image crop and upload process...");
      console.log("Crop area:", croppedAreaPixels);
      
      // Get cropped image blob
      const croppedImageBlob = await getCroppedImg(imageFile, croppedAreaPixels);
      console.log("Cropped image blob size:", croppedImageBlob.size);
      
      // Validate blob
      if (!croppedImageBlob || croppedImageBlob.size === 0) {
        throw new Error("Failed to create cropped image");
      }
      
      // Create form data
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "profile.jpg");
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      
      console.log("Uploading to Cloudinary...");
      
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        { 
          method: "POST", 
          body: formData 
        }
      );

      console.log("Response status:", response.status);
      
      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (!response.ok) {
        throw new Error(data.error?.message || `Upload failed: ${response.status} ${response.statusText}`);
      }
      
      if (data.secure_url) {
        setProfilePic(data.secure_url);
        setCropping(false);
        setImageFile(null);
        showToast("Profile photo updated successfully!");
      } else {
        throw new Error("No secure URL received from Cloudinary");
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      showToast(`Failed to upload image: ${error.message}`, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const updatedUser = {
        ...user,
        fullname: fullname.trim(),
        bio: bio.trim(),
        profilePic,
      };

      // Update in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.username === user.username ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update posts with new profile pic if changed
      if (profilePic !== user.profilePic) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const updatedPosts = posts.map(post => 
          post.author?.username === user.username 
            ? { ...post, author: { ...post.author, profilePic } }
            : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      }

      showToast("Profile updated successfully!");
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/profile", { state: { refresh: true } });
      }, 1500);
      
    } catch (error) {
      console.error("Save error:", error);
      showToast("Failed to save profile. Please try again.", "error");
    }
  };

  const cancelCrop = () => {
    setCropping(false);
    setImageFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  if (!user) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          px: 2
        }}
      >
        <Typography variant="h6" textAlign="center">
          Please log in to edit profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: { xs: 2, sm: 4 }, 
        px: { xs: 2, sm: 3 },
        pb: { xs: 10, sm: 4 }
      }}
    >
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        mb={3} 
        textAlign="center" 
        fontWeight="600"
        color="text.primary"
      >
        Edit Profile
      </Typography>

      <Paper 
        elevation={isMobile ? 0 : 1}
        sx={{ 
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 0, sm: 2 },
          border: isMobile ? '1px solid' : 'none',
          borderColor: 'divider'
        }}
      >
        <Stack spacing={{ xs: 3, sm: 4 }}>
          {/* Profile Photo Section */}
          <Box textAlign="center">
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Avatar
                src={profilePic}
                sx={{ 
                  width: { xs: 100, sm: 120 }, 
                  height: { xs: 100, sm: 120 }, 
                  mx: "auto",
                  border: '3px solid',
                  borderColor: 'primary.main'
                }}
              >
                {(!profilePic && user.username?.[0]?.toUpperCase()) || ""}
              </Avatar>
              
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Box>
            
            <Button
              variant="outlined"
              component="label"
              size={isMobile ? "small" : "medium"}
              sx={{ 
                fontWeight: "600", 
                textTransform: 'none',
                borderRadius: 2
              }}
            >
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Button>
          </Box>

          {/* Image Cropper Modal */}
          {cropping && imageFile && (
            <Paper 
              elevation={3}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                backgroundColor: 'grey.50'
              }}
            >
              <Typography variant="h6" mb={2} textAlign="center">
                Crop Your Photo
              </Typography>
              
              <Box sx={{ 
                position: "relative", 
                width: "100%", 
                height: { xs: 250, sm: 300 },
                backgroundColor: '#000',
                borderRadius: 1,
                mb: 2
              }}>
                <Cropper
                  image={imageFile}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </Box>
              
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button 
                  variant="outlined" 
                  onClick={cancelCrop}
                  disabled={uploading}
                  size={isMobile ? "small" : "medium"}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={uploadCroppedImage}
                  disabled={uploading}
                  size={isMobile ? "small" : "medium"}
                  startIcon={uploading && <CircularProgress size={16} />}
                >
                  {uploading ? "Uploading..." : "Crop & Upload"}
                </Button>
              </Stack>
            </Paper>
          )}

          {/* Form Fields */}
          <TextField
            label="Full Name"
            fullWidth
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            inputProps={{ maxLength: 50 }}
            helperText={`${fullname.length}/50 characters`}
          />

          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            inputProps={{ maxLength: 150 }}
            helperText={`${bio.length}/150 characters`}
            placeholder="Tell people about yourself..."
          />

          {/* Save Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            size={isMobile ? "medium" : "large"}
            sx={{ 
              backgroundColor: "#0095f6", 
              fontWeight: "600",
              textTransform: 'none',
              borderRadius: 2,
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: "#0084e6"
              }
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>

      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={4000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ 
          vertical: isMobile ? "top" : "bottom", 
          horizontal: "center" 
        }}
        sx={{ mt: isMobile ? 8 : 0 }}
      >
        <Alert 
          severity={toastSeverity} 
          variant="filled" 
          onClose={() => setOpenToast(false)}
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;