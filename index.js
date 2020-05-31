import Peer from 'peerjs';
import css from './public/css/styles.css';

window.onload = function() {
    // DOM Elements
    const webcam = document.getElementById('webcam');
    const myid = document.getElementById('myid');
    const callnow = document.getElementById('callnow');

    // Creating Peer
    const peer = new Peer({
        host: 'teqween-webrtc.herokuapp.com',
        secure: true,
        config: {
            iceServers: [
                { url: 'stun:turn.teqween.com' },
                { url: 'turn:turn.teqween.com', username: 'teqween', credential: 'teqween'}
            ]
        }
    })

    // Getting My ID
    peer.on('open', function(id) {
        myid.innerText =  `MY ID: ${id}`;
    })

    // Initiate a call
    callnow.addEventListener('click', function() {
        const friendsId = prompt('Your Friend ID');
        
        navigator.getUserMedia({ video: true, audio: true }, function(stream) {
            const call = peer.call(friendsId, stream);

            call.on('stream', function(stream) {
                webcam.srcObject = stream;
                webcam.play();
            })
        }, function() {})
        
    })

    // Receive a call
    peer.on('call', function(call) {
        navigator.getUserMedia({ video: true, audio: true }, function(stream) {
            call.answer(stream);

            call.on('stream', function(stream) {
                webcam.srcObject = stream;
                webcam.play();
            })
        }, function() {})
    })

}