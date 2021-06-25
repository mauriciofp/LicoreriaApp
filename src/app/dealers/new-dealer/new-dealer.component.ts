import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-new-dealer',
  templateUrl: './new-dealer.component.html',
  styleUrls: ['./new-dealer.component.scss'],
})
export class NewDealerComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    company: new FormControl(''),
    celNumber: new FormControl('', [Validators.required, Validators.min(7)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(7)])
  });

  constructor(private ds: DealerService) { }

  ngOnInit() {
    this.ds.getAll();
    const arr = this.ds.existDealer('pepito el grillo');
    arr.subscribe(res => console.log('res', res));
  }

  onSubmitDealer() {
    console.log(this.form.value);
    this.ds.createDealer(this.form.value);
  }
}
