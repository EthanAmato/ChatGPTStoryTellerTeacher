// App.js
import React, { useState, useEffect, Suspense } from 'react';
import UserForm from './Components/UserForm';
import { LIGHT_THEME, DARK_THEME } from './assets/themes';
import './styles/App.css';
import useGetStory from './Hooks/useGetStory';
import Story from './Components/Story';
const App = () => {
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [story, setStory] = useState();

  // Custom response variables (all are STATES that are defined in our custom hook)
  // That contain our: 
  // 1. API response data
  // 2. A boolean value that keeps track of when our data is loading or not
  // 3. Any errors that pop up (we don't really deal with this that much for the sake of simplicity)
  // 4. A callback function that calls OpenAI and manages/sets the states of 1-3 
  //    The beauty of fetchStory is that it provides a layer of abstraction that simplifies
  //    the need to worry about handling the individual state of data, isLoading, and error outside of the useGetStory hook
  const { data, isLoading, error, fetchStory } = useGetStory();


  // Every time we shift the theme state, we change the className of the body tag in html to apply different styling
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  //Whenever data changes (i.e. we get a response from ChatGPT / our useGetStory hook), we update our story state so we can pass it to our story component
  useEffect(() => {
    if (data) {
      //This traversal is just where our chatgpt data response is located in the JSON from our API call
      setStory(data.data.choices[0].message.content)
    }
  }, [data])

  //Whenever button pressed, use ternary operators to shift between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  return (
    // shift class name that corresponds to different styling for each theme (light/dark)
    <div className={`app ${theme}`}>
      <h1>User Form</h1>
      <button onClick={toggleTheme} className="dark-mode-btn">
        Toggle Dark Mode
      </button>
      <UserForm theme={theme} setStory={setStory} fetchStory={fetchStory} />
      {isLoading ? <h1 style={{ color: 'red' }}>Loading...</h1> :
        <>
         <Story text={story}></Story>
        </>
      }
    </div>
  );
};

export default App;
