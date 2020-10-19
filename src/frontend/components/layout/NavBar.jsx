import React, { useContext } from 'react';
// Context
import authContext from '../../context/auth/context';

const NavBar = () => {
  // Consume auth context
  const authState = useContext(authContext);
  const { user, logoutFn } = authState;
  return (
    <header className="app-header">
      {
        Object.keys(user).length > 0 && (
          <p className="name-user">
            Hey
            {' '}
            <span>{user.name}</span>
          </p>
        )
      }

      <nav className="nav-principal">
        <button
          type="button"
          className="btn btn-blank"
          onClick={logoutFn}
        >
          LogOut
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
