import { useContext } from "react";

import { AuthContext } from '../contexts/AuthContext'



export const useLogin = () => {

    const { user, setUser } = useContext(AuthContext);

    const login = async (email, password) => {
        
        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();     

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            setUser(json);
        } else {
            return json.error;
        }
    }

    return login;
}

