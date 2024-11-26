export class Message {
    id: string;
    senderId: string;
    receiverId: string;
    timeStamp: Date;
    reactions: Object;
    messageText: string;

    constructor(obj?: Partial<Message>) {
        this.id = obj?.id ?? '';
        this.senderId = obj?.senderId ?? '';
        this.receiverId = obj?.receiverId ?? '';
        this.timeStamp = obj?.timeStamp ?? new Date();
        this.reactions = obj?.reactions ?? '';
        this.messageText = obj?.messageText ?? '';
    }
}