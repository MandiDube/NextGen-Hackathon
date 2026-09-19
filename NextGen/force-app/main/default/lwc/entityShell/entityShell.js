import { LightningElement, track } from 'lwc';

export default class EntityShell extends LightningElement {
    @track isLoggedIn = false;
    @track authView = 'home'; // 'home', 'login', 'register'
    @track currentTab = 'dashboard'; // 'dashboard', 'reports', 'documents', 'settings'
    @track entityName = 'SA Sports Commission';

    // Auth state getters
    get isHomeView() { return this.authView === 'home'; }
    get isLoginView() { return this.authView === 'login'; }
    get isRegisterView() { return this.authView === 'register'; }

    // Navigation getters
    get isDashboard() { return this.currentTab === 'dashboard'; }
    get isReports() { return this.currentTab === 'reports'; }
    get isDocuments() { return this.currentTab === 'documents'; }
    get isSettings() { return this.currentTab === 'settings'; }

    // Auth handlers
    handleNavigateHome() { this.authView = 'home'; }
    handleNavigateLogin() { this.authView = 'login'; }
    handleNavigateRegister() { this.authView = 'register'; }

    handleLoginSuccess(event) {
        if (event.detail?.entityName) {
            this.entityName = event.detail.entityName;
        }
        this.isLoggedIn = true;
        this.currentTab = 'dashboard';
    }

    handleRegisterSuccess() {
        this.authView = 'login';
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.authView = 'login';
    }

    // Navigation handlers
    handleNavSelect(event) {
        this.currentTab = event.detail;
    }

    handleNavigateReports() {
        this.currentTab = 'reports';
    }
}