import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import StepA from './StepA';

describe('StepA Component', () => {

    test('triggers validation with invalid data', async () => {
        const data = {
            fullName: '',
            idNumber: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            purposes: [],
        };
        const onChange = jest.fn();
        const onNext = jest.fn();

        render(<StepA data={data} onChange={onChange} onNext={onNext} />);

        const nextButton = screen.getByText('Next');

        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('ID is required')).toBeInTheDocument();
        })

    });

    test('triggers onNext event when the Next button is clicked with valid data', () => {
        const data = {
            fullName: 'John Doe',
            idNumber: '123456789',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            purposes: [],
        };
        const onChange = jest.fn();
        const onNext = jest.fn();

        render(<StepA data={data} onChange={onChange} onNext={onNext} />);

        const nextButton = screen.getByText('Next');

        fireEvent.click(nextButton);

        expect(onNext).toHaveBeenCalledTimes(1);
    });
});