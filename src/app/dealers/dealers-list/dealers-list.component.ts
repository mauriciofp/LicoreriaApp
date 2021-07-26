import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.dealers = [];
    this.ds.getAll().
      subscribe(data => {
        this.dealers = data;
        console.log(this.dealers);
      });
  }

  async remove(id: string, urlImage: string) {
    const alert = await this.alertController.create({
      header: 'Cuidado',
      message: 'Esta seguro de eliminar este proveedor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si Eliminar',
          handler: () => {
            this.ds.deleteDealer(id, urlImage)
              .then(data => {console.log('deleted', data);});
              this.router.navigate(['dealers/list']);
          }
        }
      ]
    });
    await alert.present();
  }
}
