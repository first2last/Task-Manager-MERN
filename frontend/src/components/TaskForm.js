import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialTask = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description || ''
      });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [initialTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      if (!initialTask) {
        setFormData({ title: '', description: '' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task description (optional)"
        value={formData.description}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit" className="btn-success">
          {initialTask ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
