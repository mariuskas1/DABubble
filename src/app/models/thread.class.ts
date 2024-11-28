import { threadData } from "../types/types";

export class Thread {
  id: string;
  userIds: string[];
  messageIds: string[];

  constructor(data: threadData) {
    this.id = data.id ?? '';
    this.userIds = data.userIds;
    this.messageIds = data.messageIds;
  }
}