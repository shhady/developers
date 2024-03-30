import { ADD_PEER_STREAM,ADD_PEER_NAME, REMOVE_PEER_STREAM,ADD_ALL_PEERS } from "./peerActions";


export const peersReducer = (state, action) => {
    switch (action.type) {
        case ADD_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: action.payload.stream,
                },
            };
        case ADD_PEER_NAME:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    userName: action.payload.userName,
                },
            };
        case REMOVE_PEER_STREAM:
            // Note: In JavaScript, setting to undefined is not the same as deleting the property.
            // If you want to remove the "stream" property entirely, consider using the delete operator.
            // However, this might have implications on your application logic.
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: undefined,
                },
            };
        case ADD_ALL_PEERS:
            return { ...state, ...action.payload.peers };
        default:
            return { ...state };
    }
};