
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { Validators } from '@angular/forms';
import { ValidationsDealer } from '../utils/validations-dealer';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { CameraService } from '../../services/camera.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dealer } from '../../models/dealer';


@Component({
  selector: 'app-new-dealer',
  templateUrl: './new-dealer.component.html',
  styleUrls: ['./new-dealer.component.scss'],
})
export class NewDealerComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required, ValidationsDealer.isUniqueName(this.ds)),
    company: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    celNumber: new FormControl('', Validators.minLength(7)),
    phoneNumber: new FormControl('', Validators.minLength(8))
  });

  dealerUrlImage: SafeResourceUrl;
  dealerPhoto: Photo;

  celNumbers: Array<string>;
  phoneNumbers: Array<string>;
  phoneEnabled = false;
  celEnabled = false;

  constructor(
    private ds: DealerService,
    private cs: CameraService,
    private sanitizer: DomSanitizer
    ) {
      this.celNumbers = [];
      this.phoneNumbers = [];
      //this.phoneEnabled = ((String) this.phoneNumber.value).;
    }

  ngOnInit() {
    this.dealerUrlImage = '';
    console.log('invalid', this.celNumber.invalid);
    this.celNumber.valueChanges.subscribe(data => {
      console.log(this.celNumber.invalid);
      console.log('errors', this.celNumber.errors);
    });
  }

  invalidField(field: string) {
    this.form.get('').hasError('required');
    return (
      this.form.get(field).invalid && this.form.get(field).touched
    );
  }

  takePicture() {
    console.log('taking the picture');
    const photo = this.cs.takeSinglePhoto().then(ph => {
      console.log('photoUrl',ph.webPath);
      this.dealerPhoto = ph;
      this.dealerUrlImage = this.sanitizer.bypassSecurityTrustUrl(ph && (ph.webPath));
    });
  }

  getFromGallery() {

  }

  submitForm() {
    const dealer = new Dealer(
      this.form.value.name, this.form.value.company, this.form.value.email);
    dealer.addCelNumber(this.form.value.celNumber);
    dealer.addPhoneNumber(this.form.value.phoneNumber);
    if(this.form.valid) {
      this.ds.createDealer(dealer, this.dealerPhoto);
    }
  }

  savePhoto() {
    this.ds.saveImageToStorage(this.dealerPhoto);
  }

  addPhoneNumber(n) {
    this.phoneNumbers = n;
  }

  addCelNumber(n) {
    this.celNumbers = n;
  }

  get name() {
    return this.form.get('name');
  }

  get company() {
    return this.form.get('company');
  }

  get email() {
    return this.form.get('email');
  }

  get celNumber() {
    return this.form.get('celNumber');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
}
