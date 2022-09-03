import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <section className={`popup popup_picture ${card.name && "popup_opened"}`}>
      <div className="popup__content">
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__caption">{card.name}</p>
        <button
          className="popup__btn-close"
          type="button"
          title="Закрыть"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
};

export default ImagePopup;
