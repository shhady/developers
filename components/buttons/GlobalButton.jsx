import React,{useContext} from 'react'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { ThemeContext } from '../context/themeContext';
import { Link } from 'react-router-dom';
export default function GlobalButton({project}) {
    const { theme } = useContext(ThemeContext);
  return (<div className='cardDetails-icons'>
    <Link to={project?.githubLink} target="_blank"> <button className={`buttonProfile${theme}`} ><GitHubIcon  sx={{ mr: 1 }}/>Github</button> </Link>
    <Link to={project?.url} target="_blank"><button className={`buttonProfile${theme}`}><LinkIcon  sx={{ mr: 1 }}/>Demo</button> </Link>
    <Link to={project?.github} target="_blank"><button className={`buttonProfile${theme}`}><ContactMailIcon  sx={{ mr: 1 }}/>Contact</button> </Link>
    </div>
  )
}
