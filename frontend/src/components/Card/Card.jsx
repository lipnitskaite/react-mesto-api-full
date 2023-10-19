import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import styles from "./Card.module.scss";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser.id;
  const cardDeleteButtonClassName = `${styles.deleteButton} ${
    !isOwn && styles.deleteButton_inactive
  }`;

  const isLiked = card.likes.some((like) => like === currentUser.id);
  const cardLikeButtonClassName = `${styles.like_button} ${
    isLiked ? styles.like_button_active : styles.like_button_inactive
  }`;

  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  const handleCardClick = () => onCardClick(card);
  return (
    <article className={styles.card}>
      <img
        src={card.link}
        alt={card.name}
        className={styles.image}
        onClick={handleCardClick}
      />
      <div className={styles.main}>
        <h2 className={styles.title}>{card.name}</h2>
        <div className={styles.like}>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <p className={styles.like_number}>{card.likes.length}</p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          onClick={handleDeleteClick}
        ></button>
      </div>
    </article>
  );
}

export default Card;
