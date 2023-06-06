// TaskItem.js
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';

const TaskItem = ({ task, deleteTask, editTask }) => {
  const handleEdit = () => {
    editTask(task);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="date">Due Date: {task.dueDate}</p>
      </div>
      <div className="icons">
        <AiFillEdit
          onClick={handleEdit}
          className="edit-icon"
          style={{ fontSize: '20px', cursor: 'pointer' }}
        />
        <RiCloseCircleLine
          onClick={handleDelete}
          className="delete-icon"
          style={{ fontSize: '20px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default TaskItem;
