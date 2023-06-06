
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <div className="todo-app">
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

