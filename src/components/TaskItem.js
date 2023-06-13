import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

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
        <br></br>
        <textarea
          placeholder="Add a description..."
          value={task.description}
          readOnly
          className="task-description"
        />
        <br></br>
        <p className="date">Due Date: {task.dueDate}</p>
        <p className="time">Time: {task.time}</p> {/* Display the time for each task */}
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
