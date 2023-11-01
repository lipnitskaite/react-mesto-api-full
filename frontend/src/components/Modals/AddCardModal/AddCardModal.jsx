import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import styles from "./AddCardModal.module.scss";

function AddCardModal({ isOpen, onClose, onAddPlace }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cardName, setCardName] = useState("");
  const [cardPhotoLink, setCardPhotoLink] = useState("");

  const handleClose = () => onClose();
  const onSubmit = () => {
    onAddPlace({
      name: cardName,
      link: cardPhotoLink,
    });
  };

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

  return (
    <ModalWithForm
      name='add-post'
      title='New place'
      buttonTitle='Create'
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      children={[
        <fieldset className={styles.container}>
          <div
            className={`${styles.inputContainer} ${
              errors?.name && styles.inputContainer_error
            }`}
          >
            <input
              className={`${styles.input} ${
                errors?.name && styles.input_error
              }`}
              {...register("name", {
                required: "Please fill out this field.",
                minLength: {
                  value: 2,
                  message: "Input must be minimum 2 characters long.",
                },
                maxLength: {
                  value: 30,
                  message: "Input must be maximum 30 characters long.",
                },
              })}
              id='title-input'
              placeholder='Name'
              type='text'
              name='name'
              value={cardName}
              onChange={handleCardNameChange}
            />
            {errors?.name && (
              <span className={styles.error}>{errors?.name?.message}</span>
            )}
          </div>
          <div
            className={`${styles.inputContainer} ${
              errors?.link && styles.inputContainer_error
            }`}
          >
            <input
              className={`${styles.input} ${
                errors?.link && styles.input_error
              }`}
              {...register("link", {
                required: "Please fill out this field.",
                minLength: {
                  value: 2,
                  message: "Input must be minimum 2 characters long.",
                },
              })}
              id='image-input'
              placeholder='Image link'
              type='url'
              name='link'
              value={cardPhotoLink || ""}
              onChange={handleCardPhotoLinkChange}
            />
            {errors?.link && (
              <span className={styles.error}>{errors?.link?.message}</span>
            )}
          </div>
        </fieldset>,
      ]}
    />
  );
}

export default AddCardModal;
