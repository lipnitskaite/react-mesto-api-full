import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import styles from "./AddCardModal.module.scss";

function AddCardModal({ isOpen, onClose, onAddPlace }) {
  const handleClose = () => onClose();

  const [cardName, setCardName] = useState("");
  const [cardPhotoLink, setCardPhotoLink] = useState("");

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }
  function handleCardPhotoLinkChange(e) {
    setCardPhotoLink(e.target.value);
  }

  useEffect(() => {
    setCardName("");
    setCardPhotoLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardPhotoLink,
    });
  }

  return (
    <ModalWithForm
      name='add-post'
      title='New place'
      buttonTitle='Create'
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={[
        <fieldset className={styles.container}>
          <input
            id='title-input'
            className={styles.input}
            placeholder='Name'
            type='text'
            name='name'
            value={cardName || ""}
            onChange={handleCardNameChange}
            required
            minLength='2'
            maxLength='30'
          />
          <span className={styles.error}></span>
          <input
            id='image-input'
            className={styles.input}
            placeholder='Image link'
            type='url'
            name='link'
            value={cardPhotoLink || ""}
            onChange={handleCardPhotoLinkChange}
            required
          />
          <span className={styles.error}></span>
        </fieldset>,
      ]}
    />
  );
}

export default AddCardModal;
