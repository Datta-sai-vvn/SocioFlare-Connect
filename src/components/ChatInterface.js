// src/components/ChatInterface.js

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ChatPage = styled.div`
  display: flex;
  height: 100vh;
`;

const ConversationsList = styled.div`
  width: 25%;
  background: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  width: 75%;
  background: #ffffff;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const ConversationItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #ececec;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const ChatInputContainer = styled.div`
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #357ab8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #285a8b;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background-color: #9E7BB5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7b5f90;
  }
`;

const ChatInterface = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [conversations] = useState([
    { id: 1, name: 'John Tyler', message: 'Hello!' },
    { id: 2, name: 'Star Lopez', message: 'Hi there!' },
    { id: 3, name: 'Alex Brown', message: 'Good morning!' },
    { id: 4, name: 'Emma Green', message: 'Let’s catch up soon!' },
    { id: 5, name: 'Michael Johnson', message: 'How’s it going?' }
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]); // Clear previous messages (or load conversation history if available)
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      setMessages([...messages, { text: messageInput, sent: true }]);
      setMessageInput('');
    }
  };

  return (
    <ChatPage>
      <ConversationsList>
        <h3>Conversations</h3>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation)}
          >
            <h4>{conversation.name}</h4>
            <p>{conversation.message}</p>
          </ConversationItem>
        ))}
      </ConversationsList>

      <ChatContainer>
        {/* Home and Events Navigation Buttons */}
        <NavigationButtons>
          <NavButton onClick={() => navigate('/profile-overview')}>Home</NavButton>
          <NavButton onClick={() => navigate('/events')}>Events</NavButton>
        </NavigationButtons>

        <h2>Chat with {selectedConversation ? selectedConversation.name : '...'}</h2>

        <ChatArea>
          {messages.map((msg, index) => (
            <p key={index}>{msg.sent ? `You: ${msg.text}` : `${selectedConversation?.name}: ${msg.text}`}</p>
          ))}
        </ChatArea>

        <ChatInputContainer>
          <ChatInput
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={!selectedConversation}
          />
          <SendButton onClick={handleSendMessage} disabled={!selectedConversation}>
            Send
          </SendButton>
        </ChatInputContainer>
      </ChatContainer>
    </ChatPage>
  );
};

export default ChatInterface;
