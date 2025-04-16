import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import InitColorSchemeScript from './components/common/InitColorSchemeScript';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Initialize color scheme before the app renders to prevent flashing */}
    <InitColorSchemeScript defaultMode="light" />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
