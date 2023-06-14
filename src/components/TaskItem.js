import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const TaskItem = ({ task, deleteTask, editTask }) => {
  const [showDetails, setShowDetails] = useState(false); // State to control showing/hiding details

  const handleEdit = () => {
    editTask(task);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the state to show/hide details
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-title" onClick={handleToggleDetails}>
          {task.title}
        </h3>
        {showDetails && (
          <div>
            <p className="date">Due Date: {task.dueDate}</p>
            <p className="time">Time: {task.time}</p>
            <textarea
              readOnly
              className="task-description"
              value={task.description}
            />
          </div>
        )}
      </div>
      <div className="icons">
        <button type="button" onClick={handleEdit} className="edit-icon" title="Edit Task">
          <AiFillEdit />
        </button>
        <button type="button" onClick={handleDelete} className="delete-icon" title="Delete Task">
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
