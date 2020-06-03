import AlertScreen from './Alert';
import DialerScreen from './Dialer';
import RoomScreen from './Room';

class UIManager {
    static AlertScreen = AlertScreen;
    static DialerScreen = DialerScreen;
    static RoomScreen = RoomScreen;

    static init() {
        UIManager.AlertScreen.init();
        UIManager.DialerScreen.init();
        UIManager.RoomScreen.init();
    }
    static hideAllScreens() {
        UIManager.AlertScreen.hide();
        UIManager.DialerScreen.hide();
        UIManager.RoomScreen.hide();
    }

    static showAlertScreen(...params) {
        UIManager.hideAllScreens();
        UIManager.AlertScreen.show(...params)
    }

    static showDialerScreen() {
        UIManager.hideAllScreens();
        UIManager.DialerScreen.show();
    }

    static showRoomScreen(...params) {
        UIManager.hideAllScreens();
        UIManager.RoomScreen.show(...params);
    }
}

export default UIManager;