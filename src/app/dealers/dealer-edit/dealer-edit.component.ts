import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { ValidationsDealer } from '../utils/validations-dealer';
import { ActivatedRoute, Router } from '@angular/router';
import { Dealer } from 'src/app/models/dealer';
import { Observable } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';
import { Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.scss'],
})
export class DealerEditComponent implements OnInit {

  newPhoto: Photo;
  newUrlPhoto: SafeResourceUrl;
  takedPhoto = false;

  form: FormGroup;

  dealerId: string;
  dealer: Observable<Dealer>;
  constructor(
    private fb: FormBuilder,
    private ds: DealerService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cs: CameraService
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([])
    });

    this.activatedRoute.params.subscribe((param) => {
      this.dealerId = param.id;
      this.dealer = this.ds.getDealer(param.id);
      this.ds.getDealer(param.id).subscribe((data) => {

        this.name.setValue(data.name);
        this.company.setValue(data.company);
        this.email.setValue(data.email);

        data.phones.forEach(element => {
          this.phones.push(new FormControl('', Validators.required));
        });

      });
    });
  }

  loadImage() {
    const photo = this.cs.takeSinglePhoto().then(ph => {
      console.log('photoUrl',ph.webPath);
      this.newPhoto = ph;
      this.newUrlPhoto = this.sanitizer.bypassSecurityTrustUrl(ph && (ph.webPath));
      this.takedPhoto = true;
    });
  }

  save() {
    console.log(this.form.valid);
    if(!this.form.invalid) {
      console.log('saving data');
      this.ds.updateDealer(this.dealerId, this.form.value);
    }
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
