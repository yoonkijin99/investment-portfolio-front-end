import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import Signup from '../Signup';
import { act } from 'react-dom/test-utils';


const MockSignup = () => {

    const mockSetUser = jest.fn();
    const mockUser = null;


    const mockSetPortfolioData = jest.fn();
    const mockPortfolioData = null;



    return (    
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
            <DataContext.Provider value={{ portfolioData: mockPortfolioData, setPortfolioData: mockSetPortfolioData }}>
                <Signup />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}


describe('tests for component: Signup', () => {

    test('properly renders elements when component loads', () => {
        render(<MockSignup />);

        expect(screen.getAllByText('Sign up')).toHaveLength(2);
        expect(screen.getByText('Email')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument(); 
    });


    test('should alert to user to fill in all input fields', async () => {
        render(<MockSignup />);

        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

        const loginButton = screen.getByRole('button', { name: 'Sign up' });
        expect(loginButton).toBeInTheDocument();
        fireEvent.click(loginButton);
        
        expect(alertMock).toHaveBeenCalledTimes(1);
    });


});
