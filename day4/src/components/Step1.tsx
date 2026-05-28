import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { COMPANY_SIZES, INDUSTRIES } from '../types/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, Globe, Users2, Layers, AlertCircle } from 'lucide-react';

interface Step1Props {
  data: OnboardingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof OnboardingFormData, value: string) => void;
}

export const Step1: React.FC<Step1Props> = ({ data, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">Step 01</span>
        <h3 className="text-xl font-bold text-slate-800 font-display">
          Company Profile
        </h3>
        <p className="text-xs text-slate-500">Provide basic credentials of your enterprise to help us verify identity.</p>
      </div>

      <div className="space-y-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <Label htmlFor="companyName" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Company Legal Name <span className="text-indigo-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              placeholder="e.g. Acme Corporation"
              className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
                errors.companyName ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
              }`}
            />
          </div>
          {errors.companyName && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Website URL */}
        <div className="space-y-1.5">
          <Label htmlFor="website" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            Corporate Website <span className="text-indigo-500">*</span>
          </Label>
          <Input
            id="website"
            type="url"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder="https://example.com"
            className={`h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/30 transition-all rounded-xl text-slate-800 placeholder:text-slate-400 text-sm ${
              errors.website ? 'border-rose-400 focus-visible:ring-rose-400 bg-rose-50/10' : ''
            }`}
          />
          {errors.website && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.website}
            </p>
          )}
        </div>

        {/* Size and Industry Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Company Size */}
          <div className="space-y-1.5">
            <Label htmlFor="companySize" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
              <Users2 className="w-3.5 h-3.5 text-slate-400" />
              Company Size <span className="text-indigo-500">*</span>
            </Label>
            <Select value={data.companySize} onValueChange={(value: string) => onChange('companySize', value)}>
              <SelectTrigger id="companySize" className={`h-11 px-4 border-slate-200 bg-slate-50/30 rounded-xl text-slate-800 text-sm transition-all focus:ring-indigo-500 ${
                errors.companySize ? 'border-rose-400 bg-rose-50/10' : ''
              }`}>
                <SelectValue placeholder="Number of employees" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {COMPANY_SIZES.map((size) => (
                  <SelectItem key={size} value={size} className="rounded-lg text-sm text-slate-700">
                    {size} employees
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.companySize}
              </p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <Label htmlFor="industry" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Industry Vertical <span className="text-indigo-500">*</span>
            </Label>
            <Select value={data.industry} onValueChange={(value: string) => onChange('industry', value)}>
              <SelectTrigger id="industry" className={`h-11 px-4 border-slate-200 bg-slate-50/30 rounded-xl text-slate-800 text-sm transition-all focus:ring-indigo-500 ${
                errors.industry ? 'border-rose-400 bg-rose-50/10' : ''
              }`}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry} className="rounded-lg text-sm text-slate-700">
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.industry}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
