import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// UserProvider component that will wrap the parts of the app that need access to user data
export const UserProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profilePicture: '',
    age: '',
    interests: '',
    language: [],
    gender: '',
    city: ''
  });

  // Function to update user data
  const updateUser = (userData) => {
    setUser((prev) => ({
      ...prev,
      ...userData
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
