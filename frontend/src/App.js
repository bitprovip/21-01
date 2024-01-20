import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// useEffect, useState,
import {  useContext } from "react";
import AppRoutes from './routes/AppRoutes'

import {Rings} from 'react-loader-spinner'
import { UserContext } from './context/UserContext';
import '@goongmaps/goong-js/dist/goong-js.css';
import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'


function App() {
  const { user } = useContext(UserContext)
  
  return (
  <>
    <Router>
      {user && user.isLoading ?
        <div className='loading-container'>
          <Rings
            height='100'
            width="100"
            color='#1877f2'
            ariaLabel='loading'
          />
          <div>loading data...</div>
        </div>
        :
        <>
          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      }
    </Router>

    
    <ToastContainer 
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover

    />
    </>
  );
}

export default App;
