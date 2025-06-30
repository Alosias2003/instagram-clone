// // cropImage.js
// const getCroppedImg = (imageSrc, crop) => {
//   const canvas = document.createElement("canvas");
//   const image = new Image();
//   image.src = imageSrc;

//   return new Promise((resolve, reject) => {
//     image.onload = () => {
//       const ctx = canvas.getContext("2d");
//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;

//       canvas.width = crop.width;
//       canvas.height = crop.height;

//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );

//       canvas.toBlob((blob) => {
//         if (!blob) {
//           reject(new Error("Canvas is empty"));
//           return;
//         }
//         const fileUrl = URL.createObjectURL(blob);
//         resolve({ blob, url: fileUrl });
//       }, "image/jpeg");
//     };
//     image.onerror = () => reject(new Error("Image load error"));
//   });
// };

// export default getCroppedImg;




// src/utils/getCroppedImg.js

const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // to avoid CORS issues

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const pixelCrop = {
        x: Math.round(crop.x * scaleX),
        y: Math.round(crop.y * scaleY),
        width: Math.round(crop.width * scaleX),
        height: Math.round(crop.height * scaleY),
      };

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

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

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob); // return Blob directly for upload
        },
        "image/jpeg",
        1
      );
    };

    image.onerror = () => reject(new Error("Image load error"));
  });
};

export default getCroppedImg;
