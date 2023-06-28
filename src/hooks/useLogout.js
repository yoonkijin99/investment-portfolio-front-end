import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';



export const useLogout = () => {

    const { user, setUser } = useContext(AuthContext);
    const { portfolioData, setPortfolioData } = useContext(DataContext);

    const logout = () => {
        localStorage.removeItem('user');

        setUser(null);
        setPortfolioData(null);
    }

    return logout;

}