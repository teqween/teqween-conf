import Peer from 'peerjs';
import Call from './Call';

class CallManager {
    static peer = null;
    
    static onPeerOpen = null;
    static onCallReceive = null;
    static onCallStart = null;
    static onCallClose = null;

    static currentCall = null;

    static init() {
        CallManager.peer = new Peer({
            host: 'teqween-webrtc.herokuapp.com',
            secure: true,
            config: {
                iceServers: [
                    { url: 'stun:turn.teqween.com' },
                    { url: 'turn:turn.teqween.com', username: 'teqween', credential: 'teqween' }
                ]
            }
        });

        CallManager.peer.on('open', (id) => CallManager.onPeerOpen(id));
        
        CallManager.peer.on('call', (call) => {
            CallManager.currentCall = new Call(call.peer, call);
            CallManager.onCallReceive(CallManager.currentCall);
        });
    }
    static startCall(peerId) {
        CallManager.currentCall = new Call(peerId);
    }
    static setOnPeerOpen(onPeerOpen) {
        CallManager.onPeerOpen = onPeerOpen;
    }
    static setOnCallReceive(onCallReceive) {
        CallManager.onCallReceive = onCallReceive;
    }
    static setOnCallStart(onCallStart) {
        CallManager.onCallStart = onCallStart;
    }
    static setOnCallClose(onCallClose) {
        CallManager.onCallClose = onCallClose;
    }
}

export default CallManager;