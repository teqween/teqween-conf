class RoomScreen {
    static callRoomScreen = null;
    static closeButton = null;

    static contactVideo = null;
    static myVideo = null;
    
    static onCloseFunction = null;

    static init() {
        // Screen
        RoomScreen.callRoomScreen = document.getElementById('call-room');

        // Buttons
        RoomScreen.closeButton = document.getElementById('close-call');

        // Videos
        RoomScreen.contactVideo= document.getElementById('contact-video');
        RoomScreen.myVideo= document.getElementById('my-video');

        // Click Listener
        RoomScreen.closeButton.addEventListener('click', () => RoomScreen.onCloseFunction());

    }
    static show(contactStream, myStream, onClose) {
        RoomScreen.callRoomScreen.classList.remove('hide');

        RoomScreen.setContactStream(contactStream);
        RoomScreen.setMyStream(myStream);

        RoomScreen.onCloseFunction = onClose;
    }
    static hide() {
        RoomScreen.callRoomScreen.classList.add('hide');
    }
    static setContactStream(stream) {
        RoomScreen.contactVideo.srcObject = stream;
        RoomScreen.contactVideo.play();
    }
    static setMyStream(stream) {
        RoomScreen.myVideo.srcObject = stream;
        RoomScreen.myVideo.play();
    }
}

export default RoomScreen;