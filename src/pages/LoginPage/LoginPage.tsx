import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import "./LoginPage.scss";

// Массив иконок
const icons = [
  {
    href: "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=email",
    src: "/img/icons/google.svg",
    alt: "Google",
  },
  {
    href: "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=email",
    src: "/img/icons/google-plus.svg",
    alt: "Google Plus",
  },
  {
    href: "https://oauth.yandex.ru/authorize?client_id=YOUR_YANDEX_CLIENT_ID&redirect_uri=http://localhost:3000/auth/yandex/callback&response_type=token",
    src: "/img/icons/yandex.svg",
    alt: "Yandex",
  },
  {
    href: "https://oauth.mail.ru/login?client_id=YOUR_MAILRU_CLIENT_ID&redirect_uri=http://localhost:3000/auth/mailru/callback&response_type=token",
    src: "/img/icons/mail-ru.svg",
    alt: "Mail.ru",
  },
];

// Валидация с помощью yup
const schema = yup.object({
  phoneNumber: yup.string().required("Это поле обязательное"),
  password: yup
    .string()
    .required("Это поле обязательное")
    .min(8, "Пароль должен состоять минимум из 8 символов")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
      "Пароль должен включать в себя хотя бы 1 символ, 1 заглавную букву и 1 цифру"
    ),
});

type FormData = yup.InferType<typeof schema>;

export const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  // Обработчик отправки формы
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Пример успешной авторизации: сохранение токена в localStorage
    localStorage.setItem("auth_token", "sample_token"); // Пример использования токена
    navigate("/"); // Перенаправление на главную страницу
  };

  return (
    <div className="LoginPage">
      <h1>Авторизация</h1>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            type="tel"
            placeholder="Номер телефона"
            {...register("phoneNumber")}
          />
          <p className="text-xs absolute -bottom-[15px] text-[#f00]">
            {formState.errors.phoneNumber?.message}
          </p>
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          <p className="text-xs absolute -bottom-[15px] text-[#f00]">
            {formState.errors.password?.message}
          </p>
        </div>

        <Button href="#">Войти</Button>
      </form>
      <a href="#">Забыли пароль?</a>
      <div className="registration">
        <span>
          У вас нет аккаунта? <a href="#">Зарегистрироваться</a>
        </span>
        <p>Войти с помощью</p>
        <div className="icons-wrapper">
          {icons.map((icon, index) => (
            <a key={index} className="reg__link" href={icon.href}>
              <img src={icon.src} alt={icon.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
