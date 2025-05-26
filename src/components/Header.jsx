import React from 'react';
import '../styles/Header.css';

function Header({ onToggleTheme, theme }) {
  return (
    <header className="header enhanced-header">
      <label className="switch theme-toggle">
        <input
          type="checkbox"
          onChange={onToggleTheme}
          checked={theme === 'dark'}
          aria-label="Toggle dark/light mode"
        />
        <span className="slider round"></span>
      </label>

      <h1 className="logo-text">TarkSkript</h1>

      <p className="header-description">
        <strong>tarkskript</strong> is a Sanskrit-inspired programming language supporting loops, logic, functions, and variables—all in pure Sanskrit.
      </p>

      <div className="source-button-wrapper">
        <button
          className="view-source enhanced-button"
          onClick={() => window.open('https://github.com/Immortal-CyberGuy')}
        >
          View Source <i className="fa-solid fa-code"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
