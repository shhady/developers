import React, { useContext,useEffect,useState } from 'react';
import { ThemeContext } from '../context/themeContext';
import { AuthContext } from '../context/userContext';
import "./Hero.css"
import { useNavigate } from 'react-router-dom';
export default function Hero() {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
  return (
    <div className={`hero${theme}Container`}>
        <div className={`hero${theme}Opacity`}>
        {user ? (<div className='heroText'> <h1>welcome back</h1><h2>{user?.userName}</h2><button className={`button${theme}`} onClick={()=> navigate('/projects')}>explore projects</button></div>)
        :(<div className='heroText'>
            <h2> Sign in to explore our complete range of features and tools, Be the first to know about our latest updates and offerings.</h2>
            <button className={`button${theme}`} onClick={()=>navigate('/auth')}>sign in </button><button className={`button${theme}`} onClick={()=> navigate('/projects')}>explore projects</button></div>)}
        </div>
        
    </div>
  )
}
