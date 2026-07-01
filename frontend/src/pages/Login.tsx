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
      setMessage("Login successful");
      navigate("/dashboard");
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h1>FinPilot Login</h1>

      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;