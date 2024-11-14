// src/App.js
import React from 'react';
import db from './firebase/firebaseConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import UploadProfileImage from './components/UploadProfileImage';
import Events from './components/Events';
import OtherEvents from './components/OtherEvents';
import MatchingProfile from './components/MatchingProfile';
import ChatInterface from './components/ChatInterface';
import Feedback from './components/Feedback';
import GenderSelection from './components/GenderSelection';
import AddSocialLinks from './components/AddSocialLinks';
import ProfileOverview from './components/ProfileOverview';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadProfileImage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/other-events" element={<OtherEvents />} />
            <Route path="/matching-profile" element={<MatchingProfile />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/gender-selection" element={<GenderSelection />} />
            <Route path="/add-social-links" element={<AddSocialLinks />} />
            <Route path="/profile-overview" element={<ProfileOverview />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
