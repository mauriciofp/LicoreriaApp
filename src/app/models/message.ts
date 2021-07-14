export class Message {
  static fromFirebase({ body, user, role, userId, date }) {
    return new Message(body, user, role, userId, date);
  }

  constructor(
    public body: string,
    public user: string,
    public role: string,
    public userId: string,
    public date: string
  ) {}
}
