// App.js
import React, { useState, useEffect } from 'react';
import UserForm from './Components/UserForm';
import { LIGHT_THEME, DARK_THEME } from './assets/themes';
import './styles/App.css';
import useGetStory from './Hooks/useGetStory';
const App = () => {
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [story, setStory] = useState();
  const { data, isLoading, error, fetchStory } = useGetStory();


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if(data) {
      setStory(data.data.choices[0].message.content)
    }
  }, [data])

  const toggleTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  return (
    <div className={`app ${theme}`}>
      <h1>User Form</h1>
      <button onClick={toggleTheme} className="dark-mode-btn">
        Toggle Dark Mode
      </button>
      <UserForm theme={theme} setStory={setStory} fetchStory={fetchStory}/>
      {isLoading ? <h1 style={{color: 'red'}}>LOADING</h1> : <p>{story}</p>}
    </div>
  );
};

export default App;
