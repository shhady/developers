import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import { AuthContext } from '../../components/context/userContext';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditButton from '../../components/buttons/EditButton';
import { ThemeContext } from '../../components/context/themeContext';
import Likes from '../../components/likesComments/Likes';
import Box from '@mui/material/Box';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton'
export default function ProjectCard({project, isFetching, myId}) {
  const [chosenCard, setChosenCard] = useState(null)
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  
  return (<>
      {isFetching && chosenCard === project._id ? 
      <Box sx={{ display: 'flex',margin:'auto', width:'320px', justifyContent:'center', alignItems:'center', height:'340px',boxShadow: '0 2px 5px rgba(97, 90, 146, 0.551)',
      borderRadius: '4px'  }}>
             <CardSkeleton />
           </Box>
            : <div className='card'>
           <Link to={`/profile/${project?.user._id}`}>
          {myId ? (''):(<Typography gutterBottom variant="h5" component="div" className='projectUserDetails'>
            <img src={project?.user.avatar} alt='profile' style={{width:"35px", height:"35px", borderRadius:"50%", marginRight:"10px"}}/>
            {project?.user.userName}
             </Typography>)} 
             </Link>
             <Link to={`/projects/${project?.name}?id=${project?._id}`} state={{ myData: project }} className={`link${theme}`}>
           <img
             className='imgCard'
             alt="no img"
             src={project?.image}
           />
           <Typography gutterBottom variant="h5" component="div">
          
            {project?.name}
             
             </Typography>
           <div className='card-text'>
           
             <div className='card-description'>
             {project?.description.slice(0, 90)}...
             </div>
           </div>
           </Link> 
           
           <div className='card-text start'>
           <div>Studied at: {project?.user.education}</div> 
           <div>Type: {project?.projectType}</div>
           </div>
           <div className='card-text start'>
               <Likes project={project} setChosenCard={setChosenCard}/>
           </div>
           <div className='card-icons'>
             <Button size="small"><GitHubIcon fontSize="small" sx={{ mr: 1 }}/></Button>
             <Button size="small"><LinkIcon  sx={{ mr: 1 }}/></Button> 
            {user?._id === project?.user._id && <> <EditButton project={project}/>
            <DeleteButton projectId={project?._id}/>
            </>}
           </div>
         </div>}
        
         </>
  )
}
