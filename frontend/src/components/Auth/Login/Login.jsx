import React, { useState } from "react";
import styles from "./Login.module.scss";

function Login({ handleLogin }) {
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

    handleLogin(email, password).catch((err) => console.log(err));
  }

  return (
    <section className={styles.login}>
      <form
        className={styles.form}
        name='login'
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className={styles.form_title}>Вход</h2>
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
          value='Войти'
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
