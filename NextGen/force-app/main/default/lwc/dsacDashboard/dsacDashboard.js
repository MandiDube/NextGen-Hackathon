import { LightningElement, track } from 'lwc';

export default class DsacDashboard extends LightningElement {
    @track currentView = 'dashboard';
    @track selectedEntity = {};
    @track selectedReport = {};
    @track isEditModalOpen = false;
    @track isSubmitModalOpen = false;
    @track editFormData = {};
    @track newReportData = {};

    get isDashboard() {
        return this.currentView === 'dashboard';
    }

    get isEntities() {
        return this.currentView === 'entities';
    }

    get isEntityProfile() {
        return this.currentView === 'entity-profile';
    }

    get isReports() {
        return this.currentView === 'reports';
    }

    get isReportDetails() {
        return this.currentView === 'report-details';
    }

    get dashboardClass() {
        return `nav-item ${this.isDashboard ? 'active' : ''}`;
    }

    get entitiesClass() {
        return `nav-item ${this.isEntities || this.isEntityProfile ? 'active' : ''}`;
    }

    get reportsClass() {
        return `nav-item ${this.isReports || this.isReportDetails ? 'active' : ''}`;
    }

    showDashboard() {
        this.currentView = 'dashboard';
    }

    showEntities() {
        this.currentView = 'entities';
    }

    showReports() {
        this.currentView = 'reports';
    }

    handleViewProfile(event) {
        const entityId = event.target.dataset.id;
        const found = this.entitiesList.find(e => e.id === entityId);
        this.selectedEntity = { ...(found || this.entitiesList[0]) };
        this.currentView = 'entity-profile';
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
        this.currentView = 'report-details';
    }

    /* EDIT ENTITY MODAL LOGIC */
    handleOpenEditModal() {
        this.editFormData = { ...this.selectedEntity };
        this.isEditModalOpen = true;
    }

    handleCloseEditModal() {
        this.isEditModalOpen = false;
    }

    handleInputChange(event) {
        const field = event.target.name;
        this.editFormData[field] = event.target.value;
    }

    handleSaveEntity() {
        this.selectedEntity = { ...this.editFormData };
        this.entitiesList = this.entitiesList.map(item => {
            if (item.id === this.selectedEntity.id) {
                return { ...this.selectedEntity };
            }
            return item;
        });
        this.isEditModalOpen = false;
    }

    /* SUBMIT REPORT MODAL LOGIC */
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

    provinceData = [
        { code: 'GP', name: 'Gauteng', value: 92, style: 'width: 92%;' },
        { code: 'WC', name: 'Western Cape', value: 88, style: 'width: 88%;' },
        { code: 'KZN', name: 'KwaZulu-Natal', value: 81, style: 'width: 81%;' },
        { code: 'FS', name: 'Free State', value: 76, style: 'width: 76%;' },
        { code: 'MP', name: 'Mpumalanga', value: 74, style: 'width: 74%;' },
        { code: 'NW', name: 'North West', value: 69, style: 'width: 69%;' },
        { code: 'EC', name: 'Eastern Cape', value: 65, style: 'width: 65%;' },
        { code: 'LP', name: 'Limpopo', value: 62, style: 'width: 62%;' },
        { code: 'NC', name: 'Northern Cape', value: 58, style: 'width: 58%;' }
    ];

    recentReports = [
        { id: '1', title: 'Q3 Financial Performance Statement', entity: 'SA National Gallery', date: '12 Dec 2024', status: 'Approved', statusClass: 'status-badge approved' },
        { id: '2', title: 'Annual Development & Transformation...', entity: 'SA Rugby Union', date: '10 Dec 2024', status: 'Approved', statusClass: 'status-badge approved' },
        { id: '3', title: 'Operational Audit Report - Heritage Sit...', entity: 'Robben Island Museum', date: '08 Dec 2024', status: 'Under Review', statusClass: 'status-badge review' },
        { id: '4', title: 'Arts Access Initiative Progress Report', entity: 'Playhouse Company', date: '05 Dec 2024', status: 'Pending', statusClass: 'status-badge pending' },
        { id: '5', title: 'Governance Compliance Submission', entity: 'Boxing SA', date: '30 Nov 2024', status: 'Overdue', statusClass: 'status-badge overdue' }
    ];

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

    deadlines = [
        { id: 'd1', title: 'Q4 Treasury Alignment Proposal', sub: 'State Theatre', date: '18 Dec (2d)', cardClass: 'deadline-item red', dateClass: 'date-red' },
        { id: 'd2', title: 'B-BBEE Transformation Review', sub: 'SA Cricket Board', date: '20 Dec (4d)', cardClass: 'deadline-item red', dateClass: 'date-red' },
        { id: 'd3', title: 'Asset Register Integrity Sign-off', sub: 'National Arts Council', date: '28 Dec', cardClass: 'deadline-item amber', dateClass: 'date-muted' },
        { id: 'd4', title: 'Public Funding Allocations Q1', sub: 'DSAC Head Office', date: '05 Jan', cardClass: 'deadline-item amber', dateClass: 'date-muted' },
        { id: 'd5', title: 'Community Sport Outreach Plan', sub: 'Swim South Africa', date: '12 Jan', cardClass: 'deadline-item amber', dateClass: 'date-muted' }
    ];

    @track entitiesList = [
        { id: 'e1', name: 'SA Sports Commission', type: 'Public Entity', province: 'Gauteng', status: 'Active', statusClass: 'status-badge active', lastReport: '12 Dec 2024', address: '101 Boundary Road, Oaklands, Johannesburg, 2192', phone: '+27 11 555 0192', email: 'info@sasportcommission.org.za', contactPerson: 'Thabo Mokoena (Compliance Officer)' },
        { id: 'e2', name: 'National Arts Council', type: 'Public Entity', province: 'Gauteng', status: 'Active', statusClass: 'status-badge active', lastReport: '08 Dec 2024', address: '66 Margaret Mcingana St, Newtown, Johannesburg, 2001', phone: '+27 11 838 1383', email: 'info@nac.org.za', contactPerson: 'Sipho Zulu (Operations Manager)' },
        { id: 'e3', name: 'SA Rugby Union', type: 'NPO', province: 'Western Cape', status: 'Active', statusClass: 'status-badge active', lastReport: '10 Dec 2024', address: '163 Jan Smuts Ave, Rosebank, Cape Town, 7700', phone: '+27 21 659 6700', email: 'info@sarugby.co.za', contactPerson: 'Mark Alexander (President)' },
        { id: 'e4', name: 'SA National Gallery', type: 'Public Entity', province: 'Western Cape', status: 'Active', statusClass: 'status-badge active', lastReport: '12 Dec 2024', address: 'Government Ave, Company\'s Garden, Cape Town, 8000', phone: '+27 21 481 3970', email: 'info@iziko.org.za', contactPerson: 'Bongiwe Dlamini (Curator)' },
        { id: 'e5', name: 'Robben Island Museum', type: 'Public Entity', province: 'Western Cape', status: 'Active', statusClass: 'status-badge active', lastReport: '08 Dec 2024', address: 'V&A Waterfront, Cape Town, 8002', phone: '+27 21 413 4200', email: 'info@robben-island.org.za', contactPerson: 'Khotso Malebo (Senior Administrator)' },
        { id: 'e6', name: 'Boxing SA', type: 'Public Entity', province: 'Gauteng', status: 'Inactive', statusClass: 'status-badge inactive', lastReport: '30 Nov 2024', address: '1 Dutch Road, Midrand, Johannesburg, 1685', phone: '+27 12 765 9600', email: 'admin@boxingsa.co.za', contactPerson: 'Luvuyo Bayeni (Acting CEO)' },
        { id: 'e7', name: 'Cape Town Opera', type: 'NPO', province: 'Western Cape', status: 'Active', statusClass: 'status-badge active', lastReport: '14 Nov 2024', address: 'Artscape Theatre Centre, DF Malan St, Cape Town, 8001', phone: '+27 21 001 0100', email: 'info@capetownopera.co.za', contactPerson: 'Alex Gabriel (Managing Director)' },
        { id: 'e8', name: 'Playhouse Company', type: 'Public Entity', province: 'KwaZulu-Natal', status: 'Active', statusClass: 'status-badge active', lastReport: '05 Dec 2024', address: '29 Anton Lembede St, Durban Central, Durban, 4001', phone: '+27 31 369 9555', email: 'info@playhousecompany.com', contactPerson: 'Linda van der Merwe (HR Lead)' }
    ];

    submittedReports = [
        { id: 'sr1', title: 'Q2 Performance Summary', period: 'Q2 2025', submittedOn: '15 Oct 2025', status: 'Approved', statusClass: 'status-badge approved' },
        { id: 'sr2', title: 'Q1 Financial Statement', period: 'Q1 2025', submittedOn: '12 Jul 2025', status: 'Approved', statusClass: 'status-badge approved' },
        { id: 'sr3', title: 'Annual Infrastructure Progress', period: 'Annual 2024', submittedOn: '30 Mar 2025', status: 'Approved', statusClass: 'status-badge approved' }
    ];
}