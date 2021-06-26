
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { Validators } from '@angular/forms';
import { ValidationsDealer } from '../utils/validations-dealer';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-new-dealer',
  templateUrl: './new-dealer.component.html',
  styleUrls: ['./new-dealer.component.scss'],
})
export class NewDealerComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required, ValidationsDealer.isUniqueName(this.ds)),
    company: new FormControl(''),
    celNumber: new FormControl('', [Validators.required, Validators.min(7)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(7)])
  });

  constructor(private ds: DealerService) { }

  ngOnInit() {
    // this.ds.getAll();
    // const arr = this.ds.existDealer('pepito el grillo');
    // arr.subscribe(res => console.log('res', res));
    console.log(this.form.value);
  }

  onSubmitDealer() {
    console.log(this.form.value);
    this.ds.createDealer(this.form.value);
  }

  invalidField(field: string) {
    this.form.get('').hasError('required');
    return (
      this.form.get(field).invalid && this.form.get(field).touched
    );
  }

  takePicture() {
    console.log('taking the picture');
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      const imageUrl = image.webPath;

      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    };
  }

  getFromGallery() {

  }

  get name() {
    return this.form.get('name');
  }

  get company() {
    return this.form.get('company');
  }

  get celNumber() {
    return this.form.get('celNumber');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
}
