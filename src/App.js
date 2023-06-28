import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import { useContext } from 'react';

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// context
import { AuthContext } from './contexts/AuthContext';

import './General.css';



function App() {

  const { user, setUser } = useContext(AuthContext);  



  const router = createBrowserRouter(

    createRoutesFromElements(

      <Route path="/" element={<RootLayout />}>

        <Route path="/" element={user ? <Home /> : <Navigate to={'/login'} />} /> 

        <Route path="about" element={user ? <About /> : <Navigate to={'/login'} />}/>


        <Route path="signup" element={!user ? <Signup /> : <Navigate to={'/about'} />}/>

        <Route path="login" element={!user ? <Login />: <Navigate to={'/'} />} />


        <Route path="*" element={<NotFound />}/>    

      </Route> 

    )
  );

  return (
    <RouterProvider router={router} />
  );
  
}

export default App;