import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import Select from 'react-select';
import getCroppedImg from '../utils/cropImage';
import { UserContext } from '../context/UserContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';


Modal.setAppElement('#root');

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  padding: 50px;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #d8d8d8;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
`;

const CameraIcon = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const SocialLinksContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #e8e8f8;
  width: 100%;
  border-radius: 5px;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  resize: none;
`;

const SaveButton = styled.button`
  padding: 10px 25px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #9e7bb5;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
`;

const GenderSelection = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    language: [],
    interests: '',
    city: '',
    bio: ''
  });

  useEffect(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    if (savedLinks) {
      setSocialLinks(JSON.parse(savedLinks));
    }
  }, []);

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setTempImage(file);
      setShowCropModal(true);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      setProfilePicture(croppedImage);
      setShowCropModal(false);
    } catch (e) {
      console.error('Error cropping image', e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    const userData = {
      profilePicture,
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      language: formData.language,
      interests: formData.interests,
      city: formData.city,
      bio: formData.bio,
      socialLinks
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userData);
      console.log('User data saved successfully to Firestore.');
      updateUser(userData);
      navigate('/profile-overview');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };

  return (
    <>
      <ProfileContainer>
        <LeftSection>
          <ProfileImage>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>Add Photo</span>
            )}
            <CameraIcon>
              <label htmlFor="profilePictureInput">
                <FileInput
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                📸
              </label>
            </CameraIcon>
          </ProfileImage>
          <h2>{formData.name || "Profile Preview"}</h2>
          {socialLinks && (
            <SocialLinksContainer>
              <h3>Social Media Links</h3>
              <p>Instagram: {socialLinks.instagram}</p>
              <p>LinkedIn: {socialLinks.linkedin}</p>
              {socialLinks.otherLinks &&
                socialLinks.otherLinks.map((link, index) => (
                  <p key={index}>
                    {link.platform}: {link.link}
                  </p>
                ))}
            </SocialLinksContainer>
          )}
          <button onClick={() => navigate('/add-social-links')}>
            Add Social Media Links
          </button>
        </LeftSection>

        <RightSection>
          <Label>Full Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />

          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />

          <Label>Age</Label>
          <Input type="text" name="age" value={formData.age} onChange={handleInputChange} />

          <Label>Gender</Label>
          <Input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />

          <Label>Language</Label>
          <Select
            isMulti
            name="language"
            options={[
              { value: 'English', label: 'English' },
              { value: 'Spanish', label: 'Spanish' },
              { value: 'French', label: 'French' },
              { value: 'German', label: 'German' },
              { value: 'Chinese', label: 'Chinese' }
            ]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                language: selectedOptions.map((opt) => opt.value)
              }))
            }
          />

          <Label>Interests</Label>
          <TextArea name="interests" value={formData.interests} onChange={handleInputChange} />

          <Label>City</Label>
          <Input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <Label>Bio</Label>
          <TextArea name="bio" value={formData.bio} onChange={handleInputChange} />

          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </RightSection>
      </ProfileContainer>

      {showCropModal && (
        <Modal isOpen={showCropModal} onRequestClose={() => setShowCropModal(false)}>
          <h2>Crop Your Profile Picture</h2>
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={handleCropSave}>Save</button>
          <button onClick={() => setShowCropModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
};

export default GenderSelection;
