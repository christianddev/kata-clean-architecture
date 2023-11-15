export const validateRegex = (value: string, regex: RegExp) => {
  return !(new RegExp(regex).test(value));
};