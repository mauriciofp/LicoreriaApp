import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealer } from '../models/dealer';
import { DealerService } from '../services/dealer.service';

@Component({
  selector: 'app-dealers-list',
  templateUrl: './dealers-list.component.html',
  styleUrls: ['./dealers-list.component.scss'],
})
export class DealersListComponent implements OnInit {

  dealers: Observable<Dealer[]>;

  constructor(private ds: DealerService) { }

  ngOnInit() {
    this.dealers = this.ds.getAll();
  }

}
