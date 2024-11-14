import React, { useState } from 'react';

const UploadProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Logic for uploading file (e.g., to Firebase Storage)
      console.log("Uploading:", selectedFile.name);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadProfileImage;
