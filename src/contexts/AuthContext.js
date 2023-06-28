import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        
        const savedUser = JSON.parse(localStorage.getItem('user'));

        if (savedUser) {
            setUser(savedUser);
        }   

    }, []);

    return ( 
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;