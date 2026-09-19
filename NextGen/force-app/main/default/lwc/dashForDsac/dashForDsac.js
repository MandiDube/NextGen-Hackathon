import { LightningElement, track } from 'lwc';

export default class DashForDsac extends LightningElement {
    @track currentView = 'dashboard';
    @track selectedRecordId = null;

    get isDashboard() { return this.currentView === 'dashboard'; }
    get isEntities() { return this.currentView === 'entities'; }
    get isReports() { return this.currentView === 'reports'; }
    get isReportDetail() { return this.currentView === 'reportDetail'; }
    get isAnalytics() { return this.currentView === 'analytics'; }
    get isDocuments() { return this.currentView === 'documents'; }
    get isSettings() { return this.currentView === 'settings'; }

    handleViewChange(event) {
        this.currentView = event.detail;
    }

    handleInspectRecord(event) {
        this.selectedRecordId = event.detail.recordId;
        this.currentView = 'reportDetail';
    }

    handleBackToReports() {
        this.currentView = 'reports';
    }
}