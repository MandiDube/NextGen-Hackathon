import { LightningElement } from 'lwc';

export default class DsacAlerts extends LightningElement {
    alerts = [
        { id: '1', title: 'Q3 Expenditure Report Overdue', description: 'The third quarter financial expenditure report is overdue by 5 days.', entity: 'Boxing SA', date: '15 Dec 2024', icon: 'utility:warning', cardClass: 'alert-card border-red', iconClass: 'red-icon' },
        { id: '2', title: 'Annual Audit Submission Failed', description: 'Audit trail report submission returned structural validation errors.', entity: 'Robben Island Museum', date: '14 Dec 2024', icon: 'utility:warning', cardClass: 'alert-card border-red', iconClass: 'red-icon' },
        { id: '3', title: 'Governance Compliance Overdue', description: 'Mandatory Board representation updates have passed the standard grace period.', entity: 'SA National Gallery', date: '12 Dec 2024', icon: 'utility:warning', cardClass: 'alert-card border-red', iconClass: 'red-icon' },
        { id: '4', title: 'Q4 Treasury Alignment Proposal Due Soon', description: 'Submission deadline is approaching in 2 days. Prepare final data sets.', entity: 'State Theatre', date: '18 Dec 2024', icon: 'utility:clock', cardClass: 'alert-card border-amber', iconClass: 'amber-icon' },
        { id: '5', title: 'DSAC System Maintenance Scheduled', description: 'Platform features will be temporarily offline on Sunday, Dec 22, from 02:00 to 05:00 SAST.', entity: 'All Entities', date: 'System Info', icon: 'utility:info', cardClass: 'alert-card border-blue', iconClass: 'blue-icon' }
    ];

    handleViewDetails(event) {
        const alertId = event.target.dataset.id;
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { view: 'reportDetails', recordId: alertId },
            bubbles: true,
            composed: true
        }));
    }
}