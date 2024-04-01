import React, { useContext,useEffect,useReducer,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useCreateLiveCodingTokenMutation, useLiveCodingEventQuery, useUpdateLiveCodingEventMutation } from '../../src/services/liveCodingAPI';
import { useParams,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/userContext';
import "@stream-io/video-react-sdk/dist/css/styles.css"
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
    const userId = user?._id
    console.log(data);
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
    const call =client.call('default', data._id);
    call.join({create: true})
    setCall(call)

return ()=>{
    call.leave();
    client.disconnectUser();

}
  },[user,data])
 
  useEffect(() => {
    const updateLive = async (isActive) => {
      // Ensure `data` is loaded and the current user matches the event user
      if (data?.user?._id === user?._id && data?.active !== isActive) {
        await updateLiveCodingEvent({ ...data, active: isActive });
      }
    };

    // Set active to true when the component mounts
    updateLive(true);

    // Cleanup function to set active to false when the component unmounts
    return () => {
      updateLive(false);
    };
  // Include all variables used in the effect that might change over time
  }, [ data,user?._id, updateLiveCodingEvent]);

  return (
    <Layout>
       <div>
        {client && call &&  <StreamVideo client={client}>
            <StreamTheme style={{position:'relative'}}>
        <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={()=>{
                navigate('/live-coding')
            }}/>
            <CallParticipantsList/>
        </StreamCall>
        </StreamTheme>
    </StreamVideo>}
   
       </div>
        <div>
            <Chat/>
        </div>
    </Layout>
  )
}

// export const MyUILayout = ()=>{
//     const call = useCall()

//     const {useCallCallingState, useParticipantCount, useLocalParticipant, useRemoteParticipants} = useCallStateHooks();
//     const callingState = useCallCallingState()
//     const participantsCount = useParticipantCount()
//     const localParticipant = useLocalParticipant()
//     const remoteParticipants = useRemoteParticipants()
//     if(callingState !== CallingState.JOINED){
//         return <div>loading ...</div>
//     }
//     return(
//         <div>
//             <StreamTheme style={{position:'relative'}}>
            
//             <MyParticipantList participants={remoteParticipants}/>
//             <MyFloatingLocalParticipant participants={localParticipant}/>
//             </StreamTheme>
//         </div>
//     )
// }

// export const MyParticipantList = ({participants})=>{
//     console.log(participants);
//     return (
//         <div style={{
//             display: 'flex',
//             gap:'8px',
//             width: '100%',
//         }}>
//              {participants?.map((participant)=>{
//                 <div style={{width:"100%", aspectRatio:"13/2"}}>
//                         <ParticipantView 
//                         muteAudio
//                         participant={participant}
//                         key={participant.sessionId}
//                         />
//                     </div>}
//             )} 
//         </div>
//     )
// }

// export const MyFloatingLocalParticipant = ({participant}) => {
//     return (
//         <div style={{
//             position:"absolute",
//             top:'15px',
//             left:'15px',
//             width:"240px",
//             height:"135px",
//             borderRadius:"12px"
//         }}>
//             {participant && <ParticipantView muteAudio participant={participant}/>}
//         </div>
//     )
// }