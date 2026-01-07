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
import FAQ from './Pages/FAQ.jsx';
import About from './Pages/About.jsx';
import DashboardLayout from './Pages/DashboardLayout.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyProfile from './Pages/MyProfile.jsx';
const queryClient=new QueryClient();
const router=createBrowserRouter(
  [{
 path:"/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        
        path:"/",
        loader:()=> fetch('https://3dserver.vercel.app/recentJobs'),
        element:<Home></Home>
      },
   
      {
        path:"/allJobs",
        //  loader:()=> fetch('https://3dserver.vercel.app/allJobs'),
        element:<AllJobs></AllJobs>
      },
      {
        path:"/details/:id",
        loader:()=> fetch('https://3dserver.vercel.app/allJobs/:id'),
        element:<Details></Details>
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
       path: "/faq",
       Component:FAQ
      },
      {
      path : "/about",
      Component:About
      },
 
        
    
    ]
  }
,
{
   path:"/dashboard",
   element:<DashboardLayout></DashboardLayout>,

   children:[
        {
        path:"accepted",
        loader:()=> fetch('https://3dserver.vercel.app/allJobs/:id'),
        element:<PrivateRoutes><AcceptedTask></AcceptedTask></PrivateRoutes>
      },
      {
        path: "myjobs",
       
        element:<PrivateRoutes><MyJobs></MyJobs></PrivateRoutes>
      },
      {
        path:"update/:id",
       
        element:<Update></Update>

      },
      {
        path:"addJobs",
        element:<PrivateRoutes><AddJobs></AddJobs></PrivateRoutes>
      },
      {
        path: "profile",
        element:<MyProfile></MyProfile>
      }

   ]
    
  }
]
)   

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>  <AuthProvider>  
        <RouterProvider router={router}></RouterProvider>
</AuthProvider> </QueryClientProvider>
  </StrictMode>, 
)
