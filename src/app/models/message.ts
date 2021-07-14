export class Message {
  static fromFirebase({ message, user, role, date }) {
    return new Message(message, user, role, date);
  }

  constructor(
    public message: string,
    public user: string,
    public role: string,
    public date: string
  ) {}
}
