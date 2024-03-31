import React, { useState } from 'react';
import useScreenSharing from './useScreenSharing'; // Adjust path as necessary
import VideoStream from './VideoStream'; // Make sure this component is implemented as previously described
import Layout from '../../components/Layout/Layout';

const ScreenSharingComponent = () => {
    const [stream, setStream] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const { shareScreen } = useScreenSharing(setStream, setLocalStream);

    return (
        <Layout>
            <button onClick={() => shareScreen()}>Share Your Screen</button>
            <div>
                {localStream && (
                    <div>
                        <h2>My Screen</h2>
                        <VideoStream stream={localStream} />
                    </div>
                )}
            </div>
            <div>
                <Chat />
            </div>
        </Layout>
    );
};

export default ScreenSharingComponent;
