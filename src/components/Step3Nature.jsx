import React from 'react';
import { useForm } from '../context/FormContext';
import { BriefcaseMedical, Stethoscope, HeartPulse, BookOpen, Bike, FileText } from 'lucide-react';

const Step3Nature = () => {
    const { formData, updateFormData, nextStep, prevStep } = useForm();
    const { requestType } = formData;

    const requestOptions = [
        { id: 'Support', label: 'Workload Support', sub: 'Defect coverage / Extra room', icon: Stethoscope },
        { id: 'Sick', label: 'Sick Leave', sub: 'Unplanned illness', icon: HeartPulse },
        { id: 'Emergency', label: 'Personal Emergency', sub: 'Family / 1st Degree', icon: BriefcaseMedical },
        { id: 'Study', label: 'Study / Exam', sub: 'Preparation', icon: BookOpen },
        { id: 'Military', label: 'Military Leave', sub: 'Paperwork / Service', icon: Bike }, // Bike as placeholder/metaphor for movement/service
        { id: 'Thesis', label: 'Thesis Defense', sub: 'Protocol / Defense', icon: FileText },
    ];

    const handleSelect = (id) => {
        updateFormData('requestType', id);
        // Optional: Auto-advance on selection for smoother flow? 
        // Let's keep manual next to review selection
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800">What kind of request is this?</h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {requestOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = requestType === option.id;
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex flex-col gap-3 h-full
                                ${isSelected
                                    ? 'border-hospital-blue-500 bg-hospital-blue-50 ring-2 ring-hospital-blue-200 ring-offset-1'
                                    : 'border-gray-200 hover:border-hospital-blue-300 hover:shadow-md bg-white'}`}
                        >
                            <div className={`p-2 rounded-lg w-fit ${isSelected ? 'bg-hospital-blue-200 text-hospital-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className={`font-semibold ${isSelected ? 'text-hospital-blue-900' : 'text-gray-900'}`}>{option.label}</h3>
                                <p className="text-xs text-gray-500 mt-1">{option.sub}</p>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    onClick={prevStep}
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={nextStep}
                    disabled={!requestType}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors
                        ${requestType ? 'bg-hospital-blue-600 hover:bg-hospital-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default Step3Nature;
