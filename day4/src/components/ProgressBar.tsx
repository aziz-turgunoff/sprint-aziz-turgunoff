import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Current Progress
        </span>
        <span className="text-sm font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className="relative w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
