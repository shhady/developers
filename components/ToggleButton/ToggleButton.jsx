import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      {theme === 'light' ? (
        <div onClick={toggleTheme} style={{cursor:"pointer"}}><FaMoon className="iconsHeader"/><span className='headerNames'>dark mode</span></div>
      ) : (
       <div  onClick={toggleTheme} style={{cursor:"pointer"}}> <FaSun className="iconsHeader"/><span className='headerNames'>light mode</span></div>
      )}
    </div>
  );
};

export default ToggleButton;
