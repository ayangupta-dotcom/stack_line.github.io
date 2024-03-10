// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import { store } from './components/store'; // Update this path to the location of your store file
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals'; // If you're using create-react-app and want to measure performance

// Use createRoot to create a root and then call .render with the app component.
// Use createRoot to create a root and then call .render with the app component.
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container); // Create a root, with a non-null assertion.

root.render( // Render the app in the root.
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// If you're using create-react-app and you want to measure performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
