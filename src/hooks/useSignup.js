import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";



export const useSignup = () => {

    const { user, setUser } = useContext(AuthContext);

    const signup = async (email, password) => {

        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/user/signup', {
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

    return signup
}