import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../components/context/userContext';
import "./LoginRegister.css"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {ThemeContext} from '../../components/context/themeContext'
const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useContext(ThemeContext);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: theme === 'light' ? 'white' : 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px',
  };
  const inputStyle ={
    borderRadius:'10px',
    bgcolor: theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.16)',
    color: theme === 'light' ? 'black' : 'white',
    // border: theme === 'light' ? '1px solid white' : '1px solid white',
    '& input': { // Targeting the input element specifically
      color: theme === 'light' ? 'black' : 'white', // Changing the text color
  },// Corrected property for text color
    // If you need to change the border color or other properties, you can add them here
    '& label': { // Styling the label
        color: theme === 'light' ? 'black' : 'white',
    },
    '& .MuiInput-underline:before': { // Styling the underline with normal state
        borderBottomColor: theme === 'light' ? 'black' : 'white',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { // Styling the underline on hover
        borderBottomColor: theme === 'light' ? 'black' : 'white', // use your theme colors
    },
  }
const navigate = useNavigate()
  const { login ,  errorM, setErrorM} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    // Simulate user authentication (you might want to use a server and authentication flow here)
    const userData = { email, password };
    login(userData);
    const succeeded =await login(userData)
    if(succeeded === 'loginSuccess'){
        navigate('/')
    } 
  };
useEffect(()=>{
    setErrorM('')
},[])

  return (
    <div className={`AuthContainer${theme}`}>
     <Box sx={style}>
  <h2>Sign In</h2>
<form  onSubmit={handleLogin} className='addProjectForm'>
<TextField sx={inputStyle} fullWidth label="email" id="email" name='email' onChange={(e) => {setEmail(e.target.value); setErrorM('')}}/>
<TextField sx={inputStyle} fullWidth type="password" label="password" id="password" name='password' onChange={(e) => {setPassword(e.target.value); setErrorM('')}}/>
<Button variant="contained" type='submit'>
Submit
</Button>
<div style={{color:"red"}}>{errorM ? errorM : ''}</div>
{/* {errorM && <div style={{ color: 'red', marginTop: '10px' }} key={i}>{errorM}</div>} */}
</form>
<div onClick={()=> navigate('/register')}>don't have an account ? <u style={{cursor:'pointer'}}>Sign Up</u></div>
</Box>
     
    </div>
  );
};

export default LoginRegister;