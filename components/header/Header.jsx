import React,{useState, useRef, useEffect, useContext} from 'react';
import "./Header.css"
import ToggleButton from '../ToggleButton/ToggleButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/userContext';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import TvIcon from '@mui/icons-material/Tv';
import { ThemeContext } from '../../components/context/themeContext'
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate()
  const headerRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = ()=>{
    logout()
    navigate('/')
  } 
  return (
    <>
    {width > 600 ? (<div className={`${theme}header`}  ref={headerRef}>
    
    <div className='logoAndMenu'>
     <div onClick={()=>navigate('/')}>Logo</div>
     
     <div className='iconsAndName' onClick={()=> navigate('/')}><HomeIcon className="iconsHeader"/><span className='headerNames'>Home</span></div>
     <div className='iconsAndName' onClick={()=> navigate('/projects')}><DeveloperModeIcon className="iconsHeader" /><span className='headerNames'>Projects</span></div>
     <div className='iconsAndName' onClick={()=> navigate('/live-coding')}><TvIcon className="iconsHeader" /><span className='headerNames'>Live coding</span></div>
     <div className='iconsAndName'><ContactPageIcon className="iconsHeader" /><span className='headerNames'>Contact us</span></div>
     <div className='iconsAndName'><InfoIcon className="iconsHeader" /><span className='headerNames'>About</span></div>
     </div>
     <div className='logoAndMenu'>
     <ToggleButton />
     {user ? ( <><div className='iconsAndName' onClick={()=> navigate(`/profile/${user?._id}`)}><img src={user.avatar} alt='' style={{width:"25px", height:"25px", borderRadius:"50%", marginRight:"10px"}}/> profile</div><div className='iconsAndName'  onClick={handleLogout}> <LogoutIcon className="iconsHeader" />
     <span className='headerNames'>logout</span></div></>):
     ( <div className='iconsAndName' onClick={()=>navigate('/auth')}> <LoginIcon className="iconsHeader" /><span className='headerNames'>login</span></div>)}
  
     </div>
 </div>):(<div className={`${theme}headerMobile`}   ref={headerRef}>
 <div onClick={()=>navigate('/')} className='logo'>Logo</div>
 <div className='logoAndMenuMobile'>
  <div className='iconsAndName' onClick={()=> navigate('/')}><HomeIcon className="iconsHeader"/><span className='headerNames'>Home</span></div>
  <div className='iconsAndName' onClick={()=> navigate('/projects')}><DeveloperModeIcon className="iconsHeader" /><span className='headerNames'>Projects</span></div>
  <div className='iconsAndName' onClick={()=> navigate('/live-coding')}><TvIcon className="iconsHeader" /><span className='headerNames'>Live coding</span></div>
  {user &&  <div className='iconsAndName' onClick={()=> navigate(`/profile/${user?._id}`)}><img src={user?.avatar} alt='' style={{width:"25px", height:"25px", borderRadius:"50%", marginRight:"10px"}}/></div>}
  {/* <div className='iconsAndName'><ContactPageIcon className="iconsHeader" /><span className='headerNames'>Contact us</span></div>
  <div className='iconsAndName'><InfoIcon className="iconsHeader" /><span className='headerNames'>About</span></div> */}
  {user ? ( <div className='iconsAndName' onClick={handleLogout}> <LogoutIcon className="iconsHeader"  /><span className='headerNames'>logout</span></div>):
     ( <div className='iconsAndName' onClick={()=>navigate('/auth')}> <LoginIcon className="iconsHeader" /><span className='headerNames'>login</span></div>)}
  
  </div>
  <div className='themeToggleButton'>
  <ToggleButton />

  </div>
</div>)}
</>
    
  )
}
