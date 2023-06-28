import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import Position from '../Position';
import { act } from 'react-dom/test-utils';


const MockPosition = ({ symbol, shares, date, positionPctMvt }) => {

    const mockSetUser = jest.fn();
    const mockUser = {
            email: 'mockEmail',
            token: 'mockToken' 
        }

    const mockSetPortfolioData = jest.fn();
    const mockPortfolioData = null;

    return (     
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
            <DataContext.Provider value={{ portfolioData: mockPortfolioData, setPortfolioData: mockSetPortfolioData }}>
                <Position symbol={symbol} shares={shares} date={date} positionPctMvt={positionPctMvt} />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}

beforeEach(() => {
    fetch.resetMocks();
});


describe('tests for component: Position', () => {
    
    const mockPositionPctMvt = [
        {
            pct: 2.111,
            Timestamp: '100T000'
        },
        {
            pct: 1.111,
            Timestamp: '000T000'
        }
    ]

    test('properly renders elements when component loads', () => {
        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={mockPositionPctMvt} />);

        expect(screen.getByText('TSLA')).toBeInTheDocument();
        expect(screen.getByText('3 SHARES')).toBeInTheDocument();
        expect(screen.getByText('2020-05-05')).toBeInTheDocument();
    });

    test('renders position percentage properly based on +/-', () => {

        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={mockPositionPctMvt} />);
        expect(screen.getByText('+1.11%')).toBeInTheDocument();

        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={[{ pct: -1.111, Timestamp: '000T000'}]} />);
        expect(screen.getByText('-1.11%')).toBeInTheDocument();

    });

    test('test opening up form via Edit Position button, then closing it again via the close(x) button', () => {

        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={mockPositionPctMvt} />);

        const openFormButton = screen.getByRole('button', { name: 'Edit Position' })
        expect(openFormButton).toBeInTheDocument(); 
        expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument(); 
        expect(screen.getByText('+1.11%')).toBeInTheDocument();


        fireEvent.click(openFormButton);

        const closeFormButton = screen.getByRole('button', { name: 'close' });

        expect(closeFormButton).toBeInTheDocument(); 
        expect(screen.getByText('Shares')).toBeInTheDocument();

        fireEvent.click(closeFormButton);

        expect(screen.getByRole('button', { name: 'Edit Position' })).toBeInTheDocument(); 
        expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument(); 
        expect(screen.getByText('+1.11%')).toBeInTheDocument();

    });

    test('test clicking delete button - mock fetch API request for DELETE', async () => {

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

        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={mockPositionPctMvt} />);


        const deleteButton = screen.getByRole('button', { name: 'delete' })
        expect(deleteButton).toBeInTheDocument(); 
        await act( async () => {
            fireEvent.click(deleteButton);
        });

        
        expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/deleteposition', 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer mockToken`
            },
            body: "{\"email\":\"mockEmail\",\"symbol\":\"TSLA\",\"date\":\"2020-05-05\"}"
        });
        expect(fetch).toHaveBeenNthCalledWith(2, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
        {
            headers: {
                'Authorization': `Bearer mockToken`
            }
        });

        expect(fetch).toBeCalledTimes(2);
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

        render(<MockPosition symbol={'TSLA'} shares={'3'} date={'2020-05-05'} positionPctMvt={mockPositionPctMvt} />);

        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 


        const deleteButton = screen.getByRole('button', { name: 'delete' })
        expect(deleteButton).toBeInTheDocument(); 
        await act( async () => {
            fireEvent.click(deleteButton);
        });

        
        expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/deleteposition', 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer mockToken`
            },
            body: "{\"email\":\"mockEmail\",\"symbol\":\"TSLA\",\"date\":\"2020-05-05\"}"
        });
        expect(fetch).toHaveBeenNthCalledWith(2, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
        {
            headers: {
                'Authorization': `Bearer mockToken`
            }
        });

        expect(alertMock).toHaveBeenCalledTimes(1);

        expect(fetch).toBeCalledTimes(2);
    });


});
