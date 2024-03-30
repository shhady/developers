import React, { createContext, useEffect, useState, useContext,useReducer } from 'react';
import socketIOClient from 'socket.io-client';
import Peer from 'peerjs';
import { AuthContext } from './userContext'; // Adjust the import path
import { peersReducer } from "./peerReducer";
import {
    addPeerStreamAction,
    addPeerNameAction,
    removePeerStreamAction,
    addAllPeersAction,
} from "./peerActions";
const WS = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT;
export const RoomContext = createContext(null);

const ws = socketIOClient(WS);

export const RoomProvider = ({children}) => {
    const { user } = useContext(AuthContext);
    const [roomId, setRoomId] = useState(null);
    const [stream, setStream] = useState();
    const [me, setMe] = useState(null); // State to hold user._id
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [userName, setUserName] = useState(null);
    const [peerInstance, setPeerInstance] = useState(null);
    // Synchronize `me` with `user._id`
    useEffect(() => {
        if (user && user._id) {
            setUserName(user.userName); // Assuming you're using userName
            setMe(user._id); // Continue setting me to user._id if needed elsewhere
            // Create a new Peer instance with user._id
            const peer = new Peer(user._id);
            setPeerInstance(peer);
        }
    }, [user]);
    const enterRoom = ({roomId})=>{
        setRoomId({roomId})
    }
    const getUsers= ({participants})=>{
        console.log(participants)
    }
    const removePeer = (peerId)=>{
        dispatch(removePeerStreamAction(peerId))
    }
    useEffect(()=>{
        try {
            navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
                setStream(stream)
            })
        } catch (error) {
            console.log(error);
        }
        ws.on('room-created', enterRoom)
        ws.on('get-users',getUsers)
        ws.on('user-disconnected',removePeer)
    },[])
    useEffect(() => {
        ws.emit("change-name", { peerId: user?._id, userName, roomId });
    }, [user, roomId]);

    useEffect(() => {
        if (!peerInstance || !stream) return;
        // Listen for when another user joins
        ws.on("user-joined", ({ peerId, userName: name }) => {
            console.log(userName);
            const call = peerInstance.call(peerId, stream, {
                metadata: { userName },
            });
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(peerId, peerStream));
            });
            dispatch(addPeerNameAction(peerId, name));
        });
    
        // Listen for incoming calls
        peerInstance.on("call", (call) => {
            const { userName } = call.metadata;
            dispatch(addPeerNameAction(call.peer, userName));
            call.answer(stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(call.peer, peerStream));
            });
        });
    
        return () => {
            ws.off("user-joined");
            // Consider cleaning up the peerInstance event listeners and destroying the peerInstance on component unmount
        };
    }, [peerInstance, stream, userName, ws, dispatch]);
    useEffect(() => {
        return () => {
            if (peerInstance) {
                peerInstance.destroy();
            }
        };
    }, [peerInstance]);
    console.log(peers);
   return <RoomContext.Provider value={{ws,roomId,stream,peers}}>
        {children}
    </RoomContext.Provider>
}