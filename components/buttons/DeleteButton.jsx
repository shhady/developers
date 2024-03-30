import React from 'react'
import { useDeleteProjectMutation } from '../../src/services/projectsApi';
import { useDeleteUserMutation } from '../../src/services/usersApi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
export default function DeleteButton({projectId, userId}) {
    const [deleteProject] = useDeleteProjectMutation()
    const [deleteUser] = useDeleteUserMutation()
const handleDelete = async ()=>{
    if(projectId){
        await deleteProject(projectId);
    } else if(userId){
        await deleteUser(userId);
    }

}
  return (
    <Button size="small"><DeleteIcon onClick={handleDelete} sx={{ mr: 1 }}/></Button> 
  )
}
