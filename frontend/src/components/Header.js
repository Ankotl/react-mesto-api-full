import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ email, onSignOut }) => {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <nav className="header__navbar">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <button className="header__button" onClick={onSignOut}>
                  Выйти
                </button>
              </>
            }
          />
          <Route
            path="sign-in"
            element={
              <Link className="header__button" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link className="header__button" to="/sign-in">
                Войти
              </Link>
            }
          />
        </Routes>
      </nav>
    </header>
  );
};

export default Header;
