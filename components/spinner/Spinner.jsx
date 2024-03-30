
import React from 'react'
import CircularProgress from '@mui/material-next/CircularProgress';
export default function Spinner() {
  return (
    <div style={{height:"100dvh", display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'center', width:'100%'}}><CircularProgress color="primary" variant="indeterminate"/></div>
  )
}
