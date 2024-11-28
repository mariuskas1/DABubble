export class Message {
    id: string;
    senderId: string;
    chatId: string;
    timeStamp: Date;
    reactions: string[];
    messageText: string;

    constructor(data: messageData) {
        this.id = data.id ?? '';
        this.senderId = data.senderId;
        this.chatId = data.chatId;
        this.messageText = data.messageText;
        this.timeStamp = data.timeStamp ?? new Date();
        this.reactions = data.reactions ?? [];
    }

    private create() {
        if(this.id) return;
        
    } 
}

export type messageData = {
    id?: string;
    senderId: string;
    chatId: string;
    messageText: string;
    timeStamp?: Date;
    reactions?: string[];
}