import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../contexts/AuthContext";

import './RootLayout.css';

const RootLayout = () => {

    const logout = useLogout();

    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="root-layout">

            <nav className="navbar">
                
                {user && 

                <div className="logged-in-navbar-navigation-container">

                    <div className="links-div">
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/'>My Portfolio</NavLink>
                    </div>

                    <div className="logout-div">
                        <p>{user.email}</p>
                        <button className="material-symbols-rounded logout-button" onClick={handleLogout}>logout</button>
                    </div>

                </div>}



                {!user &&

                <div className="login-signup-navbar-navigation-container">
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Sign up</NavLink>
                </div>}

            </nav>
            
            <Outlet />

        </div>
    );
}
 
export default RootLayout;