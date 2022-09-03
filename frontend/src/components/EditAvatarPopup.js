import React from "react";
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }
  useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      isLoading={isLoading}
      buttonText="Сохранить"
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="url"
          placeholder="Ссылка на картинку"
          name="inputLink"
          required
          id="input-link-avatar"
          ref={avatar}
        />
        <span className="popup__error input-link-avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
