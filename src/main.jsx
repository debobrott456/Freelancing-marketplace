import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Components/Home.jsx';

import Details from './Pages/Details.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';

import PrivateRoutes from './Routes/PrivateRoutes.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AcceptedTask from './Pages/AcceptedTask.jsx';
import AddJobs from './Pages/AddJobs.jsx';
import AllJobs from './Pages/AllJobs.jsx';
import MyJobs from './Pages/MyJobs.jsx';
import Update from './Pages/Update.jsx';

const router=createBrowserRouter(
  [{
 path:"/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        
        path:"/",
        loader:()=> fetch('http://localhost:5000/recentJobs'),
        element:<Home></Home>
      },
      {
        path:"/addJobs",
        element:<PrivateRoutes><AddJobs></AddJobs></PrivateRoutes>
      },
      {
        path:"/allJobs",
         loader:()=> fetch('http://localhost:5000/allJobs'),
        element:<AllJobs></AllJobs>
      },
      {
        path:"/details/:id",
        loader:()=> fetch('/http://localhost:5000/allJobs/:id'),
        element:<PrivateRoutes><Details></Details></PrivateRoutes>
      },
      {
        path:"/login",
        Component:Login
      },
      {
       path:"/register",
       Component:Register
      },
      {
        path:"/accepted",
        loader:()=> fetch('/http://localhost:5000/allJobs/:id'),
        element:<PrivateRoutes><AcceptedTask></AcceptedTask></PrivateRoutes>
      },
      {
        path: "/myjobs",
       
        element:<PrivateRoutes><MyJobs></MyJobs></PrivateRoutes>
      },
      {
        path:"/update/:id",
       
        element:<Update></Update>

      }
        
    
    ]
  }]
)   

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  
        <RouterProvider router={router}></RouterProvider>
</AuthProvider>
  </StrictMode>,
)
