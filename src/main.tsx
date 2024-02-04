import React from 'react';
import ReactDOM from 'react-dom/client';
import { worker } from 'mocks/browser';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';

if (import.meta.env.MODE === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
