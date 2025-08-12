// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import the necessary intro.js CSS files
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css'; // You can choose a different theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);