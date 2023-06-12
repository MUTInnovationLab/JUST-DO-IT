import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGlMisk1-FhAwadqkpVHz716IGEJlqxuQ",
    authDomain: "just-do-it-b69f3.firebaseapp.com",
    projectId: "just-do-it-b69f3",
    storageBucket: "just-do-it-b69f3.appspot.com",
    messagingSenderId: "854052536774",
    appId: "1:854052536774:web:e1dc9efcbd04c9ece632c7",
    measurementId: "G-BK1VHG6HZ0"
  };
  

initializeApp(firebaseConfig);

const database = getDatabase();


const auth = getAuth();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
