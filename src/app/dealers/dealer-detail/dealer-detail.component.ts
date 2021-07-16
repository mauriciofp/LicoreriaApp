import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { element } from 'protractor';
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
  urlImage: string;

  constructor(
    private ds: DealerService,
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.
      subscribe(data => {
        this.dealerId = data.id;
        console.log('id', this.dealerId);
        this.dealer = this.ds.getDealer(this.dealerId);

        this.ds.getDealer(this.dealerId).subscribe(elm => {
          this.urlImage = elm.urlImage;
        });
      });
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
                    this.ds.deleteDealer(this.dealerId, this.urlImage)
                      .then(data => {console.log('deleted', data);});
                      this.router.navigate(['dealers/list']);
                  }
                }
              ]
            });
            await alert.present();
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
