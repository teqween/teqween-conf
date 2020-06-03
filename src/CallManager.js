import Peer from 'peerjs';

class CallManager {
    static peer = null;
    
    static onPeerOpen = null;
    static onCallStart = null;
    static onCallReceive = null;
    static onCallClose = null;

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
            CallManager.onCallReceive(call);

            call.on('stream', (stream) => {
                CallManager.onCallStart(call, stream);
            })

            call.on('close', () => {
                CallManager.onCallClose();
            })

            call.on('error', () => {
                CallManager.onCallClose();
            })
        })
    }
    static startCall(id) {
        navigator.getUserMedia({ video: true, audio: true }, (stream) => {
            const call = CallManager.peer.call(id, stream);

            call.on('stream', (stream) => {
                CallManager.onCallStart(call, stream);
            })

            call.on('close', () => {
                CallManager.onCallClose();
            })

            call.on('error', () => {
                CallManager.onCallClose();
            })
        }, () => {})
    }
    static setOnPeerOpen(onPeerOpen) {
        CallManager.onPeerOpen = onPeerOpen;
    }
    static setOnCallStart(onCallStart) {
        CallManager.onCallStart = onCallStart;
    }
    static setOnCallReceive(onCallReceive) {
        CallManager.onCallReceive = onCallReceive;
    }
    static setOnCallClose(onCallClose) {
        CallManager.onCallClose = onCallClose;
    }
}

export default CallManager;