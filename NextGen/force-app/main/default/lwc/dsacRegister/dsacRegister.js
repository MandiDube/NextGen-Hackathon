import { LightningElement, track } from 'lwc';

export default class DsacRegister extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track password = '';
    @track confirmPassword = '';

    handleFirstNameChange(event) { this.firstName = event.target.value; }
    handleLastNameChange(event) { this.lastName = event.target.value; }
    handleEmailChange(event) { this.email = event.target.value; }
    handlePasswordChange(event) { this.password = event.target.value; }
    handleConfirmPasswordChange(event) { this.confirmPassword = event.target.value; }

    handleSubmit() {
        if (this.password !== this.confirmPassword) {
            this.dispatchEvent(new CustomEvent('showtoast', {
                detail: { message: 'Passwords do not match', variant: 'error' },
                bubbles: true,
                composed: true
            }));
            return;
        }

        this.dispatchEvent(new CustomEvent('register', {
            detail: {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            },
            bubbles: true,
            composed: true
        }));
    }
}