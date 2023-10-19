import React from "react";
import styles from "./ImageModal.module.scss";

function ImageModal({ card, onClose }) {
  return (
    <section className={`${styles.modal} ${card && styles.opened}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.container}>
        <button
          className={styles.close}
          type='button'
          onClick={onClose}
        ></button>
        <figure className={styles.imageContainer}>
          <img
            alt={card && card.name}
            src={card && card.link}
            className={styles.image}
          />
          <figcaption className={styles.caption}>
            {card && card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImageModal;
