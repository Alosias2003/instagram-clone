// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Avatar,
//   Stack,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const [user, setUser] = useState(null);
//   const [fullname, setFullname] = useState("");
//   const [bio, setBio] = useState("");
//   const [profilePic, setProfilePic] = useState("");
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

//   const handleSave = () => {
//     if (!user) return;

//     const updatedUser = {
//       ...user,
//       fullname,
//       bio,
//       profilePic,
//     };

//     // Update user in localStorage
//     localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const updatedUsers = users.map((u) =>
//       u.username === user.username ? updatedUser : u
//     );
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     navigate("/profile"); // Redirect to profile
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
//           <Typography variant="body2" color="text.secondary">
//             Change Profile Photo
//           </Typography>
//         </Box>

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

//         <TextField
//           label="Profile Picture URL"
//           fullWidth
//           value={profilePic}
//           onChange={(e) => setProfilePic(e.target.value)}
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
//   Input,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../Components/cropImage"; // Custom utility to crop image using canvas

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
//     setImageFile(URL.createObjectURL(file));
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
//       {
//         method: "POST",
//         body: formData,
//       }
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

//     navigate("/profile");
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

//         <TextField
//           label="Profile Picture URL"
//           fullWidth
//           value={profilePic}
//           onChange={(e) => setProfilePic(e.target.value)}
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


// // src/Components/EditProfile.jsx
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
// import getCroppedImg from "../Components/cropImage"; // Place this file in src/utils/

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

//         <TextField
//           label="Profile Picture URL"
//           fullWidth
//           value={profilePic}
//           onChange={(e) => setProfilePic(e.target.value)}
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


// src/Components/EditProfile.jsx

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
// import getCroppedImg from "../Components/cropImage"; // Ensure this utility is correctly implemented

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
//     if (file.size > 10 * 1024 * 1024) {
//       alert("File size must be less than 10MB");
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
//     try {
//       const canvasBlob = await getCroppedImg(imageFile, croppedAreaPixels);
//       const formData = new FormData();
//       formData.append("file", canvasBlob);
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         { method: "POST", body: formData }
//       );

//       const data = await res.json();
//       setProfilePic(data.secure_url);
//       setCropping(false);
//       setOpenToast(true);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
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

//         <TextField
//           label="Profile Picture URL"
//           fullWidth
//           value={profilePic}
//           onChange={(e) => setProfilePic(e.target.value)}
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


// EditProfile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Stack,
  Input,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../Components/cropImage"; // adjust path if needed

const CLOUDINARY_UPLOAD_PRESET = "dpggrwvvt";
const CLOUDINARY_CLOUD_NAME = "n5tt5ixs";

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
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFullname(loggedInUser.fullname || "");
      setBio(loggedInUser.bio || "");
      setProfilePic(loggedInUser.profilePic || "");
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      alert("File size must be less than 100MB");
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
    const canvasBlob = await getCroppedImg(imageFile, croppedAreaPixels);
    const formData = new FormData();
    formData.append("file", canvasBlob);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setProfilePic(data.secure_url);
    setCropping(false);
    setOpenToast(true);
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      fullname,
      bio,
      profilePic,
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    navigate("/profile", { state: { refresh: true } });
    window.location.reload(); // force reload to update immediately
  };

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">Please log in to edit profile.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
        Edit Profile
      </Typography>

      <Stack spacing={3}>
        <Box textAlign="center">
          <Avatar
            src={profilePic}
            sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
          />
          <Button
            variant="outlined"
            component="label"
            size="small"
            sx={{ fontWeight: "bold", mt: 1 }}
          >
            Upload Photo
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              sx={{ display: "none" }}
            />
          </Button>
        </Box>

        {cropping && imageFile && (
          <Box sx={{ position: "relative", width: "100%", height: 300 }}>
            <Cropper
              image={imageFile}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Button fullWidth variant="contained" onClick={uploadCroppedImage}>
              Crop & Upload
            </Button>
          </Box>
        )}

        <TextField
          label="Full Name"
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          sx={{ backgroundColor: "#0095f6", fontWeight: "bold" }}
        >
          Save Changes
        </Button>
      </Stack>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenToast(false)}>
          Profile photo updated!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;
