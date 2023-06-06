import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!firebase.auth().currentUser;
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login'); // Redirect to /login if not authenticated
    return null; // Render nothing
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
