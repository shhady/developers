import { useCallback } from 'react';
import io from 'socket.io-client';
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT

const socket = io(backendURL);

const useScreenSharing = (setStream, setLocalStream) => {
    const peerConnection = new RTCPeerConnection();

    const shareScreen = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setLocalStream(stream); // Display the local stream for the sharer
            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

            // Create an offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

            // Send the offer to the server
            socket.emit('offer', offer);

            console.log('Screen sharing started');
        } catch (error) {
            console.error('Error sharing screen:', error);
        }
    }, [setLocalStream, peerConnection]);

    // Listen for the answer
    socket.on('answer', async (answer) => {
        const remoteDesc = new RTCSessionDescription(answer);
        await peerConnection.setRemoteDescription(remoteDesc);
    });

    return { shareScreen };
};

export default useScreenSharing;
