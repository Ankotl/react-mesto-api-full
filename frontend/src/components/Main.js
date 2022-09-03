import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Main = ({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <button
            className="profile__avatar-edit"
            type="button"
            title="Обновить аватар"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__btn-edit"
              type="button"
              title="Редактировать профиль"
              aria-label="Редактировать профиль"
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__btn-add"
            type="button"
            title="Добавить фото"
            aria-label="Добавить фото"
          ></button>
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
