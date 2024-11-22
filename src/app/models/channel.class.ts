export class Channel {
    id: number;
    name: string;
    userIds: number[];
    messages: string[];
    threads: string[];
  
    constructor(obj?: Partial<Channel>) {
      this.id = obj?.id ?? 0;
      this.userIds = obj?.userIds ?? [];
      this.name = obj?.name ?? '';
      this.messages = obj?.messages ?? [];
      this.threads = obj?.threads ?? [];
    }
  }