import React,{useCallback, useContext, useEffect, useState} from 'react'
import "./profile.css"
import { AuthContext } from '../../components/context/userContext'
import { ThemeContext } from '../../components/context/themeContext';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditProfileModal from './EditProfileModal';
import Layout from '../../components/Layout/Layout.jsx';
import { useProjectsByOwnerQuery } from '../../src/services/projectsApi';
import ProjectCard from '../Projects/ProjectCard';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import AddEditProject from '../../components/projects/AddEditProject';
export default function Profile() {
    const {id } = useParams()
    const { user} = useContext(AuthContext)
    const {theme}= useContext(ThemeContext);
    const {data, error, isLoading, isFetching, isSuccess} = useProjectsByOwnerQuery(id);
    const [userToShow, setUserToShow] = useState('')
    
    useEffect(() => {
      if (data) {
        if (user?._id === id) {
          setUserToShow(user);
        } else {
          setUserToShow(data[0].user);
        }
      }
    }, [id, data, user]);
   if(isLoading) return <Layout><Spinner/></Layout>;
  return (
    <Layout>
      
        
        <div className='userDetails'>
            <div className='avatarContainer'><img src={userToShow?.avatar} alt='profile pic' className='avatarClass'/></div>
            <div  className='DetailsContainer'>
               <h2 className='userNameProfile'>{userToShow?.userName}</h2>
                <h5 className='userNameProfile'><AlternateEmailIcon fontSize="small" /> {userToShow?.education}</h5>
                <h5 className='userNameProfile'><LocationOnOutlinedIcon fontSize="small" />{userToShow?.address}</h5>
                <h5 className='userNameProfile'><EmailOutlinedIcon fontSize="small" /> {userToShow?.email}</h5>
                <div className='buttonsProfile'>
                    {/* <button className={`buttonProfile${theme}`} onClick={handleOpen}>Edit Profile</button> */}
                    {user?._id === id && <AddEditProject />}
                   {user?._id === id &&  <EditProfileModal theme={theme} /> }
                  
                    {/* <button className={`buttonProfile${theme}`}>Share Profile</button> */}
                </div>
            </div>

        </div>
        <div>
        {isSuccess && (
          <div className='projectsCss'>
            {data?.map(project =>{
              return  <ProjectCard key={project._id} project={project} isFetching={isFetching} myId={id}/>})}
          </div>
        )}
        </div>
      
    </Layout>
  )
}
