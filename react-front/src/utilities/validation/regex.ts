export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // At least 8 characters, 1 uppercase letter, and 1 number
  return passwordRegex.test(password);
};

export const validationRegex = {
  email: validateEmail,
  password: validatePassword,
  passwordRegex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
