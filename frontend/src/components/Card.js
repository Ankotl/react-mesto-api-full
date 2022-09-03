import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  

  const isOwn = card.owner === currentUser._id;
  
  const isLiked = card.likes.some((i) => i === currentUser._id); 
  const cardLikeButtonClassName = `element__btn-like ${
    isLiked ? "element__btn-like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__figure">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="element__info">
          <h2 className="element__caption">{card.name}</h2>
          <div className="element__like-block">
            <button
              className={cardLikeButtonClassName}
              type="button"
              title="Нравится"
              aria-label="Нравиться"
              onClick={handleLikeClick}
            ></button>
            <p className="element__like-count">{card.likes.length}</p>
          </div>
        </div>
      </div>
      {isOwn && (
        <button
          className="element__btn-delete"
          type="button"
          title="Удалить"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
};

export default Card;
