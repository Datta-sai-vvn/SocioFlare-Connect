import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const PriorityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  height: 40px;
  margin: 40px auto;
  background: transparent;
  border: 2px solid #000;
  border-radius: 5px;
  position: relative;
  flex-direction: column;
`;

const EventName = styled.p`
  position: absolute;
  top: -40px; /* Position the name on top of the priority box */
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  color: #d9534f; /* Highlight color for visibility (red shade for emphasis) */
  font-size: 1.5rem;
  text-transform: uppercase; /* Make it stand out */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); /* Add shadow for better contrast */
`;

const PercentageIndicator = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  width: ${(props) => (props.width > 100 ? 100 : props.width)}%;
  max-width: 100%;
  background: #9E7BB5;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
  transition: width 0.3s ease;
`;

const PriorityText = styled.p`
  position: absolute;
  bottom: -50px; /* Keep the priority label below the box */
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  color: #000;
`;

const PriorityLine = () => {
  const [percentage, setPercentage] = useState(0);
  const [eventName, setEventName] = useState('');

  const dropRef = React.useRef(null);

  const [, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && dropRef.current) {
        const dropArea = dropRef.current.getBoundingClientRect();
        const dropPosition = offset.x - dropArea.left;

        // Calculate the percentage accurately based on drop position within the container
        const calculatedPercentage = Math.min(
          100,
          Math.max(0, (dropPosition / dropArea.width) * 100)
        );

        setPercentage(calculatedPercentage.toFixed(0)); // Set percentage from 0 to 100
        setEventName(item.eventName); // Set the event name
      }
    },
  }));

  drop(dropRef);

  return (
    <PriorityContainer ref={dropRef}>
      {eventName && <EventName>{eventName}</EventName>}
      <PercentageIndicator width={percentage}>
        {percentage > 0 ? `${percentage}%` : ''}
      </PercentageIndicator>
      <PriorityText>Priority</PriorityText>
    </PriorityContainer>
  );
};

export default PriorityLine;
