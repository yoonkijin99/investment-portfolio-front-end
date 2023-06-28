import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import PositionUpdateForm from '../PositionUpdateForm';
import { act } from 'react-dom/test-utils';



const MockPositionUpdateForm = ({ symbol, date, switchShowPositionUpdateForm }) => {

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
                <PositionUpdateForm symbol={symbol} date={date} switchShowPositionUpdateForm={switchShowPositionUpdateForm} />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}

const mockSwitchshowPositionUpdateForm = jest.fn();

beforeEach(() => {
    fetch.resetMocks();
});

describe('tests for component: PositionUpdateForm', () => {

    test('properly renders elements when component loads', () => {
        render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

        expect(screen.getByText('Shares')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('e.g. 3')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'done' })).toBeInTheDocument(); 
    });

    test('shares input element value should be what user enters', () => {
        render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

        const sharesInput = screen.getByPlaceholderText('e.g. 3');
        fireEvent.change(sharesInput, { target: { value: '5' } });

        expect(sharesInput.value).toBe('5');
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
    
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);
    
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '5' } });
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/editposition', 
            {
                method: 'PATCH',
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
    
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');

            expect(mockSwitchshowPositionUpdateForm).toHaveBeenCalled();
        });

    });





    describe('tests for valid user input into form', () => {

        test('should alert to user to fill in all input fields', async () => {
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
        
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');
        });
        
        test('should alert to user that shares should be a numeric value', async () => {
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: 'abc' } });
    

    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('abc');
        });

        test('should alert to user that shares should not be a decimal number', async () => {
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '1.1' } });
    
        
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('1.1');
        });

        test('should alert to user that shares should be at least 1', async () => {
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '0' } });
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            expect(alertMock).toHaveBeenCalledTimes(1);
        
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('0');
        });




        test('should alert to user that an error took place      ( within function getPositionData )', async () => {
    
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
    
            render(<MockPositionUpdateForm symbol={'TSLA'} date={'2020-05-05'} switchShowPositionUpdateForm={mockSwitchshowPositionUpdateForm} />);

            const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

    
            const sharesInput = screen.getByPlaceholderText('e.g. 3');
            fireEvent.change(sharesInput, { target: { value: '5' } });
    
    
    
    
    
            const submitButton = screen.getByRole('button', { name: 'done' });
            expect(submitButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(submitButton);
            });
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/editposition', 
            {
                method: 'PATCH',
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
    
            expect(screen.getByPlaceholderText('e.g. 3').value).toBe('');

            expect(mockSwitchshowPositionUpdateForm).toHaveBeenCalled();

        });
        
        
    });

});
