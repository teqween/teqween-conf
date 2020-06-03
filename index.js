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
        UIManager.showAlertScreen(call.peer, () => {
            navigator.getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream);
            }, () => {})
        }, () => {
            UIManager.showDialerScreen();
        });
    });

    CallManager.setOnCallStart((call, stream) => {
        navigator.getUserMedia({ video: true, audio: true}, (myStream) => {
            UIManager.showRoomScreen(stream, myStream, () => {
                call.close();
                UIManager.showDialerScreen();
            })
        }, () => {});
    });

    CallManager.setOnCallClose(() => {
        UIManager.showDialerScreen();
    })
}