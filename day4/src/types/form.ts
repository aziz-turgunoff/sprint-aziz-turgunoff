export interface OnboardingFormData {
  // Step 1: Company
  companyName: string;
  website: string;
  companySize: string;
  industry: string;
  
  // Step 2: Contact
  fullName: string;
  workEmail: string;
  role: string;
  phone: string;
  
  // Step 3: Use case
  primaryGoals: string[];
  expectedVolume: string;
  additionalInfo: string;
  
  // Step 4: Review
  agreedToTerms: boolean;
}

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '200+'
];

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Manufacturing',
  'Education',
  'Real Estate',
  'Other'
];

export const PRIMARY_GOALS = [
  'Lead Generation',
  'Customer Onboarding',
  'Product Feedback',
  'Event Registration',
  'Partnership Inquiry',
  'Demo Request'
];

export const EXPECTED_VOLUMES = [
  'Less than 100/month',
  '100-500/month',
  '500-2000/month',
  '2000+/month'
];

export const initialFormData: OnboardingFormData = {
  companyName: '',
  website: '',
  companySize: '',
  industry: '',
  fullName: '',
  workEmail: '',
  role: '',
  phone: '',
  primaryGoals: [],
  expectedVolume: '',
  additionalInfo: '',
  agreedToTerms: false
};
