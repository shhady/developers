
import React, { useContext } from 'react';
import { ThemeContext } from '../../components/context/themeContext';
import "./home.css"
import Hero from "../../components/Hero/Hero"

export default function Home() {
    const { theme } = useContext(ThemeContext);
  return (
    <div className='Home'>
      <Hero />
    </div>
  )
}
