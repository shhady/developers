import React, { useEffect, useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import "./AddProject.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {useSelector, useDispatch} from 'react-redux'
import { projectActions } from '../../src/storeSlices/ProjectSlice';
import { useAddProjectMutation,useUpdateProjectMutation } from '../../src/services/projectsApi';
import ImageUpload from '../buttons/ImageUpload';
import { useParams } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function AddEditProject() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const handleOpen = () => {setOpen(true);setErrorMessage([]) };
  const dispatch = useDispatch();
  const projectSlice = useSelector(state => state.project.project);
  const handleClose = () => {setOpen(false);dispatch(projectActions.setOriginalProject(null)); setErrorMessage([])};

  const [addProject]=useAddProjectMutation();
  const [updateProject]=useUpdateProjectMutation();
  const [imageBase64, setImageBase64] = useState('');
  const {id}=useParams()
  useEffect(()=>{
    if(projectSlice){
      setOpen(true);
    }
  },[projectSlice])
 
  const handleAddProject = async (e)=>{
e.preventDefault();
const project = {
  name: e.target.name.value,
  description: e.target.description.value,
  image: imageBase64 ? imageBase64 : projectSlice?.image ? projectSlice?.image : 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=600',
  githubLink:e.target.githubLink.value,
  url: e.target.url.value,
  projectType:e.target.projectType.value,
}

if(projectSlice) {
  try {
    project.id = projectSlice._id
    const result = await updateProject(project).unwrap();
      handleClose();
      // dispatch(projectActions.setOriginalProject(null))
  } catch (error) {
    console.error('Error executing addProject mutation:', error);
    const errorMessages = error.data.split('failed:').slice(1)[0].trim()
    // setErrorMessage([...error.data.message] || error.data.split(':').slice(1) || ['An unexpected error occurred.']);
    setErrorMessage(error.data.message? [error.data.message] : error.data? errorMessages.split(', ') : ['An unexpected error occurred.']);
  }
} else {
  try {
    const result = await addProject(project);
      handleClose();
  } catch (error) {
    console.error('Error executing addProject mutation:', error);
    setErrorMessage([error.data.message] || ['An unexpected error occurred.']);
  }
}

  }

    return (
    <div>

     <div className='addProjectsIcon dark' onClick={handleOpen}><FaCirclePlus /></div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  
  <Box sx={style}>
    <h2 style={{color:'black', marginBottom:'15px'}}>{projectSlice ? 'Edit' : 'Add'} project</h2>
    <form onSubmit={handleAddProject} className='addProjectForm'>
  <TextField fullWidth label="Project Name" id="Name" name='name' defaultValue={projectSlice ? projectSlice.name : '' }/>
  <TextField fullWidth label="Project Type" id="projectType" name='projectType' defaultValue={projectSlice ? projectSlice.projectType : '' }/>
  <TextField fullWidth label="description" id="description" name='description' defaultValue={projectSlice ? projectSlice.description : '' }/>
  <TextField fullWidth label="githubLink" id="githubLink" name='githubLink' defaultValue={projectSlice ? projectSlice.githubLink : '' }/>
  <TextField fullWidth label="url" id="url" name='url' defaultValue={projectSlice ? projectSlice.url : '' }/>
  <ImageUpload setImageBase64={setImageBase64} imageBase64={imageBase64} projectSlice={projectSlice}/>
  <Button variant="contained" type='submit'>
  Submit
</Button>
{errorMessage.map((error,i) =>{
  return <div style={{ color: 'red', marginTop: '10px' }} key={i}>{error}</div>
})}
  </form>
  </Box>
</Modal>
    </div>
  )
}
