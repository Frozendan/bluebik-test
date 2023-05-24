import React, {useState} from 'react';

interface StepAProps {
    data: {
        fullName: string;
        idNumber: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
}

interface Errors {
    fullName: string;
    idNumber: string;
}

const errorsCopy: Errors = {
    fullName: '',
    idNumber: '',
};

const StepA: React.FC<StepAProps> = ({ data, onChange, onNext }) => {
    const [errors, setErrors] = useState<Errors>(errorsCopy);

    // For simplify setting up project, I create simple validation. In realife we can use libraries for doing validation
    // such as Formik lib

    const validateStepA = () => {
        let isValid = true;
        setErrors({...errorsCopy});
        const { fullName, idNumber } = data;

        if (fullName.trim() === '') {
            setErrors(prev => ({ ...prev, fullName: 'Name is required' }));
            isValid = false;
        }

        if (idNumber.trim() === '') {
            setErrors(prev => ({ ...prev, idNumber: 'ID is required' }));
            isValid = false;
        }

        isValid && onNext(); // Move to the next step regardless of validation result
    };
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Step A - Basic Information</h2>
            <div className="mb-4">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border rounded p-2"
                    value={data.fullName}
                    onChange={onChange}
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
            </div>
            <div>
                <input
                    type="text"
                    name="idNumber"
                    placeholder="ID Number"
                    className="border rounded p-2"
                    value={data.idNumber}
                    onChange={onChange}
                />
                {errors.idNumber && <p className="text-red-500">{errors.idNumber}</p>}
            </div>
            <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateStepA}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepA;