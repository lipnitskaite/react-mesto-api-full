import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";

function Register({ handleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(email, password).catch((err) => console.log(err));
  }

  return (
    <section className={styles.register}>
      <form
        className={styles.form}
        name='register'
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className={styles.title}>Регистрация</h2>
        <fieldset className={styles.form_container}>
          <input
            onChange={handleChange}
            value={email}
            id='email-input'
            className={styles.input}
            type='email'
            name='email'
            placeholder='Email'
            required
          />
          {/* <span className="login-input-error form__input-error"></span> */}
          <input
            onChange={handleChange}
            value={password}
            id='password-input'
            className={styles.input}
            type='password'
            name='password'
            placeholder='Пароль'
            required
          />
          {/* <span className="login-input-error form__input-error"></span> */}
        </fieldset>
        <button
          className={styles.button}
          type='submit'
          name='submit'
          value='Зарегистрироваться'
        >
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.login_tip}>
        Уже зарегистрированы?{" "}
        <Link to={`./sign-in`} className={styles.login_link}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
