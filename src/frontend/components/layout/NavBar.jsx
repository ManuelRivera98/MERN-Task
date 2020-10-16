import React from 'react';

const NavBar = () => (
  <header className="app-header">
    <p className="name-user">
      Hey
      {' '}
      <span>Manuel Rivera</span>
    </p>

    <nav className="nav-principal">
      <a href="#!">LogOut</a>
    </nav>
  </header>
);

export default NavBar;
