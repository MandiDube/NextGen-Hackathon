import { LightningElement, track } from 'lwc';

export default class EntityDocuments extends LightningElement {
    @track searchKey = '';
    @track selectedCategory = '';
    @track selectedStatus = '';
    @track isUploadModalOpen = false;
    @track selectedFileName = '';

    @track documents = [
        {
            id: '1',
            name: 'CIPC Registration Certificate',
            fileName: 'CIPC_COR14.3_2025.pdf',
            category: 'Governance & Compliance',
            size: '1.2 MB',
            uploadDate: '2026-01-15',
            status: 'Verified',
            statusClass: 'badge badge-success'
        },
        {
            id: '2',
            name: 'SARS Tax Compliance Pin Letter',
            fileName: 'SARS_Tax_Pin_2026.pdf',
            category: 'Tax & Legal',
            size: '450 KB',
            uploadDate: '2026-02-10',
            status: 'Verified',
            statusClass: 'badge badge-success'
        },
        {
            id: '3',
            name: 'Audited Financial Statements FY2025',
            fileName: 'AFS_Signed_2025_Final.pdf',
            category: 'Financial Statements',
            size: '4.8 MB',
            uploadDate: '2026-03-01',
            status: 'Pending Review',
            statusClass: 'badge badge-info'
        },
        {
            id: '4',
            name: 'Q1 Grant Acquittal Proof of Expenditure',
            fileName: 'Q1_Bank_Statements_Invoices.pdf',
            category: 'Grant Acquittals',
            size: '3.1 MB',
            uploadDate: '2026-04-02',
            status: 'Requires Revision',
            statusClass: 'badge badge-warning'
        }
    ];

    @track newDoc = {
        name: '',
        category: 'Governance & Compliance'
    };

    get filteredDocuments() {
        return this.documents.filter(doc => {
            const matchesSearch = !this.searchKey || 
                doc.name.toLowerCase().includes(this.searchKey.toLowerCase()) ||
                doc.fileName.toLowerCase().includes(this.searchKey.toLowerCase());
            const matchesCategory = !this.selectedCategory || doc.category === this.selectedCategory;
            const matchesStatus = !this.selectedStatus || doc.status === this.selectedStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    get displayedCount() {
        return this.filteredDocuments.length;
    }

    get totalCount() {
        return this.documents.length;
    }

    handleSearchChange(event) {
        this.searchKey = event.target.value;
    }

    handleCategoryFilter(event) {
        this.selectedCategory = event.target.value;
    }

    handleStatusFilter(event) {
        this.selectedStatus = event.target.value;
    }

    handleOpenUploadModal() {
        this.isUploadModalOpen = true;
    }

    handleCloseUploadModal() {
        this.isUploadModalOpen = false;
        this.selectedFileName = '';
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field) {
            this.newDoc[field] = event.target.value;
        }
    }

    handleFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFileName = file.name;
        }
    }

    handleSaveDocument() {
        if (!this.newDoc.name) return;

        const today = new Date().toISOString().split('T')[0];
        const newRecord = {
            id: String(this.documents.length + 1),
            name: this.newDoc.name,
            fileName: this.selectedFileName || `${this.newDoc.name.replace(/\s+/g, '_')}.pdf`,
            category: this.newDoc.category,
            size: '1.5 MB',
            uploadDate: today,
            status: 'Pending Review',
            statusClass: 'badge badge-info'
        };

        this.documents = [newRecord, ...this.documents];
        this.handleCloseUploadModal();

        this.newDoc = {
            name: '',
            category: 'Governance & Compliance'
        };
    }

    handleDownloadDoc(event) {
        const docId = event.currentTarget.dataset.id;
        const doc = this.documents.find(d => d.id === docId);
        
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message: `Downloading file: ${doc ? doc.fileName : docId}` },
            bubbles: true,
            composed: true
        }));
    }

    handleDeleteDoc(event) {
        const docId = event.currentTarget.dataset.id;
        this.documents = this.documents.filter(d => d.id !== docId);
    }
}