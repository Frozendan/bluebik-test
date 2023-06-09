import React from 'react';
import {purposeList} from "../pages/Onboarding.tsx";

interface StepCProps {
    data: {
        purposes: string[];
    };
    onPurposeSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBack: () => void;
    onComplete: () => void;
}

const StepC: React.FC<StepCProps> = ({ data, onPurposeSelection, onBack, onComplete }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step C - Purpose</h2>
            <ul className="m-0">
                {purposeList.map(item => <li key={item.purposeValue} className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="purpose"
                            role="checkbox"
                            value={item.purposeValue}
                            checked={data.purposes.includes(item.purposeValue)}
                            onChange={onPurposeSelection}
                            className="mr-2"
                        />
                        {item.purposeText}
                    </label>
                </li>)}
            </ul>
            <div className="mt-6 flex justify-end">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded  mr-2" onClick={onBack}>
                    Back
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onComplete}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepC;
