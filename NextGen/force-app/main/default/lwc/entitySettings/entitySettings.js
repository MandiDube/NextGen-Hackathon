import { LightningElement, track } from 'lwc';

export default class EntitySettings extends LightningElement {
    @track entityData = {
        legalName: 'Future Minds Non-Profit Organisation',
        cipcNumber: '2019/123456/08',
        taxNumber: '9876543210',
        address: '100 Sandton Drive, Sandton, Johannesburg, 2196',
        repName: 'Kgotso Moshoeshoe',
        repRole: 'Chief Technology Officer',
        repEmail: 'k.moshoeshoe@futureminds.co.za',
        repPhone: '+27 11 555 0192',
        bankName: 'First National Bank (FNB)',
        accountNumber: '62810928374',
        branchCode: '250655'
    };

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field) {
            this.entityData[field] = event.target.value;
        }
    }

    handleSaveAll() {
        this.dispatchEvent(new CustomEvent('showtoast', {
            detail: {
                title: 'Settings Saved',
                message: 'Entity profile and organization details updated successfully.',
                variant: 'success'
            },
            bubbles: true,
            composed: true
        }));
    }
}