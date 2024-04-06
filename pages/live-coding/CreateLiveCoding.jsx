import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { LocalizationProvider, DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./LiveCodingtime.css";
import { ThemeContext } from '../../components/context/themeContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useCreateLiveCodingEventMutation } from '../../src/services/liveCodingAPI';
import { FaCirclePlus } from 'react-icons/fa6';
const CreateLiveCoding = () => {
  const [show, setShow] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true) };
  const handleClose = () => {setOpen(false)};
    const [createLiveCodingEvent] = useCreateLiveCodingEventMutation()
  const [liveSession, setLiveSession] = useState({
    projectName: '',
    tags: '',
    description: '',
    date:'',
    time:'',
    github:''
  });
  const {theme} = useContext(ThemeContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update window width state
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(liveSession);
    const result = await createLiveCodingEvent(liveSession);
    console.log(result);
  };

  // Corrected handleChange function to update project name, language, and description
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setLiveSession({ ...liveSession, [name]: value }); // Use computed property name for dynamic state updates
  };
  
  // Set up event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs once on mount

  // Calculate width based on window width
  const width = windowWidth < 600 ? '100%' : '60%';

  // Define style within the component to use dynamic width
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width, // Use dynamic width
    bgcolor: theme === 'light' ? 'white' : 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };
  
  const inputStyle = {
    borderRadius: '10px',
    backgroundColor: 'rgb(66, 66, 66)',
    color: 'white',
  };
  
  return (
    <>
        <button onClick={handleOpen}><FaCirclePlus /></button>
        <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <div className='pageFormLiveCoding'>
        <h2 style={{color : theme === 'light' ? 'black' : 'white'}}>Schedule Live Coding Session</h2>
        <form className='formLiveCoding' onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            
            <input style={inputStyle} placeholder='Project Name' label="Project Name" name="projectName" onChange={handleChange} />
           
            <input style={inputStyle} placeholder='Tags: ex. js, react, node' label="tags" name="tags" onChange={handleChange} />
           
            <input style={inputStyle}  placeholder="Description" name="description" onChange={handleChange} />
            <input style={inputStyle}  placeholder="Github link" name="github" onChange={handleChange} />
            {/* <div onClick={() => setShow(show === 'date' ? null : 'date')} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
             
              <input sx={inputStyle} type='date' fullWidth label={liveSession.date ? '':'Date'} name="date" value={liveSession.date} onClick={() => setShow(show === 'date' ? null : 'date')} />
              {show === 'date' && <DateCalendar sx={inputStyle}  onChange={(newValue) => { setLiveSession({...liveSession ,date : newValue.format('ddd YYYY-MM-DD')}); setShow(null); }} />}
            </div>  */}
            <input
                type="date"
                placeholder="WED,  JAN 22"
                value={liveSession.date}
                onChange={(e) => setLiveSession({...liveSession ,date:e.target.value})}
                required
                style={inputStyle}
              />
              <input
                type="time"
                placeholder="09:00 PM GMT+2"
                value={liveSession.time}
                onChange={(e) => setLiveSession({...liveSession ,time:e.target.value})}
                required
                style={inputStyle}
              />
            {/* <div onClick={() => setShow(show === 'time' ? null : 'time')}>
              <input sx={inputStyle}  fullWidth label={liveSession.time ? '':'Time'} name="time" value={liveSession.time} onClick={() => setShow(show === 'time' ? null : 'time')} />
              {show === 'time' && <DigitalClock sx={inputStyle}  onChange={(newValue) => { setLiveSession({...liveSession , time:newValue.format('HH:mm')}); setShow(null); }} />}
            </div> */}
          </LocalizationProvider>
          <input type="submit" />
        </form>
      </div>
      </Box>
      </Modal>
    </>
  );
};

export default CreateLiveCoding;
