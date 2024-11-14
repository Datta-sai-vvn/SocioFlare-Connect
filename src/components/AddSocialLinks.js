// src/components/AddSocialLinks.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 15px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #9e7bb5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddSocialLinks = () => {
  const navigate = useNavigate();
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [otherLinks, setOtherLinks] = useState([{ platform: '', link: '' }]);

  const handleAddMore = () => {
    setOtherLinks([...otherLinks, { platform: '', link: '' }]);
  };

  const handleChangeOtherLinks = (index, field, value) => {
    const updatedLinks = [...otherLinks];
    updatedLinks[index][field] = value;
    setOtherLinks(updatedLinks);
  };

  const handleSave = () => {
    // Save social media links to localStorage or a global state for demo purposes.
    localStorage.setItem(
      'socialLinks',
      JSON.stringify({
        instagram,
        linkedin,
        otherLinks,
      })
    );

    // Navigate back to the gender selection page.
    navigate('/gender-selection');
  };

  return (
    <Container>
      <Title>Add Social Media Links</Title>
      <Form>
        <Label>Instagram</Label>
        <Input
          type="text"
          placeholder="Enter Instagram ID"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <Label>LinkedIn</Label>
        <Input
          type="text"
          placeholder="Enter LinkedIn Profile URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <Label>Other Social Media Links</Label>
        {otherLinks.map((link, index) => (
          <div key={index}>
            <Input
              type="text"
              placeholder="Enter platform name"
              value={link.platform}
              onChange={(e) => handleChangeOtherLinks(index, 'platform', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter profile link or ID"
              value={link.link}
              onChange={(e) => handleChangeOtherLinks(index, 'link', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={handleAddMore}>Add More</Button>
        <Button onClick={handleSave}>Save</Button>
      </Form>
    </Container>
  );
};

export default AddSocialLinks;
