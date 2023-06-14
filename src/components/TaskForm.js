import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';


const TaskForm = ({ addTask, editTask }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editTask) {
      setId(editTask.id);
      setTitle(editTask.title);
      setDueDate(editTask.dueDate);
      setDescription(editTask.description);
      setTime(editTask.time);
    } else {
      setId('');
      setTitle('');
      setDueDate('');
      setDescription('');
      setTime('');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    if (dueDate === '') {
      setError('Due date must be selected');
      return;
    }

    if (time === '') {
      setError('Time must be selected');
      return;
    }

    const task = { id, title, dueDate, description, time };
    if (editTask) {
      addTask(task);
    } else {
      addTask(task);
      setId('');
      setTitle('');
      setDueDate('');
      setDescription('');
      setTime('');
    }
    setError('');
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSpeechToText = () => {
    // Speech to text code here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
        />
        <button type="button" onClick={handleSpeechToText} className="microphone-button">
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
      />
      <div className="datetime-container">
        <input
          type="datetime-local"
          value={dueDate && time ? `${dueDate}T${time}` : ''}
          onChange={(e) => {
            const [newDueDate, newTime] = e.target.value.split('T');
            setDueDate(newDueDate);
            setTime(newTime);
          }}
          className="todo-input"
        />
      </div>
      <button type="submit" className="todo-button">
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
      <br />
      <button className="todo-button" onClick={handleLogout}>
        Logout
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default TaskForm;
