import React from 'react';
import { CheckCircle2, Sparkles, Settings, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SuccessScreenProps {
  onStartOver: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onStartOver }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      <Card className="max-w-xl w-full shadow-2xl border border-slate-100/80 rounded-3xl overflow-hidden bg-white animate-slide-in">
        
        {/* Top Glowing Gradient Panel */}
        <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-8 text-center relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white rounded-full p-4 shadow-xl shadow-emerald-950/20 border border-emerald-100 animate-bounce">
              <CheckCircle2 className="text-emerald-600 w-12 h-12 stroke-[2]" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 tracking-tight relative z-10">
            Submission Received!
          </h1>
          <p className="text-emerald-100/90 text-sm font-medium max-w-sm mx-auto relative z-10">
            Your enterprise details have been recorded and qualified successfully.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-6">
          
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              What happens next?
            </h3>
            <p className="text-xs text-slate-500">Here is the automated onboarding timeline we have initialized:</p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-3.5">
            {/* Step 1: Verification & Mail */}
            <div className="flex gap-3.5 items-start bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors">
              <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl border border-indigo-100 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800">1. Instant Email Dispatch</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We've sent a summary copy of your answers to your work inbox. Please check your spam folder if it doesn't arrive in 2 minutes.
                </p>
              </div>
            </div>

            {/* Step 2: Routing */}
            <div className="flex gap-3.5 items-start bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800">2. Sales Rep Assignment</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our system evaluates your company size and vertical to route your profile to the specialized accounts manager.
                </p>
              </div>
            </div>

            {/* Step 3: Demo call */}
            <div className="flex gap-3.5 items-start bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-colors">
              <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl border border-purple-100 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800">3. Calendar Demo Invitation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Expect a direct personal outreach email with a calendar booking link to schedule your sandbox setup walk-through.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onStartOver}
              variant="outline"
              size="lg"
              className="w-full border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold h-12 rounded-xl text-sm"
            >
              Start New Submission
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => window.open('https://github.com/aziz-turgunoff/sprint-aziz-turgunoff', '_blank')}
              className="w-full bg-slate-900 hover:bg-slate-850 text-white font-semibold h-12 rounded-xl text-sm flex gap-1.5 items-center justify-center shadow-lg shadow-slate-950/10"
            >
              View GitHub Repo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
};
