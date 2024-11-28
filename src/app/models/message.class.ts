import { messageData } from "../types/types";

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
}