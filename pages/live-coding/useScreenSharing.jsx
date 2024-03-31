import { useCallback, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../components/context/userContext'; // Adjust the path as necessary

const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT;
const socket = io(backendURL);

const useScreenSharing = (setStream, setLocalStream) => {
  const { user } = useContext(AuthContext);
  const peerConnection = new RTCPeerConnection();

  const shareScreen = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setLocalStream(stream);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

      socket.emit('startScreenShare', { userId: user?.userId, offer });
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }, [setLocalStream, peerConnection, user?.userId]);

  // Adjusted to handle receiving a screen sharing stream
  socket.on('offer', async (data) => {
    if (data.userId !== user?.userId) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

      socket.emit('answer', { answer, to: data.userId });
    }
  });

  socket.on('answer', async (answer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  });

  return { shareScreen };
};

export default useScreenSharing;
