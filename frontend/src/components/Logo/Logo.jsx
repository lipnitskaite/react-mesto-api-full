import React from "react";
import logo from "../../images/logo-mesto.svg";
import styles from "./Logo.module.scss";

function Logo() {
  return <img src={logo} alt="Logo 'Mesto'" className={styles.logo} />;
}

export default Logo;
