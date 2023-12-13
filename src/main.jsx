import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'macro-css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }, 
  {
    path: "/favorites",
    element: <App/>
  }, {
    path: "/orders",
    element: <App/>
  },
  
], { basename: '/React-Sneakers' });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <RouterProvider router={router} />
 
  </React.StrictMode>,
)
