import React from 'react';
import type { OnboardingFormData } from '../types/form';
import { PRIMARY_GOALS, EXPECTED_VOLUMES } from '../types/form';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Target, BarChart2, MessageSquare, AlertCircle, Check } from 'lucide-react';

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

  // Icon mapping for expected volume levels
  const getVolumeIcon = (_volume: string) => {
    return <BarChart2 className="w-5 h-5 text-indigo-500 shrink-0" />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">Step 03</span>
        <h3 className="text-xl font-bold text-slate-800 font-display">
          Use Case & Scale
        </h3>
        <p className="text-xs text-slate-500">Select what you plan to achieve and the volume requirements for your business.</p>
      </div>

      <div className="space-y-6">
        {/* Primary Goals */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            Primary Objectives <span className="text-indigo-500">*</span> 
            <span className="text-[10px] text-slate-400 font-normal lowercase">(select all that apply)</span>
          </Label>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {PRIMARY_GOALS.map((goal) => {
              const isSelected = data.primaryGoals.includes(goal);
              return (
                <Button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`rounded-full px-4 py-1.5 h-auto text-xs font-semibold tracking-wide transition-all duration-200 border ${
                    isSelected
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  {goal}
                </Button>
              );
            })}
          </div>
          {errors.primaryGoals && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.primaryGoals}
            </p>
          )}
        </div>

        {/* Expected Volume Cards */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
            Expected Submission Volume <span className="text-indigo-500">*</span>
          </Label>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            {EXPECTED_VOLUMES.map((volume) => {
              const isSelected = data.expectedVolume === volume;
              return (
                <label
                  key={volume}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all duration-250 select-none ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {getVolumeIcon(volume)}
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${
                      isSelected ? 'text-indigo-950' : 'text-slate-700'
                    }`}>{volume}</span>
                  </div>

                  {/* Radio box or visual check */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="expectedVolume"
                      value={volume}
                      checked={isSelected}
                      onChange={(e) => onChange('expectedVolume', e.target.value)}
                      className="sr-only"
                    />
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </label>
              );
            })}
          </div>
          {errors.expectedVolume && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.expectedVolume}
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="space-y-1.5">
          <Label htmlFor="additionalInfo" className="text-xs font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            Additional Context <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
          </Label>
          <Textarea
            id="additionalInfo"
            value={data.additionalInfo}
            onChange={(e) => onChange('additionalInfo', e.target.value)}
            maxLength={500}
            placeholder="Tell us about any specific tools, databases, or API integrations you'd like to configure..."
            className="resize-none min-h-[100px] border-slate-200 focus-visible:ring-indigo-500 rounded-2xl bg-slate-50/30 text-slate-800 placeholder:text-slate-400 text-sm p-4 transition-all"
            rows={4}
          />
          <div className="flex justify-between items-center mt-1">
            <div className="min-h-[16px]">
              {errors.additionalInfo && (
                <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.additionalInfo}
                </p>
              )}
            </div>
            <span className={`text-[10px] font-bold ${
              data.additionalInfo.length >= 450 ? 'text-amber-500' : 'text-slate-400'
            }`}>
              {data.additionalInfo.length}/500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
