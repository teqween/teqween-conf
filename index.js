import Peer from 'peerjs';
import css from './public/css/styles.css';

import DialerScreen from './src/ui/Dialer';

window.onload = function() {
    DialerScreen.init()
    DialerScreen.show()
    DialerScreen.setMyId('0001-0002')
    DialerScreen.setOnValidateFunction(id => alert(id))
}