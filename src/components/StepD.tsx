import React from 'react';
import {purposeList} from "../pages/Onboarding.tsx";
interface StepDProps {
    data: {
        fullName: string,
        idNumber: string,
        email: string,
        phoneNumber: string,
        dateOfBirth: string,
        purposes: string[],
    };
}
const StepD: React.FC<StepDProps> = ({data}) => {
    const filteredPurposesList = () => {
        const matchedList = purposeList.filter(item => data.purposes.includes(item.purposeValue)).map(item => item.purposeText);
        return matchedList.join(', ');
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Review Information</h2>
            <div className="text-left">
                <p className="mb-2">
                    <span className="font-semibold">Name:</span> {data.fullName}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">ID:</span> {data.idNumber}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Email:</span> {data.email}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Phone Number:</span> {data.phoneNumber}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Date of Birth:</span> {data.dateOfBirth}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Purpose:</span> {filteredPurposesList()}
                </p>
            </div>

        </div>
    );
}

export default StepD;