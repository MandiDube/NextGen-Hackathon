import { LightningElement, track, api } from 'lwc';

export default class DsacSettingsForm extends LightningElement {
    @api userPersona = 'dsac'; // 'dsac' or 'entity'
    @track activeSubTab = 'profile';

    @track fullName = 'Thabo Mokoena';
    @track email = 'thabo.mokoena@dsac.gov.za';
    @track phone = '+27 82 123 4567';
    @track userRole = 'DSAC Administrator';

    get userInitials() {
        return this.fullName ? this.fullName.split(' ').map(n => n[0]).join('') : 'TM';
    }

    get isProfileTab() { return this.activeSubTab === 'profile'; }

    get activeTabLabel() {
        const found = this.navList.find(n => n.id === this.activeSubTab);
        return found ? found.label : 'Settings';
    }

    get navList() {
        const items = [
            { id: 'profile', label: 'Profile Settings' },
            { id: 'notifications', label: 'Notification Preferences' },
            { id: 'periods', label: 'Reporting Periods' },
            { id: 'users', label: 'User Management' },
            { id: 'system', label: 'System Configuration' },
            { id: 'audit', label: 'Audit Log' }
        ];

        return items.map(item => ({
            ...item,
            className: `sub-nav-item ${this.activeSubTab === item.id ? 'active' : ''}`
        }));
    }

    departmentOptions = [
        { label: 'National Head Office', value: 'National Head Office' },
        { label: 'Regional Office', value: 'Regional Office' }
    ];

    roleOptions = [
        { label: 'DSAC Administrator', value: 'DSAC Administrator' },
        { label: 'Standard User', value: 'Standard User' }
    ];

    accessOptions = [
        { label: 'Level 4 - Full Admin Control', value: 'Level 4 - Full Admin Control' },
        { label: 'Level 3 - Reporting Admin', value: 'Level 3 - Reporting Admin' }
    ];

    handleSubNavClick(event) {
        this.activeSubTab = event.currentTarget.dataset.id;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleDepartmentChange(event) {
        this.notifyToast(`Department updated to ${event.target.value}`);
    }

    handleRoleChange(event) {
        this.userRole = event.target.value;
    }

    handleAccessChange(event) {
        this.notifyToast(`Access level modified to ${event.target.value}`);
    }

    handleSaveChanges() {
        this.notifyToast('User profile settings saved successfully.');
    }

    handleNotificationClick() {
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: 'notifications',
            bubbles: true,
            composed: true
        }));
    }

    notifyToast(message) {
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message },
            bubbles: true,
            composed: true
        }));
    }
}