import { LightningElement } from 'lwc';

export default class DsacEntityChatbot extends LightningElement {

    isOpen = false;

    showWelcomeActions = true;
    showEntityForm = false;
    showDocuments = false;

    entityName = '';
    registrationNumber = '';
    contactEmail = '';
    province = '';

    messageCounter = 0;

    messages = [
        {
            id: 1,
            isBot: true,
            messageClass: 'message bot-message',
            text:
                '👋 Welcome to the DSAC Reporting Platform. ' +
                'I can help you register your entity, upload your required ' +
                'documents and access your Entity Dashboard.'
        },
        {
            id: 2,
            isBot: true,
            messageClass: 'message bot-message',
            text: 'What would you like to do?'
        }
    ];

    provinceOptions = [
        { label: 'Eastern Cape', value: 'Eastern Cape' },
        { label: 'Free State', value: 'Free State' },
        { label: 'Gauteng', value: 'Gauteng' },
        { label: 'KwaZulu-Natal', value: 'KwaZulu-Natal' },
        { label: 'Limpopo', value: 'Limpopo' },
        { label: 'Mpumalanga', value: 'Mpumalanga' },
        { label: 'Northern Cape', value: 'Northern Cape' },
        { label: 'North West', value: 'North West' },
        { label: 'Western Cape', value: 'Western Cape' }
    ];

    openChat() {
        this.isOpen = true;
    }

    closeChat() {
        this.isOpen = false;
    }

    addBotMessage(text) {
        this.messageCounter++;

        this.messages = [
            ...this.messages,
            {
                id: Date.now() + this.messageCounter,
                isBot: true,
                messageClass: 'message bot-message',
                text: text
            }
        ];
    }

    addUserMessage(text) {
        this.messageCounter++;

        this.messages = [
            ...this.messages,
            {
                id: Date.now() + this.messageCounter,
                isBot: false,
                messageClass: 'message user-message',
                text: text
            }
        ];
    }

    startRegistration() {

        this.showWelcomeActions = false;

        this.addUserMessage('Register Entity');

        setTimeout(() => {
            this.addBotMessage(
                'Great! Let’s get your entity registered. ' +
                'I will guide you through each step. ' +
                'First, please provide your entity information.'
            );

            this.showEntityForm = true;
        }, 400);
    }

    existingAccount() {

        this.showWelcomeActions = false;

        this.addUserMessage('I already have an account');

        setTimeout(() => {
            this.addBotMessage(
                'You can log in using your existing entity account. ' +
                'Once logged in, you will be taken to your Entity Dashboard.'
            );
        }, 400);
    }

    explainRegistration() {

        this.showWelcomeActions = false;

        this.addUserMessage('How does registration work?');

        setTimeout(() => {
            this.addBotMessage(
                'Registration consists of three simple steps: ' +
                '1. Enter your entity information. ' +
                '2. Upload your Constitution or Founding Document and Financial Statement. ' +
                '3. Submit your registration and access your Entity Dashboard.'
            );

            this.showWelcomeActions = true;
        }, 400);
    }

    handleEntityName(event) {
        this.entityName = event.target.value;
    }

    handleRegistrationNumber(event) {
        this.registrationNumber = event.target.value;
    }

    handleContactEmail(event) {
        this.contactEmail = event.target.value;
    }

    handleProvince(event) {
        this.province = event.detail.value;
    }

    submitEntityDetails() {

        if (
            !this.entityName ||
            !this.registrationNumber ||
            !this.contactEmail ||
            !this.province
        ) {
            this.addBotMessage(
                'Please complete all required entity information before continuing.'
            );

            return;
        }

        this.showEntityForm = false;

        this.addUserMessage(
            `Entity details submitted for ${this.entityName}.`
        );

        setTimeout(() => {

            this.addBotMessage(
                'Thank you. Your entity information has been captured.'
            );

            setTimeout(() => {

                this.addBotMessage(
                    '📄 The next step is mandatory. ' +
                    'You must upload your Constitution or Founding Document ' +
                    'and Financial Statement before registration can be completed.'
                );

                this.showDocuments = true;

            }, 500);

        }, 400);
    }

    completeRegistration() {

        this.showDocuments = false;

        this.addUserMessage('Continue to Upload');

        setTimeout(() => {

            this.addBotMessage(
                '📂 Your document upload step is ready. ' +
                'Please upload your Constitution or Founding Document ' +
                'and Financial Statement.'
            );

            setTimeout(() => {

                this.addBotMessage(
                    'Once both documents have been successfully uploaded, ' +
                    'your registration can be completed and you will be ' +
                    'redirected to your Entity Dashboard.'
                );

            }, 500);

        }, 400);
    }
}