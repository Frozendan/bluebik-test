import '@testing-library/jest-dom/extend-expect';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import StepB from './StepB';

describe('StepB Component', () => {

    test('triggers validation with invalid required data', async () => {
        const data = {
            fullName: '',
            idNumber: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            purposes: [],
        };
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onNext = jest.fn();

        render(<StepB data={data} onChange={onChange} onBack={onBack} onNext={onNext} />);

        const nextButton = screen.getByText('Next');

        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
            expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
        })

    });


    test('triggers validation with invalid field data', async () => {
        const data = {
            fullName: '',
            idNumber: '',
            email: 'email@invalid',
            phoneNumber: '123456',
            dateOfBirth: '2020-01-01',
            purposes: [],
        };
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onNext = jest.fn();

        render(<StepB data={data} onChange={onChange} onBack={onBack} onNext={onNext} />);

        const nextButton = screen.getByText('Next');

        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid email format')).toBeInTheDocument();
            expect(screen.getByText('Invalid phone number format (10 decimal characters)')).toBeInTheDocument();
            expect(screen.getByText('Date of Birth must be earlier than 2010')).toBeInTheDocument();
        })

    });

    test('triggers onBack event when the Back button is clicked', () => {
        const data = {
            fullName: '',
            idNumber: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            purposes: [],
        };
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onNext = jest.fn();

        render(<StepB data={data} onChange={onChange} onBack={onBack} onNext={onNext} />);

        const backButton = screen.getByText('Back');

        fireEvent.click(backButton);

        expect(onBack).toHaveBeenCalledTimes(1);
    });

    test('triggers onNext event when the Next button is clicked with valid data', () => {
        const data = {
            fullName: '',
            idNumber: '',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            dateOfBirth: '1990-01-01',
            purposes: [],
        };
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onNext = jest.fn();

        render(<StepB data={data} onChange={onChange} onBack={onBack} onNext={onNext} />);

        const nextButton = screen.getByText('Next');

        fireEvent.click(nextButton);

        expect(onNext).toHaveBeenCalledTimes(1);
    });
});
