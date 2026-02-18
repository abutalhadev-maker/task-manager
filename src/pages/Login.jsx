import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load saved email when component loads
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handle = (e) => {
    e.preventDefault();

    // call your auth login function
    if (login(email, pass, remember)) {
      
      // ✅ store/remove email based on remember checkbox
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      nav("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form className="login-box" onSubmit={handle}>
      <h2>Login</h2>

      <input
        placeholder="email"
        value={email} // ✅ controlled input
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={pass} // ✅ controlled input
        onChange={(e) => setPass(e.target.value)}
      />

      <label className="checkbox">
        <input
          type="checkbox"
          checked={remember} // ✅ controlled checkbox
          onChange={(e) => setRemember(e.target.checked)}
        />
        Remember me
      </label>

      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
