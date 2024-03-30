import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from 'react-redux'
import { projectActions } from '../../src/storeSlices/ProjectSlice';
export default function EditButton({project}) {
    const dispatch = useDispatch();
    const handleUpdate = ()=>{
        dispatch(projectActions.setOriginalProject(project))
    }
  return (
    <Button size="small" onClick={handleUpdate}><EditIcon  sx={{ mr: 1 }}/></Button> 
  )
}
