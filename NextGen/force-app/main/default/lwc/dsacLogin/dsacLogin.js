import { LightningElement, track } from 'lwc';

export default class DsacLogin extends LightningElement {
    @track username = '';
    @track password = '';

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleNavigateSignUp() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'register' },
            bubbles: true,
            composed: true
        }));
    }

    handleSignIn() {
        this.dispatchEvent(new CustomEvent('login', {
            detail: { username: this.username, password: this.password },
            bubbles: true,
            composed: true
        }));
    }
}