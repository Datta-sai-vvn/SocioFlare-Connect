import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import EventsCard from './EventsCard';

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px; /* Reduced gap between sidebar and main content */
  padding: 20px 30px; /* Adjusted padding to minimize unused space */
  background-color: #f8f8f8;
  height: 100vh;
  overflow-y: auto; /* Added scroll if needed */
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
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;

  &:hover {
    background-color: #7b5f90;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Reduced gap to bring components closer */
  margin-top: -30px; /* Moves the layout upwards into the empty space */
`;


const EventsTitle = styled.h2`
  font-size: 2.2rem; /* Slightly larger for better visibility */
  color: #4a4a4a;
  margin-bottom: 10px; /* Adjusted spacing to utilize space effectively */
  text-align: center;
`;

const ContinueButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #9E7BB5;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7b5f90;
  }
`;

const EventInterestSlider = styled.div`
  margin: 10px auto; /* Adjusted to fit better in the layout */
  text-align: center;
  width: 75%;
  padding: 20px;
  border: 2px solid #9e7bb5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const InterestLevelLabel = styled.p`
  font-size: 1.7rem; /* Increased font size */
  margin-top: 15px;
  font-weight: bold;
  color: #9e7bb5;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 10px;
  background: #e0e0e0;
  outline: none;
  transition: background 0.3s ease;

  &::-webkit-slider-runnable-track {
    height: 10px;
    background: #9E7BB5;
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }

  &:hover::-webkit-slider-thumb {
    background: #e0e0e0;
  }

  &:focus {
    background: #9E7BB5;
  }
`;

const ScaleNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  color: #9e7bb5;
  margin-top: 5px;
`;

const HighlightedHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  color: #9e7bb5;
  background: linear-gradient(90deg, rgba(158, 123, 181, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
  padding: 10px;
  margin: 0 0 20px 0; /* Added spacing below heading */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Events = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [interestLevel, setInterestLevel] = useState(5);

  const eventsList = [
    { id: 1, name: 'Social Service' },
    { id: 2, name: 'Cooking' },
    { id: 3, name: 'Eat Out' },
    { id: 4, name: 'Movies' },
    { id: 5, name: 'Home Party' },
    { id: 6, name: 'Gardening' },
    { id: 7, name: 'Hang Out' },
    { id: 8, name: 'Hiking' },
    { id: 9, name: 'Biking' },
    { id: 10, name: 'Picnic in the Park' },
    { id: 11, name: 'Volunteer at a Shelter' },
    { id: 12, name: 'Book Club Meetup' },
    { id: 13, name: 'Cooking Class' },
    { id: 14, name: 'Game Night' },
    { id: 15, name: 'Sports Tournament' },
    { id: 16, name: 'Music Concert' },
    { id: 17, name: 'Dance Party' },
    { id: 18, name: 'Art Gallery Visit' },
    { id: 19, name: 'Barbecue Party' },
    { id: 20, name: 'Trivia Night' },
    { id: 21, name: 'Crafting Workshop' },
    { id: 22, name: 'Fundraising Event' },
    { id: 23, name: 'Movie Marathon' },
    { id: 24, name: 'Road Trip Adventure' },
    { id: 25, name: 'Outdoor Yoga' },
    { id: 26, name: 'Project Ideas' },
    { id: 27, name: 'Photography Walk' },
    { id: 28, name: 'Meditation Session' },
    { id: 29, name: 'Comedy Show' },
    { id: 30, name: 'Morning Walk'},
  ];

  const handleContinueClick = () => {
    console.log('Interest Level for', selectedEvent, ':', interestLevel);
    navigate('/matching-profile');
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EventsContainer>
        <Sidebar>
          <NavButton onClick={() => navigate('/profile-overview')}>Home</NavButton>
          <NavButton onClick={() => navigate('/events')}>Events</NavButton>
          <NavButton onClick={() => navigate('/chat')}>Messages</NavButton>
        </Sidebar>

        <ContentContainer>
          <EventsTitle>Choose an event</EventsTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            {eventsList.map((event) => (
              <EventsCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
            ))}
          </div>

          {selectedEvent && (
            <EventInterestSlider>
              <HighlightedHeading>How interested are you in {selectedEvent.name}?</HighlightedHeading>
              <Slider
                type="range"
                min="1"
                max="10"
                value={interestLevel}
                onChange={(e) => setInterestLevel(e.target.value)}
              />
              <InterestLevelLabel>Interest Level: {interestLevel}</InterestLevelLabel>
              <ScaleNumbers>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </ScaleNumbers>
            </EventInterestSlider>
          )}

          <ContinueButton onClick={handleContinueClick}>Continue</ContinueButton>
        </ContentContainer>
      </EventsContainer>
    </DndProvider>
  );
};

export default Events;
