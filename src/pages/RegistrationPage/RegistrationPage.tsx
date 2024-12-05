// RegistrationPage.tsx
import React, { useState } from "react";
import { Input } from "../../components/Input"; // Импорт компонента Input
import "./RegistrationPage.scss";

export const RegistrationPage: React.FC = () => {
  // Состояния для ввода данных
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Проверка на пустые поля
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Проверка на правильность email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Если все проверки пройдены
    setError("");
    console.log("Form submitted:", { username, email, password });
    // Здесь можно отправить данные на сервер
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
          label="Никнейм" // Передаем label
        />
        <Input
          type="email"
          name="email"
          placeholder="Эл.почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Эл.почта" // Передаем label
        />
        <Input
          type="password"
          name="Пароль"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Пароль" // Передаем label
        />
        <Input
          type="Пароль"
          name="confirmPassword"
          placeholder="Потвержедения пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Потвержедения пароля" // Передаем label
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </div>
  );
};
