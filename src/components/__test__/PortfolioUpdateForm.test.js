import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import PortfolioUpdateForm from '../PortfolioUpdateForm';
import { act } from 'react-dom/test-utils';


const MockPortfolioUpdateForm = ({ switchshowPortfolioUpdateForm }) => {

    const mockSetUser = jest.fn();
    const mockUser = {
            email: 'mockEmail',
            token: 'mockToken' 
        }

    const mockSetPortfolioData = jest.fn();
    const mockPortfolioData = null;

    return (  
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
            <DataContext.Provider value={{ mockPortfolioData: mockPortfolioData, setPortfolioData: mockSetPortfolioData }}>
                <PortfolioUpdateForm switchshowPortfolioUpdateForm={switchshowPortfolioUpdateForm} />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}

const mockSwitchshowPortfolioUpdateForm = jest.fn();

beforeEach(() => {
    fetch.resetMocks();
});

describe('tests for component: PortfolioUpdateForm', () => {

    test('properly renders elements when component loads', () => {
        render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

        expect(screen.getByText('Ticker')).toBeInTheDocument();
        expect(screen.getByText('Shares')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('e.g. AAPL')).toBeInTheDocument();        
        expect(screen.getByPlaceholderText('e.g. 3')).toBeInTheDocument();
        expect(screen.getByTestId('date-input')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'done' })).toBeInTheDocument(); 
    });

    test('ticker input element value should be what user enters', () => {
        render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

        const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
        fireEvent.change(tickerInput, { target: { value: 'TSLA' } });

        expect(tickerInput.value).toBe('TSLA');
    })

    test('shares input element value should be what user enters', () => {
        render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

        const sharesInput = screen.getByPlaceholderText('e.g. 3');
        fireEvent.change(sharesInput, { target: { value: '5' } });

        expect(sharesInput.value).toBe('5');
    })

    test('date input element value should be what user enters', () => {
        render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

        const dateInput = screen.getByTestId('date-input');
        fireEvent.change(dateInput, { target: { value: '2020-05-05' } });

        expect(dateInput.value).toBe('2020-05-05');
    })



    describe('tests for mocking form submit - i.e. mock fetch API requests', () => {
    
        test('', async () => {
    
            fetch.mockResponses(
                [
                    JSON.stringify([]),
                    { status: 200 }
                ],
                [
                    JSON.stringify([]),
                    { status: 200 }
                ]
                );
    
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '5' } });
    
            const dateInput = screen.getByTestId('date-input');
            fireEvent.change(dateInput, { target: { value: '2020-05-05' } });
    
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/addposition', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer mockToken`
                },
                body: "{\"email\":\"mockEmail\",\"symbol\":\"TSLA\",\"date\":\"2020-05-05\",\"shares\":\"5\"}"
            });
            expect(fetch).toHaveBeenNthCalledWith(2, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
            {
                headers: {
                    'Authorization': `Bearer mockToken`
                }
            });

            expect(fetch).toBeCalledTimes(2);
    
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');
            expect(screen.getByTestId('date-input').value).toBe('');

            expect(mockSwitchshowPortfolioUpdateForm).toHaveBeenCalled();
        });

    });





    describe('tests for valid user input into form', () => {

        test('should alert to user to fill in all input fields', async () => {
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
        
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('TSLA');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');
            expect(screen.getByTestId('date-input').value).toBe('');
        });
        
        test('should alert to user that shares should be a numeric value', async () => {
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: 'abc' } });
    
        
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('TSLA');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('abc');
            expect(screen.getByTestId('date-input').value).toBe('');
        });

        test('should alert to user that shares should not be a decimal number', async () => {
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '1.1' } });
    
        
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('TSLA');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('1.1');
            expect(screen.getByTestId('date-input').value).toBe('');
        });

        test('should alert to user that shares should be at least 1', async () => {
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '0' } });
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('TSLA');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('0');
            expect(screen.getByTestId('date-input').value).toBe('');
        });


    
        test('should alert to user that ticker should be a valid symbol', async () => {
    
            fetch.mockResponses(
                [
                    JSON.stringify([]),
                    { status: 404 }
                ]
                );
    
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'notvalidticker' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '5' } });
    
            const dateInput = screen.getByTestId('date-input');
            fireEvent.change(dateInput, { target: { value: '2020-05-05' } });
    
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/addposition', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer mockToken`
                },
                body: "{\"email\":\"mockEmail\",\"symbol\":\"notvalidticker\",\"date\":\"2020-05-05\",\"shares\":\"5\"}"
            });

            expect(alertMock).toHaveBeenCalledTimes(1);

            expect(fetch).toBeCalledTimes(1);
    
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('notvalidticker');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('5');
            expect(screen.getByTestId('date-input').value).toBe('2020-05-05');

        });


        test('should alert to user that an error took place      ( within function getPortfolioData )', async () => {
    
            fetch.mockResponses(
                [
                    JSON.stringify([]),
                    { status: 200 }
                ],
                [
                    JSON.stringify([]),
                    { status: 404 }
                ]
                );
    
            render(<MockPortfolioUpdateForm switchshowPortfolioUpdateForm={mockSwitchshowPortfolioUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const tickerInput = screen.getByPlaceholderText('e.g. AAPL');
            fireEvent.change(tickerInput, { target: { value: 'TSLA' } });
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '5' } });
    
            const dateInput = screen.getByTestId('date-input');
            fireEvent.change(dateInput, { target: { value: '2020-05-05' } });
    
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/addposition', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer mockToken`
                },
                body: "{\"email\":\"mockEmail\",\"symbol\":\"TSLA\",\"date\":\"2020-05-05\",\"shares\":\"5\"}"
            });
            expect(fetch).toHaveBeenNthCalledWith(2, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
            {
                headers: {
                    'Authorization': `Bearer mockToken`
                }
            });

            expect(alertMock).toHaveBeenCalledTimes(1);

            expect(fetch).toBeCalledTimes(2);
    
            expect(screen.getByPlaceholderText('e.g. AAPL').value).toBe('');
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');
            expect(screen.getByTestId('date-input').value).toBe('');

            expect(mockSwitchshowPortfolioUpdateForm).toHaveBeenCalled();

        });
        
        
    });

});
