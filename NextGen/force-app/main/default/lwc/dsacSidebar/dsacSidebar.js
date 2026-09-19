import { LightningElement, api } from 'lwc';

export default class DsacSidebar extends LightningElement {
    @api activeTab = 'dashboard';
    @api userPersona = 'dsac'; // 'dsac' or 'entity'

    get isDsac() { return this.userPersona === 'dsac'; }

    get brandName() { return this.isDsac ? 'DSAC' : 'SA Rugby'; }
    get brandSub() { return this.isDsac ? 'Dept. Sport, Arts & Culture' : 'Reporting Portal'; }
    get personaTag() { return this.isDsac ? 'Oversight View' : 'Grantee Portal'; }

    get userName() { return this.isDsac ? 'Thabo M.' : 'Sipho K.'; }
    get userRoleTitle() { return this.isDsac ? 'DSAC Oversight Admin' : 'Compliance Officer'; }

    get dsacBtnClass() { return `toggle-btn ${this.isDsac ? 'active' : ''}`; }
    get entityBtnClass() { return `toggle-btn ${!this.isDsac ? 'active' : ''}`; }

    get menuItems() {
        let items = [];

        if (this.isDsac) {
            // DSAC Oversight Persona Navigation
            items = [
                { id: 'dashboard', label: 'Dashboard', icon: 'utility:table' },
                { id: 'entities', label: 'Entities', icon: 'utility:company' },
                { id: 'reports', label: 'Reports Queue', icon: 'utility:file' },
                { id: 'analytics', label: 'Analytics', icon: 'utility:chart' },
              //  { id: 'notifications', label: 'Notifications', icon: 'utility:notification' }, // Alerts renamed to Notifications
                { id: 'documents', label: 'Document Repo', icon: 'utility:opened_folder' },
                { id: 'settings', label: 'Settings', icon: 'utility:settings' }
            ];
        } else {
            // Entity Persona Navigation
            items = [
                { id: 'dashboard', label: 'Dashboard', icon: 'utility:table' },
                { id: 'submit', label: 'Submit Report', icon: 'utility:upload' },
                { id: 'my-reports', label: 'My Submissions', icon: 'utility:opened_folder' },
                { id: 'notifications', label: 'Notifications', icon: 'utility:notification' },
                { id: 'settings', label: 'Entity Settings', icon: 'utility:settings' }
            ];
        }

        return items.map(item => ({
            ...item,
            className: `nav-item ${this.activeTab === item.id ? 'active' : ''}`
        }));
    }

    handleSelect(event) {
        event.preventDefault();
        const tabId = event.currentTarget.dataset.id;
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: tabId,
            bubbles: true,
            composed: true
        }));
    }

    switchToDsac() {
        this.firePersonaEvent('dsac');
    }

    switchToEntity() {
        this.firePersonaEvent('entity');
    }

    firePersonaEvent(persona) {
        this.dispatchEvent(new CustomEvent('personatoggle', {
            detail: persona,
            bubbles: true,
            composed: true
        }));
    }
}