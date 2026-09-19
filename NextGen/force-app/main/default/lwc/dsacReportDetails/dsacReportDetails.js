import { LightningElement, track, api } from 'lwc';

export default class DsacReportDetails extends LightningElement {
    @api reportTitle = 'Q2 2025 Performance Report';
    @track reportStatus = 'Under Review';
    @track newCommentText = '';

    @track comments = [
        { id: '1', author: 'DSAC Reviewer 1', date: '16 Oct 2025', text: 'Please double-check the development targets on Page 14. They seem to mismatch the Annexure numbers.' }
    ];

    @track workflowSteps = [
        { id: 'w1', title: 'Submitted', detail: 'Thabo Mokoena • 15 Oct 2025, 14:32', className: 'timeline-item complete' },
        { id: 'w2', title: 'Under Review', detail: 'Assigned to Audit Division • 15 Oct 2025, 16:00', className: 'timeline-item active' },
        { id: 'w3', title: 'Pending Approval', detail: 'Director General Sign-off • In Progress', className: 'timeline-item pending' }
    ];

    get commentCount() {
        return this.comments.length;
    }

    get statusBadgeClass() {
        if (this.reportStatus === 'Approved') return 'status-tag green';
        if (this.reportStatus === 'Changes Requested') return 'status-tag red';
        return 'status-tag warning';
    }

    handleCommentInputChange(event) {
        this.newCommentText = event.target.value;
    }

    handleCommentKeyUp(event) {
        if (event.key === 'Enter') {
            this.handleAddComment();
        }
    }

    handleAddComment() {
        if (!this.newCommentText.trim()) return;

        const newComment = {
            id: String(Date.now()),
            author: 'Current User (DSAC Officer)',
            date: 'Just now',
            text: this.newCommentText
        };

        this.comments = [...this.comments, newComment];
        this.newCommentText = '';
    }

    handleApproveReport() {
        this.reportStatus = 'Approved';
        this.notifyUser('Report successfully approved and moved to DG Sign-off.');
    }

    handleRequestChanges() {
        this.reportStatus = 'Changes Requested';
        this.notifyUser('Report flagged for resubmission. Notification sent to entity.');
    }

    handleDownloadReport() {
        this.notifyUser(`Exporting full package for ${this.reportTitle}...`);
    }

    handleDownloadFile(event) {
        const fileName = event.currentTarget.dataset.file;
        this.notifyUser(`Downloading ${fileName}...`);
    }

    notifyUser(msg) {
        this.dispatchEvent(new CustomEvent('exportreport', {
            detail: { message: msg },
            bubbles: true,
            composed: true
        }));
    }
}