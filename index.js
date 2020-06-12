import css from './public/css/styles.css';

import UIManager from './src/ui/UIManager';
import CallManager from './src/CallManager';

window.onload = function() {
    UIManager.init();
    CallManager.init();

    UIManager.showDialerScreen();
    UIManager.DialerScreen.setOnValidateFunction((id) => {
        CallManager.startCall(id);
    });

    CallManager.setOnPeerOpen((id) => {
        UIManager.DialerScreen.setMyId(id);
    });

    CallManager.setOnCallReceive((call) => {
        UIManager.showAlertScreen(call.peerId, () => {
            call.accept();
        }, () => {
            call.close();
        });
    });

    CallManager.setOnCallStart((call) => {
        UIManager.showRoomScreen(call.contactStream, call.webcamStream, () => {
            call.close();
        })
    });

    CallManager.setOnCallClose(() => {
        UIManager.showDialerScreen();
    });

    window.CallManager = CallManager;
}