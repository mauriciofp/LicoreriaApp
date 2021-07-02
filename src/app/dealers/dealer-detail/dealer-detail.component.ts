import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Dealer } from 'src/app/models/dealer';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-dealer-detail',
  templateUrl: './dealer-detail.component.html',
  styleUrls: ['./dealer-detail.component.scss'],
})
export class DealerDetailComponent implements OnInit {

  dealer: Observable<Dealer>;
  dealerId: string;

  constructor(
    private ds: DealerService,
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.
      subscribe(data => this.dealerId = data.id);
    this.dealer = this.ds.getDealer('-Md_DI7fFstRwb6ecMyq');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Proveedor',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: async () => {
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

                  }
                }
              ]
            })
          }
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.router.navigate(['dealers/edit', this.dealerId]);
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
