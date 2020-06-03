import audio from '../../public/audio/whatsapp_ring.mp3';

class AlertScreen {
    static callAlertScreen = null;
    static acceptCallButton = null;
    static acceptRejectButton = null;
    static contactNameLabel = null;

    static onAcceptFunction = null;
    static onRejectFunction = null;

    static song = new Audio(audio);

    static init() {
        // Screen
        AlertScreen.callAlertScreen = document.getElementById('call-alert');

        // Buttons
        AlertScreen.acceptCallButton = document.getElementById('accept-call');
        AlertScreen.rejectCallButton = document.getElementById('reject-call');

        // Texts
        AlertScreen.contactNameLabel = document.getElementById('contact-name');

        // Click Listeners
        AlertScreen.acceptCallButton.addEventListener('click', (...params) => AlertScreen.onAcceptFunction(...params))
        AlertScreen.rejectCallButton.addEventListener('click', (...params) => AlertScreen.onRejectFunction(...params))
    }
    static show(name, onAccept, onReject) {
        AlertScreen.callAlertScreen.classList.remove('hide');
        AlertScreen.setContactName(name);
        AlertScreen.onAcceptFunction = onAccept;
        AlertScreen.onRejectFunction = onReject;

        AlertScreen.song.loop = true;
        AlertScreen.song.play();
    }
    static hide() {
        AlertScreen.callAlertScreen.classList.add('hide');
        AlertScreen.song.pause();
    }
    static setContactName(name) {
        AlertScreen.contactNameLabel.innerText = name;
    }
}

export default AlertScreen;