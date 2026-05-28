import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SuccessScreenProps {
  onStartOver: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onStartOver }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4 shadow-lg animate-bounce">
              <CheckCircle className="text-green-600" size={64} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Thank You!
          </h1>
          <p className="text-green-50 text-lg">
            Your submission was successful
          </p>
        </div>
        
        <div className="p-8 sm:p-10">
          <p className="text-slate-700 text-center mb-6 text-lg">
            We've sent a confirmation email to your inbox with next steps.
          </p>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-blue-900 mb-1">What's next?</p>
                <p className="text-sm text-blue-800">
                  Our team will review your information and reach out within 1-2 business days to schedule a personalized demo.
                </p>
              </div>
            </div>
          </Card>
          
          <Button
            onClick={onStartOver}
            variant="outline"
            size="lg"
            className="w-full border-2 hover:bg-slate-50"
          >
            Start Over
          </Button>
        </div>
      </Card>
    </div>
  );
};
