import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {UserProvider} from './context/UserContext'


import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
    <UserProvider >
      <ChakraProvider>
      <App />
      </ChakraProvider>
    </UserProvider>
  // </React.StrictMode>
);

reportWebVitals();
