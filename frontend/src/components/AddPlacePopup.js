import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      isLoading={isLoading}
      buttonText="Создать"
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          placeholder="Название"
          name="inputTitle"
          required
          minLength="2"
          maxLength="30"
          id="input-title"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error input-title-error"></span>
        <input
          className="popup__input"
          type="url"
          placeholder="Ссылка на картинку"
          name="inputLink"
          required
          id="input-link"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error input-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
