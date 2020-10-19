import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Context
import alertContext from '../../context/alerts/context';
import authContext from '../../context/auth/context';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  // history
  const history = useHistory();

  // Consume context's alert
  const alertState = useContext(alertContext);
  const { alert, showAlertFn } = alertState;
  // Consume context's auth
  const authState = useContext(authContext);
  const { message, authenticated, loginFn } = authState;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation fields
    if (email.trim() === '' || password.trim() === '') return showAlertFn('All fields are required.', 'alert-error');

    loginFn({ email, password });
  };

  // Observer user actions
  useEffect(() => {
    if (message) return showAlertFn(message.msg, message.category);
    if (authenticated) return history.push('/projects');
  }, [message, authenticated, history]);

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
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="field-form">
            <p>Email</p>
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Email"
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
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>

        <Link to="/sign-up" className="link-survey">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
