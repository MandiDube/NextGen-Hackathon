import { LightningElement, track } from 'lwc';

export default class EntityReports extends LightningElement {
    @track isModalOpen = false;

    @track reports = [
        {
            id: '1',
            refNo: 'ACQ-2026-0081',
            title: 'Q1 Financial & Operational Acquittal',
            category: 'Operational Grant',
            period: 'Q1 2026 (Jan - Mar)',
            amount: 'R 450,000.00',
            submittedDate: '2026-04-10',
            status: 'Approved',
            statusBadgeClass: 'badge badge-success'
        },
        {
            id: '2',
            refNo: 'ACQ-2026-0124',
            title: 'Youth Development Tournament Acquittal',
            category: 'Sports Development Fund',
            period: 'Q2 2026 (Apr - Jun)',
            amount: 'R 200,000.00',
            submittedDate: '2026-07-15',
            status: 'Under Review',
            statusBadgeClass: 'badge badge-info'
        },
        {
            id: '3',
            refNo: 'ACQ-2026-0189',
            title: 'Annual Heritage Month Project Report',
            category: 'Cultural Event Grant',
            period: 'Q3 2026 (Jul - Sep)',
            amount: 'R 180,000.00',
            submittedDate: 'Pending',
            status: 'Draft',
            statusBadgeClass: 'badge badge-warning'
        }
    ];

    @track newReport = {
        title: '',
        category: 'Operational Grant',
        period: '',
        amount: '',
        expendedAmount: '',
        notes: ''
    };

    get totalCount() {
        return this.reports.length;
    }

    get draftCount() {
        return this.reports.filter(r => r.status === 'Draft' || r.status === 'Action Required').length;
    }

    get reviewCount() {
        return this.reports.filter(r => r.status === 'Under Review').length;
    }

    get approvedCount() {
        return this.reports.filter(r => r.status === 'Approved').length;
    }

    handleOpenModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field) {
            this.newReport[field] = event.target.value;
        }
    }

    handleSubmitNewReport() {
        if (!this.newReport.title) return;

        const nextId = String(this.reports.length + 1);
        const refCode = `ACQ-2026-0${Math.floor(200 + Math.random() * 800)}`;
        const today = new Date().toISOString().split('T')[0];

        const createdItem = {
            id: nextId,
            refNo: refCode,
            title: this.newReport.title,
            category: this.newReport.category,
            period: this.newReport.period || 'Q3 2026',
            amount: this.newReport.amount ? `R ${this.newReport.amount}` : 'R 0.00',
            submittedDate: today,
            status: 'Under Review',
            statusBadgeClass: 'badge badge-info'
        };

        this.reports = [createdItem, ...this.reports];
        this.isModalOpen = false;

        // Reset Form
        this.newReport = {
            title: '',
            category: 'Operational Grant',
            period: '',
            amount: '',
            expendedAmount: '',
            notes: ''
        };
    }

    handleViewReport(event) {
        const selectedId = event.target.dataset.id;
        const record = this.reports.find(r => r.id === selectedId);
        
        this.dispatchEvent(new CustomEvent('inspectrecord', {
            detail: { recordId: record ? record.refNo : selectedId },
            bubbles: true,
            composed: true
        }));
    }
}