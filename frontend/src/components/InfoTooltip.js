import React from "react";
import error from "../images/error.svg";
import success from "../images/success.svg";

const InfoTooltip = ({ isOpen, onClose, isError }) => {
  return (
    <section className={`popup  ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          src={isError ? error : success}
          alt="Статус"
          className="popup__status"
        />
        <p className="popup__info-message">
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
        <button
          onClick={onClose}
          className="popup__btn-close"
          type="button"
          title="Закрыть"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
};

export default InfoTooltip;
