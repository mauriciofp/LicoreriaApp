import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Dealer } from '../../models/dealer';
import { DealerService } from '../../services/dealer.service';

@Component({
  selector: 'app-dealers-list',
  templateUrl: './dealers-list.component.html',
  styleUrls: ['./dealers-list.component.scss'],
})
export class DealersListComponent implements OnInit {
  // dealers: Observable<any>;
  dealers: any[];
  dealersData: Dealer[];

  search = '';

  constructor(
    private ds: DealerService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.dealers = [];
    this.ds.getAll().
      subscribe(data => {
        this.dealers = data;
        console.log(this.dealers);
      });
  }

  async remove(id: string) {
    this.alertController.create({
      message: 'Seguro que quieres eliminar este distribuidor!',
      header: 'Cuidado!',
      buttons: [],
    });
  }
}
