// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../src/redux/store';
import { checkAuth } from './features/auth/authThunks';
import CometBackground from './components/CometBackground';

// Dispatch checkAuth when app loads
store.dispatch(checkAuth());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);