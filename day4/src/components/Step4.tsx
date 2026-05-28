import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { Edit2 } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Review & Submit
        </h2>
        <p className="text-slate-600">Please review your information before submitting</p>
      </div>

      {/* Company Information */}
      <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-slate-900">Company Information</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mt-1"
            >
              <Edit2 size={16} className="mr-1" />
              Edit
            </Button>
          </div>
          <dl className="grid gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Company Name:</dt>
              <dd className="font-semibold text-slate-900">{data.companyName}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Website:</dt>
              <dd className="font-semibold text-blue-600">{data.website}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Company Size:</dt>
              <dd className="font-semibold text-slate-900">{data.companySize} employees</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-slate-600 font-medium">Industry:</dt>
              <dd className="font-semibold text-slate-900">{data.industry}</dd>
            </div>
          </dl>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-slate-900">Contact Information</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mt-1"
            >
              <Edit2 size={16} className="mr-1" />
              Edit
            </Button>
          </div>
          <dl className="grid gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Full Name:</dt>
              <dd className="font-semibold text-slate-900">{data.fullName}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Work Email:</dt>
              <dd className="font-semibold text-blue-600">{data.workEmail}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Role:</dt>
              <dd className="font-semibold text-slate-900">{data.role}</dd>
            </div>
            {data.phone && (
              <div className="flex justify-between py-2">
                <dt className="text-slate-600 font-medium">Phone:</dt>
                <dd className="font-semibold text-slate-900">{data.phone}</dd>
              </div>
            )}
          </dl>
        </div>
      </Card>

      {/* Use Case */}
      <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-slate-900">Use Case</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mt-1"
            >
              <Edit2 size={16} className="mr-1" />
              Edit
            </Button>
          </div>
          <dl className="grid gap-3 text-sm">
            <div className="py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium mb-2">Primary Goals:</dt>
              <dd className="font-semibold">
                <div className="flex flex-wrap gap-2">
                  {data.primaryGoals.map((goal) => (
                    <span key={goal} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {goal}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <dt className="text-slate-600 font-medium">Expected Volume:</dt>
              <dd className="font-semibold text-slate-900">{data.expectedVolume}</dd>
            </div>
            {data.additionalInfo && (
              <div className="py-2">
                <dt className="text-slate-600 font-medium mb-2">Additional Information:</dt>
                <dd className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg">{data.additionalInfo}</dd>
              </div>
            )}
          </dl>
        </div>
      </Card>

      {/* Terms and Conditions */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 space-y-2">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={data.agreedToTerms}
            onCheckedChange={(checked) => onChange('agreedToTerms', checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer text-slate-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreedToTerms && (
          <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
            <span className="text-xs">⚠</span> {errors.agreedToTerms}
          </p>
        )}
      </div>
    </div>
  );
};
