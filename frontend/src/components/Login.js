import React, { useState } from "react";

import PageWithForm from "./PageWithForm";

const Login = ({ onLogin, isLoading }) => {
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
    onLogin({
      password,
      email,
    });
  }

  return (
    <PageWithForm onSubmit={handleSubmit}>
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
        {!isLoading ? "Войти" : "Вход..."}
      </button>
    </PageWithForm>
  );
};

export default Login;
