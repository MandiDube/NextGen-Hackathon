import { LightningElement, track } from 'lwc';

export default class DsacDocumentRepo extends LightningElement {
    @track searchKey = '';
    @track selectedEntity = '';
    @track selectedType = '';

    @track documents = [
        { id: '1', name: 'Annual_Report_RugbyUnion_2024.pdf', entity: 'SA Rugby Union', type: 'Annual Report', date: '15 Dec 2024', uploadedBy: 'Sarah J.', iconClass: 'red-file' },
        { id: '2', name: 'Q3_Expenditure_BoxingSA.xlsx', entity: 'Boxing SA', type: 'Financial Statement', date: '12 Dec 2024', uploadedBy: 'Kagiso M.', iconClass: 'green-file' },
        { id: '3', name: 'Compliance_Certificate_NAG_2024.pdf', entity: 'SA National Gallery', type: 'Compliance Certificate', date: '10 Dec 2024', uploadedBy: 'Pieter K.', iconClass: 'red-file' },
        { id: '4', name: 'Heritage_Sites_Audit_RobbenIsland.pdf', entity: 'Robben Island Museum', type: 'Policy Document', date: '08 Dec 2024', uploadedBy: 'Thabo M.', iconClass: 'red-file' },
        { id: '5', name: 'Arts_Access_Initiative_Playhouse.docx', entity: 'Playhouse Company', type: 'Compliance Certificate', date: '05 Dec 2024', uploadedBy: 'Amara N.', iconClass: 'red-file' }
    ];

    get filteredDocuments() {
        return this.documents.filter(doc => {
            const matchesSearch = !this.searchKey || 
                doc.name.toLowerCase().includes(this.searchKey.toLowerCase()) ||
                doc.entity.toLowerCase().includes(this.searchKey.toLowerCase());
            const matchesEntity = !this.selectedEntity || doc.entity === this.selectedEntity;
            const matchesType = !this.selectedType || doc.type === this.selectedType;
            return matchesSearch && matchesEntity && matchesType;
        });
    }

    get displayedCount() {
        return this.filteredDocuments.length;
    }

    get totalCount() {
        return this.documents.length;
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleFilterChange(event) {
        const filterType = event.target.dataset.filter;
        if (filterType === 'entity') {
            this.selectedEntity = event.target.value;
        } else if (filterType === 'type') {
            this.selectedType = event.target.value;
        }
    }

    handleDownloadDoc(event) {
        const docId = event.currentTarget.dataset.id;
        const doc = this.documents.find(d => d.id === docId);
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message: `Downloading document: ${doc ? doc.name : docId}` },
            bubbles: true,
            composed: true
        }));
    }

    handlePreviewDoc(event) {
        const docId = event.currentTarget.dataset.id;
        const doc = this.documents.find(d => d.id === docId);
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message: `Opening preview drawer for ${doc ? doc.name : docId}...` },
            bubbles: true,
            composed: true
        }));
    }

    handleUploadClick() {
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message: 'Opening document upload dialog...' },
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