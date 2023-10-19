import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy;&nbsp;2022&nbsp;Mesto&nbsp;Russia
      </p>
    </footer>
  );
}

export default Footer;
