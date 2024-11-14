// Profile.js

import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const ProfileTitle = styled.h1`
  color: #4a4a4a;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileTitle>Welcome to Your Profile</ProfileTitle>
      <p>Manage your account settings and view your information here.</p>
    </ProfileContainer>
  );
};

export default Profile;
