// src/utils/saveProfileData.js

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Function to save user profile data in Firestore
export const saveProfileData = async (userId, userData) => {
  try {
    // Create a reference to the user's document in the "users" collection
    const userRef = doc(db, "users", userId);

    // Set the data for the user
    await setDoc(userRef, userData);

    console.log("Profile data saved successfully!");
  } catch (error) {
    console.error("Error saving profile data:", error);
  }
};
