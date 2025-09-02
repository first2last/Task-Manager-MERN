import React from 'react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-info">
          <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span className={`task-status ${task.status}`}>
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
            <span>Created: {formatDate(task.createdAt)}</span>
          </div>
        </div>
        <div className="task-actions">
          <button
            onClick={() => onToggle(task._id, task.status === 'pending' ? 'completed' : 'pending')}
            className="btn-small btn-toggle"
          >
            {task.status === 'pending' ? 'Complete' : 'Reopen'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="btn-small btn-edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn-small btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
