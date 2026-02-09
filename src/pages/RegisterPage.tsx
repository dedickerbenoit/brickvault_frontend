import { RegisterHero, RegisterForm } from "@/components/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <RegisterHero />
      <RegisterForm />
    </div>
  );
}
