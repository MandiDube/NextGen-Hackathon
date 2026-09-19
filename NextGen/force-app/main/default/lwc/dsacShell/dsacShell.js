import { LightningElement, track } from 'lwc';

export default class DsacShell extends LightningElement {
    @track currentNav = 'dashboard';

    get isDashboard() {
        return this.currentNav === 'dashboard';
    }

    get isEntities() {
        return this.currentNav === 'entities';
    }

    get isReports() {
        return this.currentNav === 'reports';
    }

    get isAnalytics() {
        return this.currentNav === 'analytics';
    }

    /* Dynamic Sidebar Active State Classes */
    get dashboardClass() {
        return `nav-item ${this.isDashboard ? 'active' : ''}`;
    }

    get entitiesClass() {
        return `nav-item ${this.isEntities ? 'active' : ''}`;
    }

    get reportsClass() {
        return `nav-item ${this.isReports ? 'active' : ''}`;
    }

    get analyticsClass() {
        return `nav-item ${this.isAnalytics ? 'active' : ''}`;
    }

    /* Navigation Event Handlers */
    showDashboard() {
        this.currentNav = 'dashboard';
    }

    showEntities() {
        this.currentNav = 'entities';
    }

    showReports() {
        this.currentNav = 'reports';
    }

    showAnalytics() {
        this.currentNav = 'analytics';
    }

    /* Cross-component action handling */
    handleNavigateToSubmitReport() {
        this.currentNav = 'reports';
        setTimeout(() => {
            const reportsComp = this.refs.reportsComp;
            if (reportsComp) {
                reportsComp.openSubmitModal();
            }
        }, 50);
    }
}