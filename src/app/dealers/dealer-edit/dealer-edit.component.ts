import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { ValidationsDealer } from '../utils/validations-dealer';
import { ActivatedRoute, Router } from '@angular/router';
import { Dealer } from 'src/app/models/dealer';
import { Observable } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';
import { CameraPhoto } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.scss'],
})
export class DealerEditComponent implements OnInit {
  newPhoto: CameraPhoto;
  newUrlPhoto: SafeResourceUrl;
  takedPhoto = false;

  form: FormGroup;

  dealerId: string;
  userReference: any;
  dealer: Observable<Dealer>;
  constructor(
    private fb: FormBuilder,
    private ds: DealerService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cs: CameraService,
    private us: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]),
    });

    this.activatedRoute.params.subscribe((param) => {
      this.dealerId = param.id;
      this.dealer = this.ds.getDealer(param.id);
      this.ds.getDealer(param.id).subscribe((data) => {
        this.name.setValue(data.name);
        this.company.setValue(data.company);
        this.email.setValue(data.email);

        this.email.setAsyncValidators([
          ValidationsDealer.isUniqueEmail(this.ds, data.email),
          ValidationsDealer.existUser(this.ds, data.email),
        ]);

        data.phones.forEach((element) => {
          this.phones.push(new FormControl(element, Validators.required));
        });

        this.ds
          .getUserId(param.id)
          .subscribe((res) => (this.userReference = res[0]));
      });
    });
  }

  loadImage() {
    const photo = this.cs.takeSinglePhoto().then((ph) => {
      console.log('photoUrl', ph.webPath);
      this.newPhoto = ph;
      this.newUrlPhoto = this.sanitizer.bypassSecurityTrustUrl(
        ph && ph.webPath
      );
      this.takedPhoto = true;
    });
  }

  save() {
    if (!this.form.invalid) {
      this.name.setValue(this.name.value.trim());
      this.company.setValue(this.company.value.trim());
      this.email.setValue(this.email.value.trim());
      if (this.takedPhoto) {
        this.ds.updateDealer(
          this.dealerId,
          this.userReference.id,
          this.form.value,
          this.newPhoto
        );
      } else {
        this.ds.updateDealer(
          this.dealerId,
          this.userReference.id,
          this.form.value
        );
      }
    }
  }

  addPhone() {
    const control = this.fb.control('', Validators.required);
    this.phones.push(control);
  }

  removePhone(index) {
    this.phones.removeAt(index);
    //this.phones.controls.splice(index, 1);
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
