import React, { useEffect } from 'react';
import { useForm } from '../context/FormContext';
import { MapPin, ShieldAlert, UserCheck, Syringe } from 'lucide-react';

const Step1Location = () => {
    const { formData, updateFormData, nextStep, lists, isLoadingLists } = useForm();
    const { theaterCategory, theater, seniorName, isEmergency } = formData;

    const handleCategorySelect = (category) => {
        updateFormData('theaterCategory', category);
        if (category === 'Main') {
            // Reset "Other" specific fields
            updateFormData('theater', '');
            updateFormData('seniorName', '');
            updateFormData('isEmergency', false);
            nextStep();
        }
    };

    const handleEmergency = () => {
        updateFormData('isEmergency', true);
        updateFormData('seniorName', 'EMERGENCY OVERRIDE');
        nextStep();
    };

    const isSeniorConfirmDisabled = !theater || !seniorName;

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-hospital-blue-600" />
                Select Your Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => handleCategorySelect('Main')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md
                        ${theaterCategory === 'Main'
                            ? 'border-hospital-blue-500 bg-hospital-blue-50'
                            : 'border-gray-200 hover:border-hospital-blue-300 bg-white'}`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Combined Operations</h3>
                            <p className="text-sm text-gray-500 mt-1">Main Theaters Area</p>
                        </div>
                        <Syringe className="w-6 h-6 text-hospital-blue-500" />
                    </div>
                </button>

                <button
                    onClick={() => updateFormData('theaterCategory', 'Other')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md
                        ${theaterCategory === 'Other'
                            ? 'border-hospital-blue-500 bg-hospital-blue-50'
                            : 'border-gray-200 hover:border-hospital-blue-300 bg-white'}`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Other Theaters</h3>
                            <p className="text-sm text-gray-500 mt-1">Specialized & Remote Units</p>
                        </div>
                        <MapPin className="w-6 h-6 text-hospital-blue-500" />
                    </div>
                </button>
            </div>

            {theaterCategory === 'Other' && (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 space-y-4 animate-slideDown">
                    <h3 className="font-medium text-gray-800">Verification Required</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Theater</label>
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

                    {!isEmergency && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Senior</label>
                            <select
                                value={seniorName}
                                onChange={(e) => updateFormData('seniorName', e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none bg-white"
                                disabled={isLoadingLists}
                            >
                                <option value="">-- Choose Senior Name --</option>
                                {lists.seniors.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            onClick={nextStep}
                            disabled={isSeniorConfirmDisabled}
                            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors
                                ${isSeniorConfirmDisabled
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-hospital-blue-600 text-white hover:bg-hospital-blue-700'}`}
                        >
                            <UserCheck className="w-5 h-5" />
                            Confirm Senior Presence
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Emergency Override</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            onClick={handleEmergency}
                            className="w-full py-3 px-4 rounded-lg font-medium border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShieldAlert className="w-5 h-5" />
                            Emergency / Cannot Reach Senior
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step1Location;
