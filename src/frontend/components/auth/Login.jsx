import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

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
