import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you’re sure the element exists.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
