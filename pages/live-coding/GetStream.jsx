import {CallingState, StreamVideoClient, useCall, useCallStateHooks} from "@stream-io/video-react-sdk"

const userId = import.meta.env.VITE_USER_ID_STREAM
const apiKey = import.meta.env.VITE_API_KEY_STREAM
const token = import.meta.env.VITE_TOKEN_STREAM
const callId = import.meta.env.VITE_CALL_ID_STREAM
const streamUser = {
    id:userId,
    name:user.userName,
    image:user.avatar

}
const client = new StreamVideoClient({apiKey,streamUser,token})
const call =client.call('default', callId);
call.join({create: true})

export const myUILayout = ()=>{
    const call = useCall()

    const {useCallCallingState, useParticipantCount} = useCallStateHooks();
    const callingState = useCallCallingState()
    const participantsCount = useParticipantCount()

    if(callingState !== CallingState.JOINED){
        return <div>loading ...</div>
    }
    return(
        <div>
            Call"{call?.id}" has {participantsCount} participants
        </div>
    )
}