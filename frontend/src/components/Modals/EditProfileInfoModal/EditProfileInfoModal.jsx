import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import styles from "./EditProfileInfoModal.module.scss";

function EditProfileInfoModal({ isOpen, onClose, onUpdateUser }) {
  const handleClose = () => onClose();

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <ModalWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={[
        <fieldset className={styles.container}>
          <input
            id='name-input'
            className={styles.input}
            placeholder='Имя'
            type='text'
            name='name'
            value={name || ""}
            onChange={handleNameChange}
            required
            minLength='2'
            maxLength='40'
          />
          <span className={styles.error}></span>
          <input
            id='job-input'
            className={styles.input}
            placeholder='Занятие'
            type='text'
            name='about'
            value={description || ""}
            onChange={handleDescriptionChange}
            required
            minLength='2'
            maxLength='200'
          />
          <span className={styles.error}></span>
        </fieldset>,
      ]}
    />
  );
}

export default EditProfileInfoModal;
