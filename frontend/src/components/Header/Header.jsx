import React from "react";
import { Link, Route } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";

function Header(props) {
  return (
    <header className={styles.header}>
      <Logo />

      <Route exact path='/'>
        <ul className={styles.nav}>
          <li className={styles.nav_item}>{props.userEmail}</li>
          <li className={styles.nav_item}>
            <button
              onClick={props.signOut}
              className={`${styles.link} ${styles.link_signout}`}
            >
              Выйти
            </button>
          </li>
        </ul>
      </Route>

      <Route path='/sign-up'>
        <Link to={`./sign-in`} className={styles.link}>
          Войти
        </Link>
      </Route>

      <Route path='/sign-in'>
        <Link to={`./sign-up`} className={styles.link}>
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;
