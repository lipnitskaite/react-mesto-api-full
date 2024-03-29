import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import styles from "./Main.module.scss";

function Main({
  onEditAvatar,
  onEditProfile,
  cards,
  onAddCard,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className={styles.profile}>
        <div className={styles.photoContainer}>
          <img
            src={currentUser.avatar}
            className={styles.photo}
            alt='User profile'
          />
          <button
            className={styles.editPhotoButton}
            type='button'
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className={styles.mainInfoContainer}>
          <h1 className={styles.title}>{currentUser.name}</h1>
          <button
            className={styles.editInfoButton}
            type='button'
            onClick={onEditProfile}
          ></button>
        </div>
        <p className={styles.subtitle}>{currentUser.about}</p>
        <button
          className={styles.addCardButton}
          type='button'
          onClick={onAddCard}
        ></button>
      </section>

      <section className={styles.cards}>
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
