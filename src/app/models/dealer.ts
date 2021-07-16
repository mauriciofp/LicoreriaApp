import { SafeResourceUrl } from '@angular/platform-browser';

export class Dealer {
  name: string;
  company: string;
  email: string;
  phones: number[];
  urlImage: string;

  constructor(name: string, company: string, email: string) {
    this.name = name;
    this.company = company;
    this.email = email;
    this.phones = [];
    this.urlImage = '';

  }
}
