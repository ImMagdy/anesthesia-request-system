import React from 'react';
import { useForm } from '../context/FormContext';
import { CheckCircle2, RotateCcw } from 'lucide-react';

const SuccessScreen = () => {
    const { resetForm } = useForm();

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 animate-scaleIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Request Submitted!</h2>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Your request has been successfully recorded and sent to the administration sheet.
                </p>
            </div>

            <div className="pt-6 w-full max-w-xs">
                <button
                    onClick={resetForm}
                    className="w-full py-4 px-6 rounded-xl bg-hospital-blue-600 text-white font-semibold hover:bg-hospital-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Submit New Request
                </button>
            </div>
        </div>
    );
};

export default SuccessScreen;
