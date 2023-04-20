// App.js
import React, { useState, useEffect } from 'react';
import UserForm from './Components/UserForm';
import { LIGHT_THEME, DARK_THEME } from './assets/themes';
import './styles/App.css';

const App = () => {
  const [theme, setTheme] = useState(LIGHT_THEME);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const toggleTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  return (
    <div className={`app ${theme}`}>
      <h1>User Form</h1>
      <button onClick={toggleTheme} className="dark-mode-btn">
        Toggle Dark Mode
      </button>
      <UserForm theme={theme} />
    </div>
  );
};

export default App;
