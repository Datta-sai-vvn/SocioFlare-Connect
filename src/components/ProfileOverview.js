import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 40px;
  padding: 40px;
  background-color: #f8f8f8;
  height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const NavButton = styled.button`
  background-color: #9e7bb5;
  color: #ffffff;
  padding: 15px 25px;
  width: 100%;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b5f90;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  width: 90%;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ActivityCard = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 70px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  width: 80%;
`;

const EventImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const ProfileContainer = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 80%;
  max-width: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
`;

const ProfileDetail = styled.div`
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #9e7bb5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7b5f90;
  }
`;

const ProfileOverview = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <OverviewContainer>
      <Sidebar>
        <SearchInput placeholder="Search" />
        <NavButton onClick={() => handleNavigation('/profile-overview')}>Home</NavButton>
        <NavButton onClick={() => handleNavigation('/events')}>Events</NavButton>
        <NavButton onClick={() => handleNavigation('/chat')}>Messages</NavButton>
      </Sidebar>

      <ContentContainer>
        <h2>Past Activity Info</h2>
        <ActivityCard>
          <EventImage src="https://via.placeholder.com/100?text=Cooking" alt="Cooking Event" />
          <div>
            <h3>Cooking Event</h3>
            <p>Date: 10/05/2024 6:00 PM</p>
            <p>Participants: Star Lopez, John Tyler</p>
          </div>
        </ActivityCard>
      </ContentContainer>

      <ProfileContainer>
        {user.profilePicture && (
          <ProfileImage src={user.profilePicture} alt="Profile" />
        )}
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.address}</p>
        <p>{user.bio}</p>
        {user.socialLinks && (
          <ProfileDetail>
            <h4>Social Media Links:</h4>
            <p>Instagram: {user.socialLinks.instagram}</p>
            <p>LinkedIn: {user.socialLinks.linkedin}</p>
            {user.socialLinks.otherLinks &&
              user.socialLinks.otherLinks.map((link, index) => (
                <p key={index}>
                  {link.platform}: {link.link}
                </p>
              ))}
          </ProfileDetail>
        )}
        <EditButton onClick={() => navigate('/gender-selection')}>Edit Profile</EditButton>
      </ProfileContainer>
    </OverviewContainer>
  );
};

export default ProfileOverview;
