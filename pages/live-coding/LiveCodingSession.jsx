import React, { useContext,useEffect,useReducer,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useLiveCodingEventQuery, useUpdateLiveCodingEventMutation } from '../../src/services/liveCodingAPI';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../components/context/userContext';
import { CallingState, ParticipantView, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';import Chat from './Chat'
const userId = import.meta.env.VITE_USER_ID_STREAM
const apiKey = import.meta.env.VITE_API_KEY_STREAM
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiU2hhYWtfVGkiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NoYWFrX1RpIiwiaWF0IjoxNzExOTIwODc0LCJleHAiOjE3MTI1MjU2Nzl9.uMQCWPzO5OJRbZT0d_HlA9gpqcX_q_ySm3ypokd7p6Q"
console.log(token);
const callId = import.meta.env.VITE_CALL_ID_STREAM
const user = {
    id:userId,
    name:"shhady",
    image:"fdfs"

}
const client = new StreamVideoClient({apiKey,user,token})
const call =client.call('default', callId);
call.join({create: true})


export default function LiveCodingSession() {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const {data, isSuccess, isError }=useLiveCodingEventQuery(id)
    const [ updateLiveCodingEvent] = useUpdateLiveCodingEventMutation()
   

  
    // useEffect(() => {
    //     const updateLiveEvent = async () => {
    //         // Only proceed if roomId is not null
    //         if (roomId && data) {
    //            await updateLiveCodingEvent({...data, roomId: roomId.roomId,active:true});
                
    //         }
    //     };
        
    //     if (roomId && data) { // Ensure roomId is not null before attempting to update
    //         updateLiveEvent();
    //     }
    //     return async () => {
    //         if (user?._id === data?.user._id) {
    //             await updateLiveCodingEvent({...data, roomId: null,active:false});
    //         }
    //     };
    // }, [roomId]); 

  return (
    <Layout>
       <div>
    <StreamVideo client={client}>
        <StreamCall call={call}>
    <MyUILayout/>
        </StreamCall>
    </StreamVideo>
       </div>
        <div>
            <Chat/>
        </div>
    </Layout>
  )
}

export const MyUILayout = ()=>{
    const call = useCall()

    const {useCallCallingState, useParticipantCount, useLocalParticipant, useRemoteParticipants} = useCallStateHooks();
    const callingState = useCallCallingState()
    const participantsCount = useParticipantCount()
    const localParticipant = useLocalParticipant()
    const remoteParticipants = useRemoteParticipants()
    if(callingState !== CallingState.JOINED){
        return <div>loading ...</div>
    }
    return(
        <div>
            <StreamTheme style={{position:'relative'}}>
            <MyParticipantList participants={remoteParticipants}/>
            <MyFloatingLocalParticipant participants={localParticipant}/>
            </StreamTheme>
        </div>
    )
}

export const MyParticipantList = ({participants})=>{
    console.log(participants);
    return (
        <div style={{
            display: 'flex',
            gap:'8px',
            width: '100%',
        }}>
             {participants?.map((participant)=>{
                <div style={{width:"100%", aspectRatio:"13/2"}}>
                        <ParticipantView 
                        muteAudio
                        participant={participant}
                        key={participant.sessionId}
                        />
                    </div>}
            )} 
        </div>
    )
}

export const MyFloatingLocalParticipant = ({participant}) => {
    return (
        <div style={{
            position:"absolute",
            top:'15px',
            left:'15px',
            width:"240px",
            height:"135px",
            borderRadius:"12px"
        }}>
            {participant && <ParticipantView muteAudio participant={participant}/>}
        </div>
    )
}