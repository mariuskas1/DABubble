export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  channels: number[];
  chats: number[];
  online: boolean;
  avatar: string;

  constructor(obj?: Partial<User>) {
    this.id = obj?.id ?? '';
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.channels = obj?.channels ?? [];
    this.chats = obj?.chats ?? [];
    this.online = obj?.online ?? false;
    this.avatar = obj?.avatar ?? '';
  }
}
