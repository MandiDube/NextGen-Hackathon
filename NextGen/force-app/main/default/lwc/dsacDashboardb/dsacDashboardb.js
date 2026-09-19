import { LightningElement } from 'lwc';

export default class DsacDashboardb extends LightningElement {
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

    deadlines = [
        { id: 'd1', title: 'Q4 Treasury Alignment Proposal', sub: 'State Theatre', date: '18 Dec (2d)', cardClass: 'deadline-item red', dateClass: 'date-red' },
        { id: 'd2', title: 'B-BBEE Transformation Review', sub: 'SA Cricket Board', date: '20 Dec (4d)', cardClass: 'deadline-item red', dateClass: 'date-red' },
        { id: 'd3', title: 'Asset Register Integrity Sign-off', sub: 'National Arts Council', date: '28 Dec', cardClass: 'deadline-item amber', dateClass: 'date-muted' },
        { id: 'd4', title: 'Public Funding Allocations Q1', sub: 'DSAC Head Office', date: '05 Jan', cardClass: 'deadline-item amber', dateClass: 'date-muted' },
        { id: 'd5', title: 'Community Sport Outreach Plan', sub: 'Swim South Africa', date: '12 Jan', cardClass: 'deadline-item amber', dateClass: 'date-muted' }
    ];

    handleNewReportClick() {
        this.dispatchEvent(new CustomEvent('opensubmitreport', { bubbles: true, composed: true }));
    }
}