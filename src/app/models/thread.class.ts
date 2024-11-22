import { User } from "./user.class";

export class Thread {
  id: number;
  user: User;
  messages: string[];
  threads: string[];

  constructor(obj?: Partial<Thread>) {
    this.id = obj?.id ?? 0;
    this.user = obj?.user ?? new User();
    this.messages = obj?.messages ?? [];
    this.threads = obj?.threads ?? [];
  }
}
