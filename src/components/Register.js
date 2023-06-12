

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize Firebase with your configuration
  if (!firebase.apps.length) {
    firebase.initializeApp({
         apiKey: "AIzaSyAGlMisk1-FhAwadqkpVHz716IGEJlqxuQ",
    authDomain: "just-do-it-b69f3.firebaseapp.com",
    projectId: "just-do-it-b69f3",
    storageBucket: "just-do-it-b69f3.appspot.com",
    messagingSenderId: "854052536774",
    appId: "1:854052536774:web:e1dc9efcbd04c9ece632c7",
    measurementId: "G-BK1VHG6HZ0"

      // Firebase config options
    });
  }

  const handleRegister = async (provider) => {
    try {
      let authProvider = null;

      if (provider === 'google') {
        authProvider = new firebase.auth.GoogleAuthProvider();
      } else if (provider === 'microsoft') {
        authProvider = new firebase.auth.OAuthProvider('microsoft.com');
      }

      if (authProvider) {
        await firebase.auth().signInWithPopup(authProvider);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button  className="todo-button" onClick={() => handleRegister('google')}> <FontAwesomeIcon icon={faGoogle} className="button-icon" /> <b>Register with Google</b></button>
      <br></br>
      <button  className="todo-button" onClick={() => handleRegister('microsoft')}><FontAwesomeIcon icon={faMicrosoft} className="button-icon" /> <b>Register with Microsoft</b></button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
