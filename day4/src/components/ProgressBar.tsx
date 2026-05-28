import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-slate-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-blue-600">{Math.round(percentage)}% complete</span>
      </div>
      <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
