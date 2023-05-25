import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Onboarding from './Onboarding.tsx';

describe('Onboarding Component', () => {
    test('renders Step A with all required fields', () => {
        render(<Onboarding />);

        const fullNameInput = screen.getByPlaceholderText('Full Name');
        const idNumberInput = screen.getByPlaceholderText('ID Number');

        expect(fullNameInput).toBeInTheDocument();
        expect(idNumberInput).toBeInTheDocument();

    });

    test('proceeds to the next step when all fields are valid', () => {
        render(<Onboarding />);

        const fullNameInput = screen.getByPlaceholderText('Full Name');
        const idNumberInput = screen.getByPlaceholderText('ID Number');

        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(idNumberInput, { target: { value: '1234567890' } });

        fireEvent.click(screen.getByText('Next'));

        const emailInput = screen.getByPlaceholderText('Email Address');
        const phoneNumberInput = screen.getByPlaceholderText('Phone Number');
        const dateOfBirthInput = screen.getByPlaceholderText('Date of Birth');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
        fireEvent.change(dateOfBirthInput, { target: { value: '1990-01-01' } });

        fireEvent.click(screen.getByText('Next'));

        const checkboxes = screen.getAllByRole('checkbox');

        fireEvent.click(checkboxes[3]);

        const completeButton = screen.getByText('Next');

        fireEvent.click(completeButton);

        const stepDTitle = screen.getByText('Review Information');

        expect(stepDTitle).toBeInTheDocument();

    });
});

describe('Onboarding - Change Step Order', () => {
    it('changes step order when selecting a different sequence', () => {
        render(<Onboarding />);

        // Select the dropdown for step sequence
        const dropdown = screen.getByTestId('step-sequence-dropdown');
        // Change the value of the dropdown to the second option
        fireEvent.change(dropdown, { target: { value: '2' } });
        const fullNameInput = screen.getByPlaceholderText('Full Name');
        const idNumberInput = screen.getByPlaceholderText('ID Number');

        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(idNumberInput, { target: { value: '1234567890' } });

        fireEvent.click(screen.getByText('Next'));


        // Check if the StepC component is rendered before StepB
        expect(screen.getByText('Step C - Purpose')).toBeInTheDocument();
        expect(screen.queryByText('Step B - Additional Information')).toBeNull();

        // Proceed to the next step
        fireEvent.click(screen.getByText('Next'));


        // Check if StepB is rendered after StepC
        expect(screen.getByText('Step B - Additional Information')).toBeInTheDocument();
        expect(screen.queryByText('Step C - Purpose')).toBeNull();
    });
});