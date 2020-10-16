import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const {
    name, email, password, passwordConfirmation,
  } = user;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form-user">
      <div className="content-form shadow-dark">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="field-form">
            <p>Email</p>
            <label htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                placeholder="Your name"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="field-form">
            <p>Email</p>
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Your email"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="field-form">
            <p>Password</p>
            <label htmlFor="password">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Your password"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="field-form">
            <p>Password confirmation</p>
            <label htmlFor="passwordConfirmation">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                placeholder="Repeat password"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="field-form">
            <input
              type="submit"
              value="SignUp"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>

        <Link to="/" className="link-survey">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
