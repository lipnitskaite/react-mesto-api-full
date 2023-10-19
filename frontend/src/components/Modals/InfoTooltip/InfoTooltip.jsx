import React from "react";
import successImage from "../../../images/registration_success.svg";
import failImage from "../../../images/registration_fail.svg";
import styles from "./InfoTooltip.module.scss";

function InfoTooltip({
  isOpen,
  successResult,
  onClose,
  successMessage,
  failMessage,
}) {
  return (
    <section className={`${styles.modal} ${isOpen && styles.opened}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.container}>
        <button
          className={styles.close}
          type='button'
          onClick={onClose}
        ></button>
        <figure className={styles.response}>
          <img
            alt='Изображение успеха/неудачи операции'
            src={successResult ? successImage : failImage}
            className={styles.response_image}
          />
          <p className={styles.response_text}>
            {successResult ? successMessage : failMessage}
          </p>
        </figure>
      </div>
    </section>
  );
}

export default InfoTooltip;
