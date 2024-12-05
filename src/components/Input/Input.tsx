// Input.tsx
import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label?: string; // Это необязательный проп
}

// Оборачиваем компонент в React.forwardRef, чтобы поддерживать рефы
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, value, onChange, name, label }, ref) => {
    return (
      <div className="input-group">
        {label && <label htmlFor={name}>{label}</label>}{" "}
        {/* Отображаем label, если он есть */}
        <input
          ref={ref} // Используем ref для передачи в input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="Input"
          required
        />
      </div>
    );
  }
);

// Убедитесь, что мы правильно экспортируем компонент
Input.displayName = "Input"; // Для улучшения отладки и отображения имени компонента в React DevTools
