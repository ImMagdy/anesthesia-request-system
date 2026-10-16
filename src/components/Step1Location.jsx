import React from 'react';
import { useForm } from '../context/FormContext';
import { MapPin, ArrowRight } from 'lucide-react';

const Step1Location = () => {
    const { formData, updateFormData, nextStep, lists, isLoadingLists } = useForm();
    const { theater } = formData;

    const isNextDisabled = !theater;

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-hospital-blue-600" />
                Select Your Location
            </h2>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Theater / Location</label>
                    <select
                        value={theater}
                        onChange={(e) => updateFormData('theater', e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none bg-white"
                        disabled={isLoadingLists}
                    >
                        <option value="">-- Choose Location --</option>
                        {lists.theaters.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        onClick={nextStep}
                        disabled={isNextDisabled}
                        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
                            ${isNextDisabled
                                ? 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
                                : 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-md'}`}
                    >
                        Next Step
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step1Location;
