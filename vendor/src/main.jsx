import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { installAxiosProxy } from './lib/apiBase';
import './index.css';
import App from './App.jsx';

installAxiosProxy(axios);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
