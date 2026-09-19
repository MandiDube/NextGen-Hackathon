import { LightningElement, track } from 'lwc';

export default class ChatButton extends LightningElement {
    @track isOpen = false;
    @track newMessage = '';
    @track messages = [];

    toggleChat() {
        this.isOpen = !this.isOpen;
    }

    handleInput(event) {
        this.newMessage = event.target.value;
    }

    sendMessage() {
        if(this.newMessage.trim() !== '') {
            this.messages.push({
                id: this.messages.length + 1,
                text: this.newMessage,
                senderClass: 'applicant-message'
            });
            this.newMessage = '';

            // Optional: Call Apex method to send message to HR
        }
    }
}