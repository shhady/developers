import React, {useContext, useEffect, useRef, useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../components/context/userContext';
import Button from '@mui/material/Button';

export default function EditProfileModal({theme}) {
    const {user, updateUser} = useContext(AuthContext)
    const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const name = useRef(null)
  const education = useRef()
  const address = useRef()
  const handleOpen = () => {setOpen(true);setErrorMessage([]) };
  const handleClose = () => {setOpen(false); setErrorMessage([])};
  const handleEditUser = async (e)=>{
    e.preventDefault()
    try{

        await updateUser({...user, userName:name.current.value, education:education.current.value, address:address.current.value});
        handleClose();
    } catch(e) {
        console.log(e)
    }
  }
  
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: theme === 'light' ? 'white' : 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px',
  };
  return (
    <>
    <button className={`buttonProfile${theme}`} onClick={handleOpen}>Edit Profile</button>
   
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    
    <Box sx={style}>
      <h2 style={{color:'black', marginBottom:'15px'}}>Edit Profile</h2>
      <form  onSubmit={handleEditUser} className='addProjectForm'>
<TextField sx={inputStyle} fullWidth label="User Name" id="userName" name='userName' defaultValue={user?.userName} inputRef={name}/>
<TextField sx={inputStyle}  fullWidth label="Address" id="address" name='address' defaultValue={user?.address} inputRef={address}/>
<TextField sx={inputStyle} fullWidth  label="Studied At..." id="education" name='education' defaultValue={user?.education} inputRef={education}/>
<Button variant="contained" type='submit'>
Submit
</Button>
</form>
    </Box>
  </Modal>
  </>
  )
}




  