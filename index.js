import Peer from 'peerjs';
import css from './public/css/styles.css';

import RoomScreen from './src/ui/Room';

window.onload = function() {
    RoomScreen.init()
    this.navigator.getUserMedia({ video: true, audio: true}, (stream) => {
        RoomScreen.show(stream, stream, () => this.alert('exit call'))
    }, () => {

    });
}