import { userData } from '../types/types';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  channelIds: string[];
  chatIds: string[];

  constructor(data: userData) {
    this.id = data.id ?? '';
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.avatar = data.avatar ?? '';
    this.isOnline = data.isOnline ?? false;
    this.channelIds = data.channelIds ?? [];
    this.chatIds = data.chatIds ?? [];
  }

  toPlainObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      avatar: this.avatar,
      isOnline: this.isOnline,
      channelIds: this.channelIds,
      chatIds: this.chatIds,
    };
  }
}
