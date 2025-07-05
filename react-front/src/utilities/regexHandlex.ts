function isValidPassword(password: string): boolean {
  // Password validation: at least 6 characters, one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordRegex.test(password);
}

function isValidEmail(email: string): boolean {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // More complex regex can be used for stricter validation
  return emailRegex.test(email);
}

export const regexHandler = {
  isValidPassword,
  isValidEmail,
};
