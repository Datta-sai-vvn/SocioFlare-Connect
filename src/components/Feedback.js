import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Header = styled.h2`
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Star = styled.span`
  font-size: 2rem;
  color: ${(props) => (props.active ? '#ffd700' : '#ccc')};
  cursor: pointer;
`;

const CommentsBox = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #9e7bb5;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7b5f90;
  }
`;

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const navigate = useNavigate(); // Create navigate function

  const handleRating = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleRateApp = () => {
    navigate('/rate-app'); // Navigate to Rate App page
  };

  const handleConfirm = () => {
    navigate('/'); // Navigate to home page after confirming feedback
  };

  return (
    <Container>
      <Header>Rate your companion</Header>
      <h3>Star Lopez</h3>
      <RatingContainer>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            active={index < rating}
            onClick={() => handleRating(index)}
          >
            ★
          </Star>
        ))}
      </RatingContainer>
      <CommentsBox
        placeholder="Extra Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button onClick={handleRateApp}>Rate App</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Feedback;