import React from "react";
import styles from "./ModalWithForm.module.scss";

function ModalWithForm({
  name = "",
  title,
  buttonTitle,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <section className={`${styles.modal} ${isOpen && styles.modal_opened}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <button
          className={styles.close}
          type='button'
          onClick={onClose}
        ></button>
        <form
          className={styles.form}
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className={styles.form_title}>{`${title}`}</h2>
          {children}
          <button
            className={styles.form_button}
            type='submit'
            name='submit'
            value={`${buttonTitle}`}
          >{`${buttonTitle}`}</button>
        </form>
      </div>
    </section>
  );
}

export default ModalWithForm;
