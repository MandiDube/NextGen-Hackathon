import { LightningElement, track } from 'lwc';

export default class DsacAnalytics extends LightningElement {
    @track activeSubTab = 'overview';

    get tabList() {
        const tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'compliance', label: 'Compliance' },
            { id: 'performance', label: 'Performance' },
            { id: 'predictive', label: 'Predictive Analytics' }
        ];

        return tabs.map(tab => ({
            ...tab,
            className: `tab-btn ${this.activeSubTab === tab.id ? 'active' : ''}`
        }));
    }

    get isOverviewTab() { return this.activeSubTab === 'overview'; }

    get activeTabLabel() {
        const found = this.tabList.find(t => t.id === this.activeSubTab);
        return found ? found.label : 'Analytics';
    }

    handleTabClick(event) {
        this.activeSubTab = event.currentTarget.dataset.id;
    }

    handleExportClick() {
        // Dispatches export CTA event up to shell container
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: {
                message: 'Executive HOD Summary Report (PDF/XLSX) exported successfully.',
                timestamp: new Date().toISOString()
            },
            bubbles: true,
            composed: true
        }));
    }

    handleNotificationClick() {
        this.dispatchEvent(new CustomEvent('navselect', {
            detail: 'notifications',
            bubbles: true,
            composed: true
        }));
    }
}