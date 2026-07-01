import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Login() {
  const [email, setEmail] = useState("sagarika31@example.com");
  const [password, setPassword] = useState("test12345");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">FinPilot</h1>
        <p className="mb-6 text-gray-500">
          Personal Finance & Budget Management Platform
        </p>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <p className="mt-6 text-center text-xs text-gray-400">
          Demo account is pre-filled for testing.
        </p>
      </div>
    </div>
  );
}

export default Login;