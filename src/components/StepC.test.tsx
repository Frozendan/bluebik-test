import { render, screen, fireEvent } from '@testing-library/react';
import StepC from './StepC';
import {purposeList} from "../pages/Onboarding.tsx";

const testData = {
    fullName: 'John Doe',
    idNumber: '1234567890',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    purposes: ['bill', 'payment'],
}

describe('StepC Component', () => {
    test('renders all purpose checkboxes', () => {
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onComplete = jest.fn();

        render(<StepC data={ testData } onPurposeSelection={onChange} onBack={onBack} onComplete={onComplete} />);
        const checkboxes = screen.getAllByRole('checkbox');

        expect(checkboxes.length).toBe(purposeList.length);
    });

    test('triggers onChange event when a checkbox is clicked', () => {
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onComplete = jest.fn();

        render(<StepC data={ testData } onPurposeSelection={onChange} onBack={onBack} onComplete={onComplete} />);

        const checkboxes = screen.getAllByRole('checkbox');

        fireEvent.click(checkboxes[0]);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    });

    test('triggers onBack event when the Back button is clicked', () => {
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onComplete = jest.fn();

        render(<StepC data={ testData } onPurposeSelection={onChange} onBack={onBack} onComplete={onComplete} />);

        const backButton = screen.getByText('Back');

        fireEvent.click(backButton);

        expect(onBack).toHaveBeenCalledTimes(1);
    });

    test('triggers onComplete event when the Complete button is clicked', () => {
        const onChange = jest.fn();
        const onBack = jest.fn();
        const onComplete = jest.fn();

        render(<StepC data={testData} onPurposeSelection={onChange} onBack={onBack} onComplete={onComplete} />);

        const completeButton = screen.getByText('Next');

        fireEvent.click(completeButton);

        expect(onComplete).toHaveBeenCalledTimes(1);
    });
});