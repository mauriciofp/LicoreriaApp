import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { ValidationsDealer } from '../utils/validations-dealer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.scss'],
})
export class DealerEditComponent implements OnInit {

  // form = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   company: new FormControl(''),
  //   email: new FormControl('', [Validators.required, Validators.email])
  // });

  form: FormGroup;

  dealerId: string;
  constructor(
    private fb: FormBuilder,
    private ds: DealerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
    });

    this.activatedRoute.params.subscribe((param) => {
      this.dealerId = param.id;
      this.ds.getDealer(param.id).subscribe((data) => {
        this.name.setValue(data.name);
        this.company.setValue(data.company);
        this.email.setValue(data.email);
      });
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
}
