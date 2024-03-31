import React,{useEffect, useRef} from 'react'

export default function VideoPlayer({stream}) {
    const videoRef= useRef()
    useEffect(()=>{
        if(videoRef.current)videoRef.current.srcObject=stream
    },[stream])
    console.log(stream);
  return (
    <video ref={videoRef} autoPlay muted={true} style={{width:'100%', height:"50dvh"}}/>
  )
}
