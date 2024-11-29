import { channelData } from "../types/types";

export class Channel {
    id: string;
    name: string;
    userIds: string[];
    description: string;
    messageIds: string[];
    threadIds: string[];
  
    // constructor(data: channelData) {
    //   this.id = data.id ?? '';
    //   this.userIds = data.userIds;
    //   this.name = data.name;
    //   this.description = data.description ?? '';
    //   this.messageIds = data.messageIds ?? [];
    //   this.threadIds = data.threadIds ?? [];
    // }

    constructor(object?: any){
      this.id =  object ? object.id : '';
      this.userIds = object ? object.userIds : [];
      this.name = object ? object.name : '';
      this.description = object ? object.description : '';
      this.messageIds = object ? object.messageIds : [];
      this.threadIds = object ? object.threadIds : [];
    }
}