import { LightningElement, track } from 'lwc';

export default class DsacEntities extends LightningElement {
    @track currentView = 'list'; // 'list' | 'profile'
    @track selectedEntity = {};
    @track isEditModalOpen = false;
    @track editFormData = {};

    get isListView() {
        return this.currentView === 'list';
    }

    get isProfileView() {
        return this.currentView === 'profile';
    }

    showListView() {
        this.currentView = 'list';
    }

    handleViewProfile(event) {
        const entityId = event.target.dataset.id;
        const found = this.entitiesList.find(e => e.id === entityId);
        this.selectedEntity = { ...(found || this.entitiesList[0]) };
        this.currentView = 'profile';
    }

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