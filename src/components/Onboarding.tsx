import React, { useState } from 'react';
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepD from './StepD';

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

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    // const handleComplete = () => {
    //     console.log(data)
    // };

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

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <StepA
                        data={data}
                        onChange={handleInputChange}
                        onNext={() =>handleNext()}
                    />
                );
            case 1:
                return (
                    <StepB
                        data={data}
                        onChange={handleInputChange}
                        onBack={handleBack}
                        onNext={handleNext}
                    />
                );
            case 2:
                return (
                    <StepC
                        data={data}
                        onChange={handlePurposeSelection}
                        onBack={handleBack}
                        onComplete={handleNext}
                    />
                );
            case 3:
                return (
                    <StepD
                        data={data}
                    />
                );
            default:
                return null;
        }
    };

    return (
        // For scope of assignment, I'm using Tailwind css for UI. It would be better to writing classes system also but now
        // I just use default mocules classes of Tailwinds
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
                <h1 className="text-3xl font-bold mb-6">Onboarding Flow</h1>
                {renderStep()}
            </div>
        </div>
    );
};

export default Onboarding;
