import React, { useContext,useEffect,useReducer,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { RoomContext } from '../../components/context/RoomContext'
import { useLiveCodingEventQuery, useUpdateLiveCodingEventMutation } from '../../src/services/liveCodingAPI';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../components/context/userContext';
import VideoPlayer from './VideoPlayer';
export default function LiveCodingSession() {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const {data, isSuccess, isError }=useLiveCodingEventQuery(id)
    const {ws, roomId,stream, peers} = useContext(RoomContext);
    const [ updateLiveCodingEvent] = useUpdateLiveCodingEventMutation()
    const createRoom = () => {
        ws.emit("create-room");
    };
    useEffect(()=>{
        if(data){
            ws.emit('join-room', {roomId:data?.roomId, peerId:user?._id});
        }
    },[data])
    useEffect(() => {
        const updateLiveEvent = async () => {
            // Only proceed if roomId is not null
            if (roomId && data) {
               await updateLiveCodingEvent({...data, roomId: roomId.roomId,active:true});
                
            }
        };
        
        if (roomId && data) { // Ensure roomId is not null before attempting to update
            updateLiveEvent();
        }
        return async () => {
            if (user?._id === data?.user._id) {
                await updateLiveCodingEvent({...data, roomId: null,active:false});
            }
        };
    }, [roomId]); 
   console.log(peers);
  return (
    <Layout>
       {user?._id === data?.user._id && <button onClick={createRoom}>Create Session</button>} 
       <VideoPlayer stream={stream}/>
       {Object.values(peers).map(peer=>{
        <VideoPlayer stream={peer.stream}/>
       })}
    </Layout>
  )
}
