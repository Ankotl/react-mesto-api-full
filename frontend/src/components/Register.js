import React, { useState } from "react";
import PageWithForm from "./PageWithForm";

const Register = ({ onRegister, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      password,
      email,
    });
  }

  return (
    <PageWithForm isRegister={true} onSubmit={handleSubmit}>
      <input
        className="auth-page__input"
        placeholder="Email"
        type="text"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className="auth-page__input"
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        className="auth-page__btn-submit"
        type="submit"
        title="Создать"
        aria-label="Создать"
      >
        {!isLoading ? "Зарегистрироваться" : "Регистрация..."}
      </button>
    </PageWithForm>
  );
};

export default Register;
