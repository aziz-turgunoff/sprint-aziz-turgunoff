import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { Edit3, AlertCircle, Building2, User, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';

interface Step4Props {
  data: OnboardingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof OnboardingFormData, value: boolean) => void;
  onEdit: (step: number) => void;
}

export const Step4: React.FC<Step4Props> = ({ data, errors, onChange, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">Step 04</span>
        <h3 className="text-xl font-bold text-slate-800 font-display">
          Review & Verification
        </h3>
        <p className="text-xs text-slate-500">Double check your inputs before generating the automated routing pipeline.</p>
      </div>

      <div className="space-y-4">
        {/* Company & Contact review side-by-side or stacked grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Company details */}
          <Card className="border border-slate-100 bg-slate-50/20 p-5 rounded-2xl shadow-none relative hover:border-slate-200 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                Company Profile
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(1)}
                className="h-7 px-2.5 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-150 transition-all"
              >
                <Edit3 size={11} className="mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Name</span>
                <span className="font-semibold text-slate-800">{data.companyName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Website</span>
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:underline break-all">
                  {data.website}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Size</span>
                  <span className="font-semibold text-slate-800 text-xs">{data.companySize} employees</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Industry</span>
                  <span className="font-semibold text-slate-800 text-xs">{data.industry}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Details */}
          <Card className="border border-slate-100 bg-slate-50/20 p-5 rounded-2xl shadow-none relative hover:border-slate-200 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                Primary Contact
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                className="h-7 px-2.5 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-150 transition-all"
              >
                <Edit3 size={11} className="mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Full Name</span>
                <span className="font-semibold text-slate-800">{data.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Work Email</span>
                <span className="font-semibold text-slate-800 break-all">{data.workEmail}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Role</span>
                  <span className="font-semibold text-slate-800 text-xs truncate block">{data.role}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                  <span className="font-semibold text-slate-800 text-xs">
                    {data.phone ? data.phone : <span className="text-slate-400 font-normal italic">not provided</span>}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Use Case details */}
        <Card className="border border-slate-100 bg-slate-50/20 p-5 rounded-2xl shadow-none relative hover:border-slate-200 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              Objectives & Requirements
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="h-7 px-2.5 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-150 transition-all"
            >
              <Edit3 size={11} className="mr-1" />
              Edit
            </Button>
          </div>
          <div className="space-y-3.5 text-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Selected Goals</span>
              <div className="flex flex-wrap gap-1.5">
                {data.primaryGoals.map((goal) => (
                  <span key={goal} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Expected Monthly Volume</span>
                <span className="font-semibold text-slate-800">{data.expectedVolume}</span>
              </div>
              {data.additionalInfo && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Additional Context</span>
                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100/60 mt-1 max-h-[80px] overflow-y-auto leading-relaxed">
                    {data.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Terms Box */}
        <div className={`p-4 rounded-2xl border transition-all ${
          errors.agreedToTerms 
            ? 'border-rose-200 bg-rose-50/20' 
            : 'border-slate-100 bg-slate-50/20'
        }`}>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={data.agreedToTerms}
              onCheckedChange={(checked) => onChange('agreedToTerms', checked as boolean)}
              className="mt-0.5 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
            <label htmlFor="terms" className="text-xs leading-relaxed text-slate-600 cursor-pointer select-none">
              I authorize the processing of my submission and agree to the{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold underline decoration-indigo-200 hover:decoration-indigo-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold underline decoration-indigo-200 hover:decoration-indigo-500">
                Privacy Policy
              </a>.
            </label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-2 font-medium ml-7 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.agreedToTerms}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
