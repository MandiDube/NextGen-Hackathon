import { LightningElement, track, api } from 'lwc';

export default class DsacReports extends LightningElement {
    @track currentView = 'list'; // 'list' | 'details'
    @track selectedReport = {};
    @track isSubmitModalOpen = false;
    @track newReportData = {};

    get isListView() {
        return this.currentView === 'list';
    }

    get isDetailsView() {
        return this.currentView === 'details';
    }

    showListView() {
        this.currentView = 'list';
    }

    @api
    openSubmitModal() {
        this.handleOpenSubmitModal();
    }

    handleViewReport(event) {
        const reportId = event.target.dataset.id;
        const found = this.reportsList.find(r => r.id === reportId);
        const activeReport = found || this.reportsList[0];

        this.selectedReport = {
            ...activeReport,
            type: activeReport.type || 'Quarterly Performance Report',
            periodFull: activeReport.periodFull || 'Q2 2025 (Jul - Sep)',
            submissionDateFull: activeReport.submissionDateFull || '15 Oct 2025, 14:32',
            submittedBy: activeReport.submittedBy || 'Thabo Mokoena (thabo@sasportcommission.org.za)',
            documents: activeReport.documents || [
                { name: 'SASC_Q2_Performance_Summary_2025.pdf', size: '4.2 MB' },
                { name: 'Annexure_A_Target_Metrics.xlsx', size: '1.8 MB' }
            ]
        };
        this.currentView = 'details';
    }

    handleOpenSubmitModal() {
        this.newReportData = { title: '', entity: '', period: '', date: '' };
        this.isSubmitModalOpen = true;
    }

    handleCloseSubmitModal() {
        this.isSubmitModalOpen = false;
    }

    handleReportInputChange(event) {
        const field = event.target.name;
        this.newReportData[field] = event.target.value;
    }

    handleSaveNewReport() {
        const newRpt = {
            id: 'r' + (this.reportsList.length + 1),
            title: this.newReportData.title || 'Untitled Report',
            entity: this.newReportData.entity || 'SA Sports Commission',
            period: this.newReportData.period || 'Q3 2024',
            date: this.newReportData.date || 'Today',
            status: 'Pending',
            statusClass: 'status-badge pending'
        };
        this.reportsList = [newRpt, ...this.reportsList];
        this.isSubmitModalOpen = false;
    }

    @track reportsList = [
        { 
            id: 'r1', 
            title: 'Q2 2025 Performance Report', 
            entity: 'SA Sports Commission', 
            type: 'Quarterly Performance Report',
            period: 'Q2 2025', 
            periodFull: 'Q2 2025 (Jul - Sep)',
            date: '15 Oct 2025', 
            submissionDateFull: '15 Oct 2025, 14:32',
            submittedBy: 'Thabo Mokoena (thabo@sasportcommission.org.za)',
            status: 'Under Review', 
            statusClass: 'status-badge review',
            documents: [
                { name: 'SASC_Q2_Performance_Summary_2025.pdf', size: '4.2 MB' },
                { name: 'Annexure_A_Target_Metrics.xlsx', size: '1.8 MB' }
            ]
        },
        { id: 'r2', title: 'Q3 Financial Performance Statement', entity: 'SA National Gallery', period: 'Q3 2024', date: '12 Dec 2024', status: 'Approved', statusClass: 'status-badge approved' },
        { id: 'r3', title: 'Annual Development & Transformation Program', entity: 'SA Rugby Union', period: 'Annual 2024', date: '10 Dec 2024', status: 'Approved', statusClass: 'status-badge approved' },
        { id: 'r4', title: 'Operational Audit Report - Heritage Sites', entity: 'Robben Island Museum', period: 'Bi-Annual', date: '08 Dec 2024', status: 'Under Review', statusClass: 'status-badge review' },
        { id: 'r5', title: 'Arts Access Initiative Progress Report', entity: 'Playhouse Company', period: 'Q3 2024', date: '05 Dec 2024', status: 'Pending', statusClass: 'status-badge pending' },
        { id: 'r6', title: 'Governance Compliance Submission', entity: 'Boxing SA', period: 'Q2 2024', date: '30 Nov 2024', status: 'Overdue', statusClass: 'status-badge overdue' },
        { id: 'r7', title: 'Infrastructure Expansion Audit', entity: 'National Arts Council', period: 'Annual 2024', date: '10 Nov 2024', status: 'Under Review', statusClass: 'status-badge review' },
        { id: 'r8', title: 'B-BBEE Evaluation Report', entity: 'SA Rugby Union', period: 'Annual 2024', date: '01 Nov 2024', status: 'Approved', statusClass: 'status-badge approved' }
    ];
}