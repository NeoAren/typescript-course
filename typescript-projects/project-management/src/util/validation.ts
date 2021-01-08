// VALIDATION UTILITY

export interface Validatable {
   value: string | number;
   required?: boolean;
   minLength?: number;
   maxLength?: number;
   min?: number;
   max?: number;
}

export const validateInput = ({ value, required, minLength, maxLength, min, max }: Validatable) => {
   let isValid = true;
   if (required) {
      if (typeof value === 'string') isValid = isValid && value !== '';
      if (typeof value === 'number') isValid = isValid && !Number.isNaN(value);
   }
   if (typeof value === 'string' && minLength != null) {
      isValid = isValid && value.length >= minLength;
   }
   if (typeof value === 'string' && maxLength != null) {
      isValid = isValid && value.length <= maxLength;
   }
   if (typeof value === 'number' && min != null) {
      isValid = isValid && value >= min;
   }
   if (typeof value === 'number' && max != null) {
      isValid = isValid && value <= max;
   }
   return isValid;
};
