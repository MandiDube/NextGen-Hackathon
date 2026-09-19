import { LightningElement } from 'lwc';

export default class DsacHome extends LightningElement {
    handleOfficialClick() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'login', portal: 'official' },
            bubbles: true,
            composed: true
        }));
    }

    handleSubsidiaryClick() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'login', portal: 'subsidiary' },
            bubbles: true,
            composed: true
        }));
    }
}