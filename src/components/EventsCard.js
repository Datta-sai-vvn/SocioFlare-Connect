import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  height: 100px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const EventsCard = ({ event }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id, name: event.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <CardContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {event.name}
    </CardContainer>
  );
};

export default EventsCard;
