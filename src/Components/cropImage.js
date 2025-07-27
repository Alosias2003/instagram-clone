

// const getCroppedImg = (imageSrc, crop) => {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.crossOrigin = "anonymous"; // to avoid CORS issues

//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;

//       const pixelCrop = {
//         x: Math.round(crop.x * scaleX),
//         y: Math.round(crop.y * scaleY),
//         width: Math.round(crop.width * scaleX),
//         height: Math.round(crop.height * scaleY),
//       };

//       canvas.width = pixelCrop.width;
//       canvas.height = pixelCrop.height;

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         pixelCrop.width,
//         pixelCrop.height
//       );

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             reject(new Error("Canvas is empty"));
//             return;
//           }
//           resolve(blob); // return Blob directly for upload
//         },
//         "image/jpeg",
//         1
//       );
//     };

//     image.onerror = () => reject(new Error("Image load error"));
//   });
// };

// export default getCroppedImg;



const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // to avoid CORS issues
    
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        // Use the actual displayed dimensions vs natural dimensions
        // The crop coordinates are based on the displayed image size
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        // Calculate pixel crop coordinates
        const pixelCrop = {
          x: crop.x * scaleX,
          y: crop.y * scaleY,
          width: crop.width * scaleX,
          height: crop.height * scaleY,
        };
        
        // Set canvas size to the crop size
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the cropped image
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty - could not create blob"));
              return;
            }
            
            // Clean up the object URL to prevent memory leaks
            if (imageSrc.startsWith('blob:')) {
              URL.revokeObjectURL(imageSrc);
            }
            
            resolve(blob);
          },
          "image/jpeg",
          0.9 // Slightly reduce quality to ensure smaller file size
        );
        
      } catch (error) {
        reject(new Error(`Cropping failed: ${error.message}`));
      }
    };
    
    image.onerror = (error) => {
      reject(new Error(`Image load failed: ${error.message || 'Unknown error'}`));
    };
    
    // Set src after setting up event listeners
    image.src = imageSrc;
  });
};

export default getCroppedImg;