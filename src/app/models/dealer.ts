import { SafeResourceUrl } from '@angular/platform-browser';

export class Dealer {
  name: string;
  company: string;
  celNumbers: number[];
  phoneNumbers: number[];
  urlImage: string;

  constructor(name: string, company: string) {
    this.name = name;
    this.company = company;
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
