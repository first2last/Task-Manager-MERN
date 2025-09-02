import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Auth from './components/Auth';
import TaskList from './components/TaskList';

function App() {
  const { user, loading, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Manager</h1>
        {user && (
          <div className="user-info">
            Welcome, {user.name}!
          </div>
        )}
      </header>
      <main className="main-content">
        {user ? <TaskList /> : <Auth />}
      </main>
    </div>
  );
}

export default App;
