import React from 'react';
import '../styles/Header.css';

function Header({ onToggleTheme, theme }) {
  return (
    <header className="header">
      <label className="switch">
        <input
          type="checkbox"
          onChange={onToggleTheme}
          checked={theme === 'dark'}
          aria-label="Toggle dark/light mode"
        />
        <span className="slider round"></span>
      </label>

      <h1>VedaSkript</h1>

      <p>
        <strong>vedaskript</strong> is a toy programming language, based on Sanskrit keywords and operators. It supports variables, basic operations, loops, conditions, and built-in functions, all expressed in Sanskrit.
      </p>

      <div>
        <button
          className="view-source"
          onClick={() => window.open('https://github.com/Immortal-CyberGuy')}
        >
          View Source <i className="fa-solid fa-code"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
