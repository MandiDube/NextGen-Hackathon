import { LightningElement, track } from 'lwc';

export default class EntityRegister extends LightningElement {
    @track entityName = '';
    @track registrationNo = '';
    @track sector = 'sport';
    @track repName = '';
    @track email = '';
    @track password = '';
    @track confirmPassword = '';

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field) {
            this[field] = event.target.value;
        }
    }

    handleGoHome() {
        this.dispatchEvent(new CustomEvent('navigatehome'));
    }

    handleGoLogin() {
        this.dispatchEvent(new CustomEvent('navigatelogin'));
    }

    handleSubmitRegister() {
        if (!this.entityName || !this.email || !this.password) {
            return;
        }
        this.dispatchEvent(new CustomEvent('registersuccess', {
            detail: {
                entityName: this.entityName,
                email: this.email
            }
        }));
    }
}