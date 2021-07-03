export class User {
  static fromFirebase({ email, uid, name, phone, role }) {
    return new User(uid, name, email, phone, role);
  }
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public phone: string,
    public role: UserRole
  ) {}
}

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
  dealer = 'DEALER',
}
