import type { OnboardingFormData } from '../types/form';

export const validateStep1 = (data: OnboardingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.companyName.trim()) {
    errors.companyName = 'Company name is required';
  }

  if (!data.website.trim()) {
    errors.website = 'Website is required';
  } else {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(data.website)) {
      errors.website = 'Please enter a valid URL';
    }
  }

  if (!data.companySize) {
    errors.companySize = 'Company size is required';
  }

  if (!data.industry) {
    errors.industry = 'Industry is required';
  }

  return errors;
};

export const validateStep2 = (data: OnboardingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!data.workEmail.trim()) {
    errors.workEmail = 'Work email is required';
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.workEmail)) {
      errors.workEmail = 'Please enter a valid email address';
    }
  }

  if (!data.role.trim()) {
    errors.role = 'Role is required';
  }

  // Phone is optional, but validate format if provided
  if (data.phone.trim()) {
    const phonePattern = /^[\d\s\-\+\(\)]+$/;
    if (!phonePattern.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  return errors;
};

export const validateStep3 = (data: OnboardingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (data.primaryGoals.length === 0) {
    errors.primaryGoals = 'Please select at least one goal';
  }

  if (!data.expectedVolume) {
    errors.expectedVolume = 'Expected volume is required';
  }

  if (data.additionalInfo.length > 500) {
    errors.additionalInfo = 'Additional info must be 500 characters or less';
  }

  return errors;
};

export const validateStep4 = (data: OnboardingFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to the terms and conditions';
  }

  return errors;
};
