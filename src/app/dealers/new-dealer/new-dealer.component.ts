import { Component, OnInit, Sanitizer } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { ValidationsDealer } from '../utils/validations-dealer';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { CameraService } from '../../services/camera.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dealer } from '../../models/dealer';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-dealer',
  templateUrl: './new-dealer.component.html',
  styleUrls: ['./new-dealer.component.scss'],
})
export class NewDealerComponent implements OnInit {
  form: FormGroup;

  dealerUrlImage: SafeResourceUrl;
  dealerPhoto: Photo;

  profileURL: Observable<string | null>;

  constructor(
    private ds: DealerService,
    private cs: CameraService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private us: UserService
  ) {
    const ref = this.storage.ref('noimage.jpg');
    this.profileURL = ref.getDownloadURL();
  }

  ngOnInit() {
    //this.dealerUrlImage = '';

    this.form = this.fb.group({
      name: [
        '',
        [Validators.required],
        [ValidationsDealer.isUniqueName(this.ds)],
      ],
      company: [''],
      email: [
        '',
        [Validators.required, Validators.email],
        [
          ValidationsDealer.isUniqueEmail(this.ds),
          ValidationsDealer.existUser(this.ds),
        ],
      ],
      phones: this.fb.array([]),
    });
    this.phones.push(new FormControl('', Validators.required));
    console.log('form', this.form);
  }

  takePicture() {
    console.log('taking the picture');
    const photo = this.cs.takeSinglePhoto().then((ph) => {
      console.log('photoUrl', ph.webPath);
      this.dealerPhoto = ph;
      this.dealerUrlImage = this.sanitizer.bypassSecurityTrustUrl(
        ph && ph.webPath
      );
    });
  }

  getFromGallery() {}

  submitForm() {
    if (this.form.valid) {
      this.name.setValue(this.name.value.trim());
      this.company.setValue(this.company.value.trim());
      this.email.setValue(this.email.value.trim());
      this.ds.createDealer(this.form.value, this.dealerPhoto);
    }
  }

  addPhone() {
    const control = this.fb.control('', Validators.required);
    this.phones.push(control);
  }

  removePhone(index) {
    this.phones.controls.splice(index, 1);
    this.phones.removeAt(index);
  }

  test() {
    this.us.getUserByEmail('test0996@test.com')
      .subscribe(data => {
        console.log(data);
      });
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

  get phones() {
    return this.form.get('phones') as FormArray;
  }
}
