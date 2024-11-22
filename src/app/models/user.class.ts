export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  channels: number[];

  constructor(obj?: Partial<User>) {
    this.id = obj?.id ?? 0;
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.channels = obj?.channels ?? [0];
  }
}
