
export class Channel {
    id: string;
    name: string;
    userIds: string[];
    messages: string[];
    threads: string[];
    creator: string;
    description: string;
  
    constructor(obj?: Partial<Channel>) {
      this.id = obj?.id ?? '';
      this.userIds = obj?.userIds ?? [];
      this.name = obj?.name ?? '';
      this.messages = obj?.messages ?? [];
      this.threads = obj?.threads ?? [];
      this.creator = obj?.creator ?? '';
      this.description = obj?.description ?? '';
    }
  }