import Peer from 'peerjs';
import css from './public/css/styles.css';

import AlertScreen from './src/ui/Alert';

window.onload = function() {
    AlertScreen.init()
    AlertScreen.show('Contact Name', () => this.alert('call accepted'), () => this.alert('call reject'))
}