import React from "react";

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading,
  buttonText,
}) => {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__btn-save"
            type="submit"
            title="Создать"
            aria-label="Создать"
          >
            {isLoading ? "Сохранение..." : buttonText}
          </button>
        </form>
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

export default PopupWithForm;
