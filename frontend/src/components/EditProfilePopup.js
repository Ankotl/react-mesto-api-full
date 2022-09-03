import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      isLoading={isLoading}
      buttonText="Сохранить"
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          placeholder="Имя"
          name="userName"
          required
          minLength="2"
          maxLength="40"
          id="input-name"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error input-name-error"></span>
        <input
          className="popup__input"
          type="text"
          placeholder="О себе"
          name="userAbout"
          required
          minLength="2"
          maxLength="200"
          id="input-about"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error input-about-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
