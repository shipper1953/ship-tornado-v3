import AuthForm from "../components/AuthForm";
import { registerAPI } from "../api/auth";

export default function Register() {
  const handleRegister = async (formData: { email: string; password: string; company_id: string }) => {
    try {
      const res = await registerAPI(formData);
      alert("Registered!");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        // @ts-ignore
        alert((err as any).response?.data?.error || "Registration failed");
      } else {
        alert("Registration failed");
      }
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}