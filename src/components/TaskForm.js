import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ addTask, editTask }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(''); // New state for time
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setId(editTask.id);
      setTitle(editTask.title);
      setDueDate(editTask.dueDate);
      setDescription(editTask.description);
      setTime(editTask.time); // Set the time from editTask
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

    const task = { id, title, dueDate, description, time }; // Include time in task object
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

  const handleSpeechToText = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript;

      if (speechToText.includes('title')) {
        const extractedTitle = speechToText.split('title')[1].trim();
        setTitle(extractedTitle);
      }

      if (speechToText.includes('due date')) {
        const extractedDate = speechToText.split('due date')[1].trim();
        setDueDate(extractedDate);
      }

      if (speechToText.includes('description')) {
        const extractedDescription = speechToText.split('description')[1].trim();
        setDescription(extractedDescription);
      }

      if (speechToText.includes('time')) { // Handle time speech input
        const extractedTime = speechToText.split('time')[1].trim();
        setTime(extractedTime);
      }
    };
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
    </form>
  );
};

export default TaskForm;
