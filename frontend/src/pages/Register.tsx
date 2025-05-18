import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";

export default function Register() {
  const handleRegister = async (e, data) => {
    e.preventDefault();
    try {
      const res = await register(data);
      alert("Registered!");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}