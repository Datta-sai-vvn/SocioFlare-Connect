// src/components/Events.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import EventsCard from './EventsCard';
import PriorityLine from './PriorityLine';

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;  // Adjusted for sidebar and main content
  gap: 40px;
  padding: 40px;
  background-color: #f8f8f8;
  height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  background-color: #9e7bb5;
  color: #ffffff;
  padding: 15px;  // Increased padding for consistency with Profile Overview
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;  // Increased font size for better readability

  &:hover {
    background-color: #7b5f90;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const EventsTitle = styled.h2`
  font-size: 2rem;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const ContinueButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #9E7BB5;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #357ab8;
  }
`;

const PriorityContainer = styled.div`
  width: 80%;  // Increased width to match the green highlighted area
  margin-bottom: 40px;
`;

const Events = () => {
  const navigate = useNavigate(); // Navigation hook

  const eventsList = [
    { id: 1, name: 'Social Service' },
    { id: 2, name: 'Cooking' },
    { id: 3, name: 'Eat Out' },
    { id: 4, name: 'Movies' },
    // { id: 5, name: 'Home Party' },
    // { id: 6, name: 'Gardening' },
    // { id: 7, name: 'Hang Out' },
    // { id: 8, name: 'Hiking' },
    // { id: 9, name: 'Biking' },
    // { id: 10, name: 'Other' },
  ];

  const handleContinueClick = () => {
    // Navigate to matching profile page
    navigate('/matching-profile');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EventsContainer>
        {/* Sidebar for navigation */}
        <Sidebar>
          <NavButton onClick={() => navigate('/profile-overview')}>Home</NavButton>
          <NavButton onClick={() => navigate('/events')}>Events</NavButton> {/* Redirect to the same page */}
          <NavButton onClick={() => navigate('/chat')}>Messages</NavButton>
        </Sidebar>
        
        {/* Main content for event selection */}
        <ContentContainer>
          <EventsTitle>Choose an event</EventsTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            {eventsList.map((event) => (
              <EventsCard key={event.id} event={event} />
            ))}
          </div>
          <PriorityContainer>
            <PriorityLine />
          </PriorityContainer>
          <ContinueButton onClick={handleContinueClick}>Continue</ContinueButton>
        </ContentContainer>
      </EventsContainer>
    </DndProvider>
  );
};

export default Events;
