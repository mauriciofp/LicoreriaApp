import { SafeResourceUrl } from '@angular/platform-browser';

export class Dealer {
  id: string;
  name: string;
  company: string;
  email: string;
  celNumbers: number[];
  phoneNumbers: number[];
  urlImage: string;

  constructor(name: string, company: string, email: string) {
    this.id = '';
    this.name = name;
    this.company = company;
    this.email = email;
    this.celNumbers = [];
    this.phoneNumbers = [];
    this.urlImage = '';

  }

  addPhoneNumber(n: number) {
    this.phoneNumbers.push(n);
  }

  addCelNumber(n: number) {
    this.celNumbers.push(n);
  }

  set cNumbers(n: number[]) {
    this.celNumbers = n;
  }

  set pNumbers(n: number[]) {
    this.phoneNumbers = n;
  }
}
