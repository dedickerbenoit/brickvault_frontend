export const PASSWORD_RULES = [
  { key: "minLength", test: (p: string) => p.length >= 8 },
  { key: "uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { key: "digit", test: (p: string) => /[0-9]/.test(p) },
  { key: "specialChar", test: (p: string) => /[@$!%*?&]/.test(p) },
] as const;

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}

export function passwordsMatch(password: string, confirmation: string): boolean {
  return password !== "" && confirmation !== "" && password === confirmation;
}
