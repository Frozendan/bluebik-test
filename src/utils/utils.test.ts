import { validateEmail, validatePhoneNumber, validateDateOfBirth } from './utils';

describe('Email Validation', () => {
    test('valid email format should return true', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    test('invalid email format should return false', () => {
        expect(validateEmail('invalidemail')).toBe(false);
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('@example.com')).toBe(false);
    });
});

describe('Phone Number Validation', () => {
    test('valid phone number format should return true', () => {
        expect(validatePhoneNumber('1234567890')).toBe(true);
    });

    test('invalid phone number format should return false', () => {
        expect(validatePhoneNumber('12345')).toBe(false);
        expect(validatePhoneNumber('abcdefghij')).toBe(false);
        expect(validatePhoneNumber('12-345-6789')).toBe(false);
    });
});

describe('Date of Birth Validation', () => {
    test('valid date of birth should return true', () => {
        expect(validateDateOfBirth('2000-01-01')).toBe(true);
    });

    test('invalid date of birth should return false', () => {
        expect(validateDateOfBirth('2012-05-18')).toBe(false);
        expect(validateDateOfBirth('1990-12-31')).toBe(true);
        expect(validateDateOfBirth('2025-01-01')).toBe(false);
    });
});