import { useState, useEffect } from 'react';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Step4 } from './components/Step4';
import { ProgressBar } from './components/ProgressBar';
import { SuccessScreen } from './components/SuccessScreen';
import type { OnboardingFormData } from './types/form';
import { initialFormData } from './types/form';
import { saveFormData, loadFormData, clearFormData } from './lib/storage';
import { validateStep1, validateStep2, validateStep3, validateStep4 } from './lib/validation';
import { supabase } from './lib/supabase';
import { ChevronLeft, ChevronRight, Loader2, Sparkles, Clock, TrendingUp, Check, ShieldCheck, Lock, Activity } from 'lucide-react';
import { Button } from './components/ui/button';

const metrics = [
  {
    icon: <Clock className="w-5 h-5 text-indigo-400" />,
    title: "Efficiency Gains",
    value: "Save 3-5 hrs/week",
    description: "Average time saved per sales rep by instantly filtering out unqualified leads."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    title: "Demo Bookings",
    value: "25% Higher Conversion",
    description: "Accelerate qualified leads directly to booked calls with instant routing."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    title: "Zero Lead Leakage",
    value: "Progress Auto-Saved",
    description: "LocalStorage persistence guarantees details remain intact even on dropouts."
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState(0);

  // Auto-rotate sidebar metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    if (!isSuccess) {
      saveFormData(formData);
    }
  }, [formData, isSuccess]);

  const handleChange = (field: keyof OnboardingFormData, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1(formData);
        break;
      case 2:
        stepErrors = validateStep2(formData);
        break;
      case 3:
        stepErrors = validateStep3(formData);
        break;
      case 4:
        stepErrors = validateStep4(formData);
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Call Supabase Edge Function
      const { error } = await supabase.functions.invoke('submit-onboarding', {
        body: { formData }
      });

      if (error) {
        throw error;
      }

      // Success
      clearFormData();
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
    clearFormData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return <SuccessScreen onStartOver={handleStartOver} />;
  }

  // Helper to determine step status in timeline
  const getStepStatus = (stepNum: number) => {
    if (currentStep > stepNum) return 'completed';
    if (currentStep === stepNum) return 'active';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 sm:p-6 md:p-10 font-sans">
      <div className="w-full max-w-6xl bg-white sm:rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[750px] border border-slate-100">
        
        {/* Left Side Panel - Brand & Progress Checklist */}
        <div className="w-full md:w-[40%] bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)]">
          {/* Glowing accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Top: Logo / Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">QualiFlow</span>
                <span className="text-[10px] block font-semibold text-indigo-400 uppercase tracking-widest -mt-1">Enterprise B2B</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 leading-tight">
              Streamlining <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Lead Qualification</span>
            </h2>

            {/* Checklist of Steps */}
            <div className="space-y-6">
              {[
                { num: 1, label: "Company Information", desc: "Legitimacy & sizing details" },
                { num: 2, label: "Contact Information", desc: "Work email & direct role" },
                { num: 3, label: "Use Case details", desc: "Project goals & volumes" },
                { num: 4, label: "Review & Submit", desc: "Verification & terms agreement" },
              ].map((step, idx) => {
                const status = getStepStatus(step.num);
                return (
                  <div key={step.num} className="flex gap-4 items-start relative group">
                    {/* Line connector */}
                    {idx < 3 && (
                      <div className={`absolute left-[15px] top-[32px] w-[2px] h-[calc(100%+16px)] transition-colors duration-500 ${
                        currentStep > step.num ? 'bg-indigo-500' : 'bg-slate-800'
                      }`}></div>
                    )}

                    {/* Step circle status */}
                    <div className="z-10 mt-1">
                      {status === 'completed' ? (
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white border border-indigo-500 shadow-lg shadow-indigo-600/30 transition-all duration-300">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : status === 'active' ? (
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border-2 border-indigo-400 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)] animate-pulse-ring transition-all duration-300">
                          <span className="text-xs font-bold">{step.num}</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-slate-500 transition-all duration-300">
                          <span className="text-xs font-bold">{step.num}</span>
                        </div>
                      )}
                    </div>

                    {/* Text labels */}
                    <div>
                      <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                        status === 'active' ? 'text-white' : status === 'completed' ? 'text-slate-200' : 'text-slate-500'
                      }`}>{step.label}</h4>
                      <p className={`text-xs transition-colors duration-300 ${
                        status === 'active' ? 'text-slate-400' : 'text-slate-600'
                      }`}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom: Dynamic Metric Testimonial Card */}
          <div className="relative z-10 mt-12 pt-8 border-t border-slate-800/80">
            <div className="min-h-[90px] transition-all duration-500 transform animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                {metrics[activeMetric].icon}
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  {metrics[activeMetric].title}
                </span>
              </div>
              <h5 className="text-lg font-bold text-white mb-1">
                {metrics[activeMetric].value}
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                {metrics[activeMetric].description}
              </p>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-1.5 mt-4">
              {metrics.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMetric(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMetric === idx ? 'w-5 bg-indigo-500' : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Storage status */}
            <div className="mt-8 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Progress is encrypted & auto-saved locally</span>
            </div>
          </div>
        </div>

        {/* Right Side Panel - Interactive Form */}
        <div className="w-full md:w-[60%] p-6 sm:p-10 md:p-12 flex flex-col justify-between">
          <div>
            {/* Header step counter for screen readers and small screens */}
            <div className="md:hidden mb-6 flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-500">
                Step {currentStep} of 4
              </span>
              <span className="text-xs font-semibold text-indigo-600">
                {[
                  "Company Details",
                  "Contact Info",
                  "Use Case Details",
                  "Final Review"
                ][currentStep - 1]}
              </span>
            </div>

            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} totalSteps={4} />

            {/* Form Steps container with animations */}
            <div className="min-h-[420px] py-4 animate-slide-in">
              {currentStep === 1 && (
                <Step1 data={formData} errors={errors} onChange={handleChange} />
              )}
              {currentStep === 2 && (
                <Step2 data={formData} errors={errors} onChange={handleChange} />
              )}
              {currentStep === 3 && (
                <Step3 data={formData} errors={errors} onChange={handleChange} />
              )}
              {currentStep === 4 && (
                <Step4 
                  data={formData} 
                  errors={errors} 
                  onChange={handleChange}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>

          {/* Bottom Actions Area */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            {/* Error Message if any */}
            {submitError && (
              <div className="mb-6 p-4 bg-rose-50/50 border border-rose-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-2">
                  <span className="text-rose-500 font-bold">⚠️</span>
                  <p className="text-xs text-rose-800 font-semibold">{submitError}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50 shrink-0"
                >
                  Retry Submission
                </Button>
              </div>
            )}

            <div className="flex justify-between items-center gap-4">
              <Button
                onClick={handleBack}
                disabled={currentStep === 1}
                variant="outline"
                size="lg"
                className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 disabled:opacity-40 h-12"
              >
                <ChevronLeft size={16} />
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/10 h-12 px-6"
                >
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/10 h-12 px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <ShieldCheck size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
