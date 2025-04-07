// src/components/MainApp.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import './mainapp.css';

const MainApp = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-text">
          <h1>Weather-Smart To-Do List</h1>
          <p>Plan your tasks with weather in mind</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <main className="app-main">
        <TaskInput />
        <TaskList />
      </main>
      
      <footer className="app-footer">
        <p>Advanced To-Do Application with Weather API Integration</p>
      </footer>
    </div>
  );
};

export default MainApp;