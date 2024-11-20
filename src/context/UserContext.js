import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const defaultUser = {
  uid: null, 
  displayName: '',
  phone: '',
  address: '',
  bio: '',
  profilePicture: '',
  age: '',
  interests: '',
  language: [],
  gender: '',
  city: '',
  selectedEvent: null,
  interestLevel: 5,
};

export const UserContext = createContext({
  user: defaultUser, 
  updateUser: () => {},
  handleEventClick: () => {}, 
  handleInterestLevelChange: () => {}, 
  handleContinueClick: async () => {}, 
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser((prevUser) => ({
          ...prevUser,
          uid: authUser.uid,
          displayName: authUser.displayName || 'Guest',
        }));
      } else {
        setUser(defaultUser); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  

  const handleEventClick = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      selectedEvent: event,
    }));
  };

  const handleInterestLevelChange = (level) => {
    setUser((prevUser) => ({
      ...prevUser,
      interestLevel: level,
    }));
  };

  const handleContinueClick = async () => {
    if (!user.selectedEvent) {
      alert('Please select an event before continuing.');
      return;
    }

    const eventData = {
      userId: user.uid || 'guest', 
      eventName: user.selectedEvent.name,
      interestLevel: user.interestLevel,
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'events'), eventData);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('There was an error saving your data. Please try again.');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        handleEventClick,
        handleInterestLevelChange,
        handleContinueClick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
