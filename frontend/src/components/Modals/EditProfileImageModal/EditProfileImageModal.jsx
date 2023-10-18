import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import styles from "./EditProfileImageModal.module.scss";

function EditProfileImageModal({ isOpen, onClose, onUpdateAvatar }) {
  const handleClose = () => onClose();

  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  return (
    <ModalWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={[
        <fieldset className={styles.container}>
          <input
            id='avatar-input'
            className={styles.input}
            type='url'
            name='avatar'
            placeholder='Ссылка на картинку'
            ref={inputAvatarRef}
            required
          />
          <span className={styles.error}></span>
        </fieldset>,
      ]}
    />
  );
}

export default EditProfileImageModal;
