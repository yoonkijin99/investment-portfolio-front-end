import { render, screen, fireEvent } from '@testing-library/react';
import DisplayTypeSelector from '../DisplayTypeSelector';



const mockSetCurrentlyDisplayedData = jest.fn();

describe('tests for component: DisplayTypeSelector', () => {

    test('properly renders elements when component loads:', () => {
        render(<DisplayTypeSelector setCurrentlyDisplayedData={mockSetCurrentlyDisplayedData} />);

        expect(screen.getByText('Display:')).toBeInTheDocument();

        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('properly displays selector options', () => {
        render(<DisplayTypeSelector setCurrentlyDisplayedData={mockSetCurrentlyDisplayedData} />);

        const options = screen.getAllByRole('option');

        expect(options).toHaveLength(3);

        expect(options[0]).toHaveValue('portfolioPct');
        expect(options[0]).toHaveTextContent('Portfolio Performance (%)');

        expect(options[1]).toHaveValue('positionsPct');
        expect(options[1]).toHaveTextContent('Positions (%)');

        expect(options[2]).toHaveValue('positionsDollar');
        expect(options[2]).toHaveTextContent('Positions ($)');
    });

    test('calls setCurrentlyDisplayedData function when an option is selected     i.e. when a change takes place in the value', () => {
        render(<DisplayTypeSelector setCurrentlyDisplayedData={mockSetCurrentlyDisplayedData} />);

        const selector = screen.getByRole('combobox');
        fireEvent.change(selector, { target: { value: 'positionsPct' } });

        expect(mockSetCurrentlyDisplayedData).toHaveBeenCalledWith('positionsPct');
    });

})