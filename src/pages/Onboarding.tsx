import React, { useState } from 'react';
import StepA from '../components/StepA.tsx';
import StepB from '../components/StepB.tsx';
import StepC from '../components/StepC.tsx';
import StepD from '../components/StepD.tsx';

export const purposeList: {purposeText: string, purposeValue: string}[] = [
    {
        purposeText: "Money Transfer",
        purposeValue: "moneyTransfer"
    },
    {
        purposeText: "Payment",
        purposeValue: "payment"
    },
    {
        purposeText: "Bill Payment",
        purposeValue: "billPayment"
    },
    {
        purposeText: "Loan",
        purposeValue: "loan"
    },
    {
        purposeText: "Investment",
        purposeValue: "investment"
    },
    {
        purposeText: "Saving",
        purposeValue: "saving"
    }
]
const Onboarding: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [data, setData] = useState({
        fullName: '',
        idNumber: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        purposes: [] as string[],
    });
    const [sequenceOption, setSequenceOption] = useState<number>(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePurposeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setData((prevData) => {
            if (checked) {
                return {
                    ...prevData,
                    purposes: [...prevData.purposes, value],
                };
            } else {
                return {
                    ...prevData,
                    purposes: prevData.purposes.filter((purpose) => purpose !== value),
                };
            }
        });
    };

    const handleSequenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = parseInt(event.target.value);
        setSequenceOption(selectedOption);
        setStep(0); // Reset step when sequence changes
    };

    const renderStep = () => {
        let stepSequence: React.FC<any>[] = [];
        if (sequenceOption === 1) {
            stepSequence = [StepA, StepB, StepC];
        } else if (sequenceOption === 2) {
            stepSequence = [StepA, StepC, StepB];
        }

        if (step < stepSequence.length) {
            const StepComponent: React.FC<any> = stepSequence[step];
            return (
                <StepComponent
                    data={data}
                    onChange={handleInputChange}
                    onBack={handleBack}
                    onNext={handleNext}
                    onComplete={handleNext}
                    onPurposeSelection={handlePurposeSelection}
                />
            );
        } else {
            return <StepD data={data} />;
        }
    };


    return (
        // For scope of assignment, I'm using Tailwind css for UI. It would be better to writing classes system also but now
        // I just use default mocules classes of Tailwinds
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
                <h1 className="text-3xl font-bold mb-6">Onboarding Flow</h1>
                <div className="mb-4">
                    <label htmlFor="sequenceSelect" className="mr-2">
                        Select Sequence:
                    </label>
                    <select
                        id="sequenceSelect"
                        className="border rounded p-2"
                        value={sequenceOption}
                        onChange={handleSequenceChange}
                    >
                        <option value={1}>A - B - C</option>
                        <option value={2}>A - C - B</option>
                    </select>
                </div>
                {renderStep()}
            </div>
        </div>
    );
};

export default Onboarding;
