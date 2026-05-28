import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Briefcase, Phone, AlertCircle } from 'lucide-react';

interface Step2Props {
  data: OnboardingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof OnboardingFormData, value: string) => void;
}

export const Step2: React.FC<Step2Props> = ({ data, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">Step 02</span>
        <h3 className="text-xl font-bold text-slate-800 font-display">
          Contact Details
        </h3>
        <p className="text-xs text-slate-500">Provide direct contact details. Work emails are highly preferred for vetting.</p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Full Name <span className="text-indigo-500">*</span>
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="John Doe"
            className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
              errors.fullName ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <Label htmlFor="workEmail" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            Work Email Address <span className="text-indigo-500">*</span>
          </Label>
          <Input
            id="workEmail"
            type="email"
            value={data.workEmail}
            onChange={(e) => onChange('workEmail', e.target.value)}
            placeholder="john@company.com"
            className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
              errors.workEmail ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
            }`}
          />
          {errors.workEmail && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.workEmail}
            </p>
          )}
        </div>

        {/* Role and Phone Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Job Title / Role */}
          <div className="space-y-1.5">
            <Label htmlFor="role" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              Job Title / Role <span className="text-indigo-500">*</span>
            </Label>
            <Input
              id="role"
              value={data.role}
              onChange={(e) => onChange('role', e.target.value)}
              placeholder="e.g. VP of Sales"
              className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
                errors.role ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
              }`}
            />
            {errors.role && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.role}
              </p>
            )}
          </div>

          {/* Direct Phone (Optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Direct Phone <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
                errors.phone ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
