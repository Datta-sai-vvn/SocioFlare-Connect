// src/components/Other.js

import React from 'react';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import EventsCard from './EventsCard';
import PriorityLine from './PriorityLine';

const OtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const OtherGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
`;

const OtherTitle = styled.h2`
  font-size: 2rem;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const Other = () => {
  const otherList = [
    { id: 1, name: 'Window Shopping' },
    { id: 2, name: 'Research' },
    { id: 3, name: 'CS 378 Study Group' },
    { id: 4, name: 'Tea Party' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <OtherContainer>
        <OtherTitle>Other</OtherTitle>
        <OtherGrid>
          {otherList.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </OtherGrid>
        <PriorityLine />
      </OtherContainer>
    </DndProvider>
  );
};

export default Other;
