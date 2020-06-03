class DialerScreen {
    static callDialerScreen = null;
    static myIdLabel = null;
    static contactIdInput = null;
    static callNowButton = null;

    static onValidateFunction = null;

    static init() {
        // Screen
        DialerScreen.callDialerScreen = document.getElementById('call-dialer');

        // Texts
        DialerScreen.myIdLabel = document.getElementById('my-id');

        // Input
        DialerScreen.contactIdInput = document.getElementById('contact-id');

        // Buttons
        DialerScreen.callNowButton = document.getElementById('call-now');

        // Click Listener
        DialerScreen.callNowButton.addEventListener('click', () => {
            const id = DialerScreen.contactIdInput.value;
            DialerScreen.onValidateFunction(id);
        });

    }
    static show() {
        DialerScreen.callDialerScreen.classList.remove('hide');
    }
    static hide() {
        DialerScreen.callDialerScreen.classList.add('hide');
    }
    static setMyId(id) {
        DialerScreen.myIdLabel.innerText = id;
    }
    static setInputText(value) {
        DialerScreen.contactIdInput.value = value;
    }
    static setOnValidateFunction(onValidate) {
        DialerScreen.onValidateFunction = onValidate;
    }
}

export default DialerScreen;