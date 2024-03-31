
import './App.css'
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../components/context/themeContext';
import Header from '../components/header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Projects from '../pages/Projects/Projects';
import ProjectDetails from '../pages/Projects/ProjectDetails';
import Profile from '../pages/profile/Profile';
import ScrollToTop from '../components/spinner/ScrollToTop';
import LiveCodingSessions from '../pages/live-coding/LiveCodingSessions';
import LiveCodingSession from '../pages/live-coding/LiveCodingSession';
import ScreenSharingComponent from '../pages/live-coding/ScreenSharingComponent';

 function App() {
 
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === 'dark' ? "darkTheme" : "lightTheme"}>
       <BrowserRouter>
       <ScrollToTop/>
       <Header />
       {/* <AddProject/> */}
       <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/auth' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/live-coding' element={<ScreenSharingComponent/>}/>
        <Route path='/live-coding/:id' element={<LiveCodingSession />}/>
        <Route path='/projects/:id' element={<ProjectDetails/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
