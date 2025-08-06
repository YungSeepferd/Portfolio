import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import InitColorSchemeScript from './components/common/InitColorSchemeScript';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Initialize color scheme before the app renders to prevent flashing */}
    <InitColorSchemeScript defaultMode="light" />
    <App />
  </React.StrictMode>
);
