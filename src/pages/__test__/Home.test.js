import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import Home from '../Home';
import { act } from 'react-dom/test-utils';


const MockHome = () => {

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
                <Home />
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}

beforeEach(() => {
    fetch.resetMocks();
});

describe('tests for page: Home', () => {

    test('properly renders elements when component loads', async () => {

        fetch.mockResponses(
            [
                JSON.stringify([]),
                { status: 200 }
            ]
        );

        render(<MockHome />);

        
        expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
            {
                headers: {
                    'Authorization': `Bearer mockToken`
                }
            }
        );

        expect(fetch).toBeCalledTimes(1);

        expect(screen.getByText('... LOADING DATA ...')).toBeInTheDocument();
        expect(screen.getByText('Positions')).toBeInTheDocument();

    });


    describe('', () => {

        const MockHomeWithPortfolioDataGlobalStateSet = () => {

            const mockSetUser = jest.fn();
            const mockUser = {
                    email: 'mockEmail',
                    token: 'mockToken' 
                }
        
        
            const mockSetPortfolioData = jest.fn();
            const mockPortfolioData = [
                [
                    [
                        {
                            pct: 2.111,
                            Timestamp: '100T000'
                        },
                        {
                            pct: 1.111,
                            Timestamp: '000T000'
                        }
                    ]
                ],
                [
                    {
                        pct: 2.111,
                        Timestamp: '100T000'
                    },
                    {
                        pct: 1.111,
                        Timestamp: '000T000'
                    }
                ],
                [
                    {
                        email: 'mockEmail',
                        symbol: 'TSLA',
                        date: '000T000',
                    }
                ]
            ];
    
        
            return (       
                <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                    <DataContext.Provider value={{ portfolioData: mockPortfolioData, setPortfolioData: mockSetPortfolioData }}>
                        <Home />
                    </DataContext.Provider>
                </AuthContext.Provider>
            );
        }






        test('test opening up form via Add Position button, then closing it again via the close(x) button', () => {
            

            fetch.mockResponses(
                [
                    JSON.stringify([]),
                    { status: 200 }
                ]
            );
    
            render(<MockHomeWithPortfolioDataGlobalStateSet />);
    
            
            expect(fetch).toHaveBeenNthCalledWith(1, 'https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', 
                {
                    headers: {
                        'Authorization': `Bearer mockToken`
                    }
                }
            );
    
            expect(fetch).toBeCalledTimes(1);
    
            expect(screen.getByText('Portfolio Performance')).toBeInTheDocument();
            expect(screen.getByText('Positions')).toBeInTheDocument();
            expect(screen.getByText('TSLA')).toBeInTheDocument();



            const openFormButton = screen.getByRole('button', { name: 'Add Position' });
            expect(openFormButton).toBeInTheDocument();

            fireEvent.click(openFormButton);

            expect(screen.getByText('Ticker')).toBeInTheDocument();
            expect(screen.getByText('Shares')).toBeInTheDocument();
            expect(screen.getByText('Date')).toBeInTheDocument();

            const closeFormButton = screen.getByRole('button', { name: 'close' });
            expect(closeFormButton).toBeInTheDocument(); 

            fireEvent.click(closeFormButton);


            expect(screen.getByRole('button', { name: 'Add Position' })).toBeInTheDocument(); 

        });

    })



});
