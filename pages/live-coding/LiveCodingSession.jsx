import React, { useContext,useEffect,useReducer,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useCreateLiveCodingTokenMutation, useLiveCodingEventQuery, useUpdateLiveCodingEventMutation } from '../../src/services/liveCodingAPI';
import { useParams,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/userContext';
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "./LiveSessionCoding.css"
import { CallControls, CallParticipantsList, CallingState, ParticipantView, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';import Chat from './Chat'
const apiKey = import.meta.env.VITE_API_KEY_STREAM


export default function LiveCodingSession() {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const {data, isSuccess, isError }=useLiveCodingEventQuery(id)
    const [ updateLiveCodingEvent] = useUpdateLiveCodingEventMutation()
   const [call,setCall] =useState()
   const [client,setClient] =useState();
   const [createLiveCodingToken]=useCreateLiveCodingTokenMutation();
   const navigate=useNavigate()
    // const token = user?.token;
    // const token = import.meta.env.VITE_TOKEN_STREAM
    const userId = user?._id;
  
        // console.log(CallParticipantsList);
  useEffect(()=>{
    if(!user) return;
    if(!data) return;
    const client = new StreamVideoClient({apiKey,user:{
        id:userId,
        name:user.userName,
        image:user.avatar

    },tokenProvider: async () => {
        try {
            const res = await createLiveCodingToken(userId);
            console.log(res.data.token); // Log the token for debugging
            return res.data.token; // Return the token so it can be used by the caller
        } catch (error) {
            console.error("Failed to fetch token:", error);
            // Handle the error appropriately
            return null; // Return null or throw an error based on your error handling strategy
        }
    }
    
    })
    setClient(client)
    const call =client.call('default',id);
    call.join({create: true})
    setCall(call)

return ()=>{
    // call.leave();
    client.disconnectUser();

}
  },[user,data])

  const updateLive = async (isActive) => {
    if (data?.user?._id === user?._id && data?.active !== isActive) {
      try {
        await updateLiveCodingEvent({ ...data, active: isActive });
      } catch (error) {
        console.error("Failed to update live coding event:", error);
      }
    }
  };
  useEffect(() => {
      updateLive(true); // Set active to true when component mounts

      return () => {
        updateLive(false); // Cleanup to set active to false when component unmounts
      };
    }, [data, user?._id, updateLiveCodingEvent]);
  return (
    <Layout>
        <div className='liveSessionStart'>
       <div style={{width:"66%"}}>
        {client && call &&  <StreamVideo client={client}>
            <StreamTheme style={{position:'relative'}}>
        <StreamCall call={call}>
           <SpeakerLayout />
             <CallControls onLeave={async () => {
                    await updateLive(false); // Update live status before navigating away
                    navigate('/live-coding');
                  }}/>
                <CallParticipantsList/>
        </StreamCall>
        </StreamTheme>
    </StreamVideo>}
   
       </div>
        <div>
            <Chat/>
        </div>
        </div>
    </Layout>
  )
}

