import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import api from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/api/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? response.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleStatus = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-section">
      <div className="task-header">
        <h2>My Tasks</h2>
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
            style={{ marginRight: '1rem' }}
          >
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          onSubmit={handleUpdateTask}
          onCancel={handleCancelEdit}
          initialTask={editingTask}
        />
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggleStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
