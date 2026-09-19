import { LightningElement, track } from 'lwc';

export default class EntityLogin extends LightningElement {
    @track username = '';
    @track password = '';

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleNavigateHome() {
        this.dispatchEvent(new CustomEvent('navigatehome'));
    }

    handleNavigateSignUp() {
        this.dispatchEvent(new CustomEvent('navigateregister'));
    }

    handleSignIn() {
        if (!this.username) return;
        this.dispatchEvent(new CustomEvent('loginsuccess', {
            detail: {
                username: this.username,
                entityName: 'Registered Entity'
            }
        }));
    }
}