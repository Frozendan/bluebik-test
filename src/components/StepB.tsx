import React, {useState} from 'react';
import {validateDateOfBirth, validatePhoneNumber, validateEmail} from "../utils/utils.ts";

interface StepBProps {
    data: {
        email: string;
        phoneNumber: string;
        dateOfBirth: string;
    };

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBack: () => void;
    onNext: () => void;
}

interface Errors {
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
}

const errorsCopy: Errors = {
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
};

const StepB: React.FC<StepBProps> = ({ data,onChange, onBack, onNext }) => {
    const [errors, setErrors] = useState<Errors>(errorsCopy);

    // For simplify setting up project, I create simple validation. In realife we can use libraries for doing validation
    // such as Formik

    const validateStepB = () => {
        let isValid = true;
        setErrors({...errorsCopy});
        const { email, phoneNumber, dateOfBirth } = data;

        if (email.trim() === '') {
            setErrors(prev => ({ ...prev, email : 'Email is required' }));
            isValid = false;
        } else if (!validateEmail(email)) {
            setErrors(prev => ({ ...prev, email : 'Invalid email format' }));
            isValid = false;
        }

        if (phoneNumber.trim() === '') {
            setErrors(prev => ({ ...prev, phoneNumber : 'Phone Number is required' }));
            isValid = false;
        } else if (!validatePhoneNumber(phoneNumber)) {
            setErrors(prev => ({ ...prev, phoneNumber : 'Invalid phone number format (10 decimal characters)' }));
            isValid = false;
        }

        if (dateOfBirth.trim() === '') {
            setErrors(prev => ({ ...prev, dateOfBirth : 'Date of Birth is required' }));
            isValid = false;
        } else if (!validateDateOfBirth(dateOfBirth)) {
            setErrors(prev => ({ ...prev, dateOfBirth : 'Date of Birth must be earlier than 2010' }));
            isValid = false;
        }

        isValid && onNext();
    };
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Step B - Additional Information</h2>
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="border rounded p-2"
                    value={data.email}
                    onChange={onChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="border rounded p-2"
                    value={data.phoneNumber}
                    onChange={onChange}
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>
            <div>
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    className="border rounded p-2"
                    value={data.dateOfBirth}
                    onChange={onChange}
                />
                {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
            </div>
            <div className="mt-6">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded  mr-2" onClick={onBack}>
                    Back
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateStepB}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepB;