import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import Login from '../Login';
import { act } from 'react-dom/test-utils';


const MockLogin = () => {

    const mockSetUser = jest.fn();
    const mockUser = null;


    const mockSetPortfolioData = jest.fn();
    const mockPortfolioData = null;


    return (  
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
            <DataContext.Provider value={{ portfolioData: mockPortfolioData, setPortfolioData: mockSetPortfolioData }}>
                <Login />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}


describe('tests for component: Login', () => {

    test('properly renders elements when component loads', () => {
        render(<MockLogin />);

        expect(screen.getAllByText('Login')).toHaveLength(2);
        expect(screen.getByText('Email')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument(); 
    });


    test('should alert to user to fill in all input fields', async () => {
        render(<MockLogin />);

        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(loginButton).toBeInTheDocument();
        fireEvent.click(loginButton);
        
        expect(alertMock).toHaveBeenCalledTimes(1);
    });


});
