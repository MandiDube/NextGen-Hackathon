import { LightningElement, track } from 'lwc';

export default class EntityDashboard extends LightningElement {
    @track activities = [
        {
            id: '1',
            title: 'Q1 2026 Financial Acquittal Report',
            reference: 'ACQ-2026-0081',
            date: '10 Apr 2026',
            status: 'Approved',
            badgeClass: 'badge badge-success',
            icon: 'utility:check'
        },
        {
            id: '2',
            title: 'SARS Tax Clearance Pin Upload',
            reference: 'DOC-2026-044',
            date: '10 Feb 2026',
            status: 'Verified',
            badgeClass: 'badge badge-success',
            icon: 'utility:file'
        },
        {
            id: '3',
            title: 'Youth Development Grant Submission',
            reference: 'ACQ-2026-0124',
            date: '15 Jul 2026',
            status: 'Under Review',
            badgeClass: 'badge badge-info',
            icon: 'utility:clock'
        }
    ];

    @track checklistItems = [
        {
            id: '1',
            label: 'Submit Q3 Grant Acquittal Report',
            dueDate: '15 Oct 2026',
            icon: 'utility:warning',
            iconClass: 'icon-warning'
        },
        {
            id: '2',
            label: 'Upload FY2026 Audited Financial Statements',
            dueDate: '31 Oct 2026',
            icon: 'utility:event',
            iconClass: 'icon-neutral'
        },
        {
            id: '3',
            label: 'Update CIPC Board Directorship List',
            dueDate: '15 Dec 2026',
            icon: 'utility:event',
            iconClass: 'icon-neutral'
        }
    ];

    handleNavReports() {
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: 'reports',
            bubbles: true,
            composed: true
        }));
    }

    handleNavDocuments() {
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: 'documents',
            bubbles: true,
            composed: true
        }));
    }

    handleNavProfile() {
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: 'profile',
            bubbles: true,
            composed: true
        }));
    }
}