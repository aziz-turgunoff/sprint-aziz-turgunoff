import type { OnboardingFormData } from '../types/form';

const STORAGE_KEY = 'onboarding_form_data';

export const saveFormData = (data: OnboardingFormData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
};

export const loadFormData = (): OnboardingFormData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load form data:', error);
    return null;
  }
};

export const clearFormData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear form data:', error);
  }
};
