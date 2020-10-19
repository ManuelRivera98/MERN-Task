import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// Context
import alertContext from '../../context/alerts/context';
import authContext from '../../context/auth/context';

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

  // history
  const history = useHistory();

  // Consume context's alert
  const alertState = useContext(alertContext);
  const { alert, showAlertFn } = alertState;
  // Consume context's auth
  const authState = useContext(authContext);
  const { message, user: userContext, registerUserFn } = authState;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validations fields
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || passwordConfirmation.trim() === '') {
      return showAlertFn('All fields are required.', 'alert-error');
    }

    // Password
    if (password.length < 6 || passwordConfirmation.length < 6) return showAlertFn('The password must be at least 6 characters long', 'alert-error');

    // Password match
    if (password !== passwordConfirmation) return showAlertFn('Password does not match', 'alert-error');

    registerUserFn({ name, email, password });
  };

  // Observe user actions
  useEffect(() => {
    if (message) return showAlertFn(message.msg, message.category);

    if (Object.keys(userContext).length > 0) return history.push('/projects');
  }, [message, userContext, history]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form-user">
      { alert && (
        <div className={`alert ${alert.category}`}>
          {alert.msg}
        </div>
      )}
      <div className="content-form shadow-dark">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="field-form">
            <p>Name</p>
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
