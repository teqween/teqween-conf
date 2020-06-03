import Peer from 'peerjs';
import css from './public/css/styles.css';

import UIManager from './src/ui/UIManager';

window.onload = function() {
    UIManager.init();

    UIManager.showDialerScreen();
    UIManager.DialerScreen.setMyId('001-002');

    UIManager.DialerScreen.setOnValidateFunction(() => {
        this.navigator.getUserMedia({ video: true }, (stream) => {
            UIManager.showRoomScreen(stream, stream, () => {
                UIManager.showDialerScreen();
            });
        });
    });
}