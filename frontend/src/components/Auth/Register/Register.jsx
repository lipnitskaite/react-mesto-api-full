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
        <h2 className={styles.title}>Create an account</h2>
        <fieldset className={styles.container}>
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
          {/* <span className="login-input-error"></span> */}
          <input
            onChange={handleChange}
            value={password}
            id='password-input'
            className={styles.input}
            type='password'
            name='password'
            placeholder='Password'
            required
          />
          {/* <span className="login-input-error"></span> */}
        </fieldset>
        <button
          className={styles.button}
          type='submit'
          name='submit'
          value='Sign up'
        >
          Sign up
        </button>
      </form>
      <p className={styles.text}>
        Already have an account?{" "}
        <Link to={`./sign-in`} className={styles.link}>
          Sign in
        </Link>
      </p>
    </section>
  );
}

export default Register;
