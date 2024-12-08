import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env

const app = express();
app.use(bodyParser.json());

const tempPasswords: Record<string, string> = {}; // Хранилище временных паролей

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint для отправки временного пароля
app.post("/send-temp-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email обязателен" });
  }

  // Генерация временного пароля
  const tempPassword = Math.random().toString(36).substring(2, 8).toUpperCase();
  tempPasswords[email] = tempPassword;

  try {
    await transporter.sendMail({
      from: `"Password Recovery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Ваш временный пароль",
      text: `Ваш временный пароль: ${tempPassword}`,
    });

    res.status(200).json({ message: "Пароль отправлен на email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при отправке письма" });
  }
});

// Endpoint для проверки временного пароля
app.post("/verify-temp-password", (req, res) => {
  const { email, tempPassword, newPassword } = req.body;

  if (!email || !tempPassword || !newPassword) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  if (tempPasswords[email] === tempPassword) {
    delete tempPasswords[email];
    res.status(200).json({ message: "Пароль успешно обновлён" });
  } else {
    res.status(400).json({ message: "Неверный временный пароль" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
