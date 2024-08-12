import { createAsyncThunk} from '@reduxjs/toolkit'
import { addDoc, collection, getDocs, query, where , doc , updateDoc} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '../../services/firebaseConfig'; // Import Firebase auth if needed


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    const templateParams = {
      firstName: values.firstName,
      lastName: values.lastName,
      recipientEmail: values.emailid, // Added recipient email here
    };

    try {
      const userQuery = query(
        collection(db, 'users'),
        where('emailid', '==', values.emailid)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        throw new Error('User already registered');
      } else {
        await addDoc(collection(db, 'users'), values);
        await emailjs.send(
          'service_j10u2dk',
          'template_4zskdgl',
          templateParams,
          '27tcg4v4_jVSFKYqS'
        );

        return { success: true };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ emailid, password }, { rejectWithValue }) => {
    try {
      const userQuery = query(
        collection(db, 'users'),
        where('emailid', '==', emailid),
        where('password', '==', password)
      );

      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData; // Return user data if sign-in is successful
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

export const sendPasswordResetEmail = createAsyncThunk(
  'auth/sendPasswordResetEmail',
  async ({ emailid }, { rejectWithValue }) => {
    const resetId = uuidv4();
    const templateParams = {
      resetLink: `http://localhost:5173/createpassword/${resetId}`
      
    };

    try {
      const userQuery = query(
        collection(db, 'users'),
        where('emailid', '==', emailid)
      );

      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        // Sending the email
        await emailjs.send('service_j10u2dk', 'template_zswuftp', templateParams, '27tcg4v4_jVSFKYqS');
        const params = {
          resetId: resetId,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem('resetId', JSON.stringify(params));
        return true; // Return success
      } else {
        throw new Error('Email not found');
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email }, {  rejectWithValue }) => {
    try {
      // Firebase's password reset functionality
      await auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'auth/updateUserPassword',
  async ({  newPassword }, { rejectWithValue }) => {
    const userDocRef = doc(db, 'users', 'KKMuLgARFAdVQJ1LBj1f'); // Use the actual document ID

    try {
      await updateDoc(userDocRef, { password: newPassword });
      return true; // Return success
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);