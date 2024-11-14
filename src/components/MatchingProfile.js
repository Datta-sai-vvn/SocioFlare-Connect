// src/components/MatchingProfile.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props) => (props.primary ? '#357ab8' : '#9E7BB5')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#285a8b' : '#7b5f90')};
  }
`;

const MatchingProfile = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/events'); // Navigate back to event selection page
  };

  const handleContinue = () => {
    navigate('/chat'); // Navigate to the chat interface page
  };

  return (
    <Container>
      <h2>Biking by the lake</h2>
      <div style={{ display: 'flex' }}>
        <Card>
          <h3>John Tyler, 27</h3>
          <p>★★★★★</p>
          <p>Interests:</p>
          <p><span role="img" aria-label="biking">🚴</span> Biking</p>
        </Card>
        <Card>
          <h3>Star Lopez, 26</h3>
          <p>★★★★★</p>
          <p>Interests:</p>
          <p><span role="img" aria-label="biking">🚴</span> Biking</p>
        </Card>
      </div>
      <ButtonContainer>
        <Button onClick={handleBack}>Back</Button>
        <Button primary onClick={handleContinue}>Continue</Button>
      </ButtonContainer>
    </Container>
  );
};

export default MatchingProfile;