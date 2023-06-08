import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ addTask, editTask }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setId(editTask.id);
      setTitle(editTask.title);
      setDueDate(editTask.dueDate);
    } else {
      setId('');
      setTitle('');
      setDueDate('');
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

    const task = { id, title, dueDate };
    if (editTask) {
      addTask(task);
    } else {
      addTask(task);
      setId('');
      setTitle('');
      setDueDate('');
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
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
