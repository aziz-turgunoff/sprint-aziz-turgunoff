import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { PRIMARY_GOALS, EXPECTED_VOLUMES } from '../types/form';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Step3Props {
  data: OnboardingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof OnboardingFormData, value: string | string[]) => void;
}

export const Step3: React.FC<Step3Props> = ({ data, errors, onChange }) => {
  const toggleGoal = (goal: string) => {
    const currentGoals = data.primaryGoals;
    if (currentGoals.includes(goal)) {
      onChange('primaryGoals', currentGoals.filter(g => g !== goal));
    } else {
      onChange('primaryGoals', [...currentGoals, goal]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Use Case
        </h2>
        <p className="text-slate-600">Help us understand your needs</p>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-700">
          Primary Goals <span className="text-red-500">*</span> <span className="text-xs text-slate-500 font-normal">(select at least one)</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {PRIMARY_GOALS.map((goal) => (
            <Button
              key={goal}
              type="button"
              variant={data.primaryGoals.includes(goal) ? 'default' : 'outline'}
              onClick={() => toggleGoal(goal)}
              className={`rounded-full transition-all ${
                data.primaryGoals.includes(goal) 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md' 
                  : 'hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {goal}
            </Button>
          ))}
        </div>
        {errors.primaryGoals && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-xs">⚠</span> {errors.primaryGoals}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-700">
          Expected Volume <span className="text-red-500">*</span>
        </Label>
        <div className="grid gap-3">
          {EXPECTED_VOLUMES.map((volume) => (
            <label
              key={volume}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                data.expectedVolume === volume
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="expectedVolume"
                value={volume}
                checked={data.expectedVolume === volume}
                onChange={(e) => onChange('expectedVolume', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className={`ml-3 font-medium ${
                data.expectedVolume === volume ? 'text-blue-900' : 'text-slate-700'
              }`}>{volume}</span>
            </label>
          ))}
        </div>
        {errors.expectedVolume && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-xs">⚠</span> {errors.expectedVolume}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="additionalInfo" className="text-sm font-semibold text-slate-700">
          Anything else we should know? <span className="text-xs text-slate-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="additionalInfo"
          value={data.additionalInfo}
          onChange={(e) => onChange('additionalInfo', e.target.value)}
          maxLength={500}
          placeholder="Tell us more about your specific needs..."
          className="resize-none min-h-[120px]"
          rows={5}
        />
        <div className="flex justify-between">
          <div>
            {errors.additionalInfo && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.additionalInfo}
              </p>
            )}
          </div>
          <p className="text-sm text-slate-500">
            {data.additionalInfo.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};
