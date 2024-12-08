import React, { useState } from "react";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import "./RegistrationPage.scss";

export const RegistrationPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    setError("");
    console.log("Registration successful:", { username, email, password });

    register(); // Сохраняем статус "зарегистрирован"
    navigate("/"); // Перенаправляем на MainPage
  };

  return (
    <div className="registration-container">
      <h2>Создания аккаунта</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="Никнейм"
          placeholder="Никнейм"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          placeholder="Эл.почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="Пароль"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Потверждения пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
