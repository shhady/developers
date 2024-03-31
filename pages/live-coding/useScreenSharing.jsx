import { useCallback, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './context/AuthContext'; // Adjust according to your project structure

const backendURL = process.env.REACT_APP_BACKEND_URL; // Adjust if you use a different env variable name
const socket = io(backendURL);

const useScreenSharing = (setLocalStream) => {
    const { user } = useContext(AuthContext);

    const peerConnection = new RTCPeerConnection();

    const shareScreen = useCallback(async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setLocalStream(stream);
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('startScreenShare', { offer, userId: user.id });
    }, [setLocalStream, user.id]);

    // Handle receiving a stream
    peerConnection.ontrack = event => {
        setLocalStream(event.streams[0]);
    };

    return { shareScreen };
};

export default useScreenSharing;
