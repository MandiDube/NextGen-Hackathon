import { LightningElement } from 'lwc';

export default class EntityHome extends LightningElement {
    handleLoginClick() {
        this.dispatchEvent(new CustomEvent('navigatelogin'));
    }

    handleRegisterClick() {
        this.dispatchEvent(new CustomEvent('navigateregister'));
    }
}