import React from "react";
import { Link } from "react-router-dom";

const PageWithForm = ({ onSubmit, isRegister, children }) => {
  return (
    <main className="auth-page">
      <form className="auth-page__form" onSubmit={onSubmit}>
        <h2 className="auth-page__title">
          {isRegister ? "Регистрация" : "Вход"}
        </h2>
        {children}

        {isRegister && (
          <p className="auth-page__out-text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="auth-page__link">
              Войти
            </Link>
          </p>
        )}
      </form>
    </main>
  );
};

export default PageWithForm;
