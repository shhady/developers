import React,{ useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/userContext"
import { ThemeContext } from '../context/themeContext';
import {useUpdateProjectInteractionMutation} from '../../src/services/projectsApi'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './likes.css'
export default function Likes({project, setChosenCard}) {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [updateProjectInteraction] = useUpdateProjectInteractionMutation();
    const [likes, setLikes] = useState([])
    const id = project._id;
    useEffect(()=>{
        setLikes(project?.likes)
    },[])

      
        const handleLikes = async ()=>{
            const likedPerson = likes.find(like => like.userId.toString() === user?._id);
            if(likedPerson){
                const removed = likes.filter(like => like.userId.toString() !== likedPerson.userId);
                setLikes(removed)
                await updateProjectInteraction({id:id, userId: user?._id})
            }else{
                setLikes([...likes, { userId: user?._id}])
                await updateProjectInteraction({id:id, userId: user?._id})
            }
        
        setChosenCard(id)
    //    await updateProjectInteraction({id:id, userId: user?._id})
        setChosenCard(null)
    }
    const userLiked = likes.find(likeObj => likeObj.userId === user?._id)
  return (
    <div onClick={user ? handleLikes : undefined} className='likeAndCounter'>{userLiked ? <FavoriteIcon/>:<FavoriteBorderIcon/>} {likes.length}</div>
  )
}
