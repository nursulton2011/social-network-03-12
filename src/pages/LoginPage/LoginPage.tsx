// import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconLink } from "@/components/IconLink/IconLink";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./LoginPage.scss";

// Массив иконок
const icons = [
  { href: "#", src: "/img/icons/google.svg", alt: "Google" },
  { href: "#", src: "/img/icons/google-plus.svg", alt: "Google Plus" },
  { href: "#", src: "/img/icons/yandex.svg", alt: "Yandex" },
  { href: "#", src: "/img/icons/mail-ru.svg", alt: "Mail.ru" },
];

// Схема валидации с использованием yup
const schema = yup
  .object({
    phoneNumber: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required"), // Убедитесь, что используете правильное имя поля
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Обработчик отправки формы
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="LoginPage">
      <h1>Авторизация</h1>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {/* Поле для номера телефона */}
        <input
          type="tel"
          placeholder="phoneNumber"
          {...register("phoneNumber")}
        />
        <p className="text-xs absolute -bottom-[15px] text-[#f00]">
          {formState.errors.phoneNumber?.type === "required" &&
            "Это поле обезательное"}
        </p>
        {/* Поле для пароля */}
        <input type="password" placeholder="Пароль" {...register("password")} />
        <p className="text-xs absolute -bottom-[15px] text-[#f00]">
          {formState.errors.password?.type === "required" &&
            "Это поле обезательное"}
        </p>

        {/* Кнопка для отправки формы */}
        <Button href="/">Войти</Button>
      </form>

      {/* Ссылка на восстановление пароля */}
      <a href="#">Забыли пароль?</a>

      {/* Раздел с регистрацией и иконками социальных сетей */}
      <div className="registration">
        <span>
          У вас нет аккаунта?{" "}
          <a href="/auth/registration">Зарегистрироваться</a>
        </span>
        <p>Войти с помощью</p>
        <div className="icons-wrapper">
          {icons.map((icon, index) => (
            <IconLink key={index} {...icon} />
          ))}
        </div>
      </div>
    </div>
  );
};
