import React from 'react';
import { useForm } from '../context/FormContext';
import { User, Phone, GraduationCap } from 'lucide-react';

const Step2Resident = () => {
    const { formData, updateFormData, nextStep, prevStep } = useForm();
    const { residentName, residencyYear, mobileNumber } = formData;

    const isValid = residentName.trim().length > 3 &&
        residencyYear !== '' &&
        /^\d{10,}$/.test(mobileNumber.replace(/\D/g, '')); // Basic numeric validation

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-hospital-blue-600" />
                Resident Details
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={residentName}
                            onChange={(e) => updateFormData('residentName', e.target.value)}
                            placeholder="e.g. Dr. Magdy Ahmed"
                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residency Year</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <select
                            value={residencyYear}
                            onChange={(e) => updateFormData('residencyYear', e.target.value)}
                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none bg-white"
                        >
                            <option value="">-- Select Year --</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => updateFormData('mobileNumber', e.target.value)}
                            placeholder="e.g. 01xxxxxxxxx"
                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none"
                        />
                    </div>
                    {mobileNumber && !/^\d{10,}$/.test(mobileNumber.replace(/\D/g, '')) && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid mobile number</p>
                    )}
                </div>
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
                    disabled={!isValid}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors
                        ${isValid ? 'bg-hospital-blue-600 hover:bg-hospital-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default Step2Resident;
