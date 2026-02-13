import React from 'react';
import { useForm } from '../context/FormContext';
import { Calendar, Clock, MapPin, FileText, CheckCircle2 } from 'lucide-react';

const Step4Details = () => {
    const { formData, updateFormData, prevStep, submitForm, isSubmitting, submissionError } = useForm();
    const { requestDate, description, isAllDay, timeFrom, timeTo, destination } = formData;

    const isValid = requestDate &&
        description.trim().length > 5 &&
        (isAllDay || (timeFrom && timeTo && destination));

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-hospital-blue-600" />
                Request Details
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Required</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={requestDate}
                            onChange={(e) => updateFormData('requestDate', e.target.value)}
                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none bg-white"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-700">Is this an all-day request?</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isAllDay}
                            onChange={(e) => updateFormData('isAllDay', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-hospital-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hospital-blue-600"></div>
                    </label>
                </div>

                {!isAllDay && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideDown">
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => updateFormData('destination', e.target.value)}
                                    placeholder="Where are you going?"
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <input
                                type="time"
                                value={timeFrom}
                                onChange={(e) => updateFormData('timeFrom', e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 outline-none bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <input
                                type="time"
                                value={timeTo}
                                onChange={(e) => updateFormData('timeTo', e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 outline-none bg-white"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description / Reason</label>
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => updateFormData('description', e.target.value)}
                            placeholder="Please provide details..."
                            rows="3"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-blue-500 focus:border-hospital-blue-500 outline-none resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            {submissionError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {submissionError}
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={submitForm}
                    disabled={!isValid || isSubmitting}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2
                        ${isValid && !isSubmitting
                            ? 'bg-hospital-blue-600 hover:bg-hospital-blue-700 hover:shadow-lg translate-y-0 active:translate-y-0.5'
                            : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Request
                            <CheckCircle2 className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Step4Details;
