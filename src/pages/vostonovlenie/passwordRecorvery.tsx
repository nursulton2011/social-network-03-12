import { useState } from "react";
import "./vostonovlenie.scss"; // Импортируем стили

export const passwordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("http://localhost:5173/send-temp-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message); // Показать сообщение от сервера
  };

  return (
    <div className="recovery-form">
      <h1>Восстановление пароля</h1>
      <input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      {message && (
        <div
          className={`message ${
            message.includes("успешно") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};
