import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DealersRoutingModule } from './dealers-routing.module';
import { NewDealerComponent } from './new-dealer/new-dealer.component';
import { DealersListComponent } from '../dealers-list/dealers-list.component';
import { DealerDetailComponent } from './dealer-detail/dealer-detail.component';


@NgModule({
  declarations: [NewDealerComponent, DealersListComponent, DealerDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DealersRoutingModule
  ]
})
export class DealersModule { }
