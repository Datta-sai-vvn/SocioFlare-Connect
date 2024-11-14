// Home.js
import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
`;
const ActivitySection = styled.div`
  flex: 1;
  padding: 20px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Sidebar />
      <ActivitySection>
        <h2>Past activity info</h2>
        <ActivityCard>
          <h3>Cooking event</h3>
          <p>Participants: Star Lopez, John Tyler</p>
        </ActivityCard>
      </ActivitySection>
    </HomeContainer>
  );
};

export default Home;