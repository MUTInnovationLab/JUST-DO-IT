import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      // Add other Firebase config options if needed
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/'); // Redirect to '/' after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="todo-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-button">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
