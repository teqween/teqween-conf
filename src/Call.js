import CallManager from './CallManager';

class Call {
    constructor(peerId, call) {
        this.peerId = peerId;
        
        if (call) {
            this.call = call;
            this.startListeners();
        } else {
            navigator.getUserMedia({ video: true, audio: true }, (webcamStream) => {
                this.webcamStream = webcamStream;
                this.call = CallManager.peer.call(peerId, webcamStream)
                this.startListeners();
            }, () => {});
        }
    }

    startListeners() {
        this.call.on('stream', (stream) => {
            this.contactStream = stream;
            CallManager.onCallStart(this);
        })

        this.call.on('close', () => {
            this.close();

            CallManager.currentCall = null;
            
            this.webcamStream.getTracks().forEach(track => track.stop());

            CallManager.onCallClose();
        })

        this.call.on('error', () => {
            this.close();
            CallManager.onCallClose();
        })
    }

    accept() {
        navigator.getUserMedia({ video: true, audio: true }, (webcamStream) => {
            this.webcamStream = webcamStream;
            this.call.answer(webcamStream);
            CallManager.onCallStart(this);
        }, () => {});
    }

    close() {
        this.call.close();
    }
}

export default Call;