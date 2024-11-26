export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  channels: number[];
  chats: number[];
  online: boolean;
  avatar: string;

  constructor(obj?: Partial<User>) {
    this.id = obj?.id ?? 0;
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.channels = obj?.channels ?? [0];
    this.chats = obj?.chats ?? [0];
    this.online = obj?.online ?? false;
    this.avatar = obj?.avatar ?? '';
  }
}
