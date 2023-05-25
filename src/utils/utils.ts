
export const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};
export const validateDateOfBirth = (dateOfBirth: string) => {
    // Assuming `dateOfBirth` is in the format "YYYY-MM-DD"
    const yearOfBirth = parseInt(dateOfBirth.substr(0, 4));
    return yearOfBirth < 2010;
};

export const validatePhoneNumber = (phoneNumber: string) => {
    // Phone number validation using regular expression
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
};