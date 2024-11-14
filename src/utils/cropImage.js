// cropImage.js

export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = 'croppedImage.png';
        window.URL.revokeObjectURL(blob);
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/png');
    };
    image.onerror = (error) => {
      reject(error);
    };
  });
}
