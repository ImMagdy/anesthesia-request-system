import React from 'react';
import { useForm } from './context/FormContext';
import Step1Location from './components/Step1Location';
import Step2Resident from './components/Step2Resident';
import Step3Nature from './components/Step3Nature';
import Step4Details from './components/Step4Details';
import SuccessScreen from './components/SuccessScreen';
import { Activity } from 'lucide-react';

const AppContent = () => {
  const { step, submissionSuccess } = useForm();

  const renderStep = () => {
    if (submissionSuccess) return <SuccessScreen />;
    switch (step) {
      case 1: return <Step1Location />;
      case 2: return <Step2Resident />;
      case 3: return <Step3Nature />;
      case 4: return <Step4Details />;
      default: return <Step1Location />;
    }
  };

  const getProgress = () => {
    if (submissionSuccess) return 100;
    return ((step - 1) / 4) * 100 + 25; // 25, 50, 75, 100
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-hospital-blue-100 rounded-lg">
            <Activity className="w-6 h-6 text-hospital-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Anesthesia Requests</h1>
            <p className="text-xs text-gray-500">Resident Management System</p>
          </div>
        </div>

        {/* Progress Bar */}
        {!submissionSuccess && (
          <div className="h-1 bg-gray-100 w-full">
            <div
              className="h-full bg-hospital-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Footer (Step Indicator) */}
        {!submissionSuccess && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-colors 
                                        ${s === step ? 'bg-hospital-blue-500' : s < step ? 'bg-hospital-blue-300' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppContent />
  );
}

export default App;
