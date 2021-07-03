import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DealersRoutingModule } from './dealers-routing.module';
import { NewDealerComponent } from './new-dealer/new-dealer.component';
import { DealersListComponent } from './dealers-list/dealers-list.component';
import { DealerDetailComponent } from './dealer-detail/dealer-detail.component';
import { DealerEditComponent } from './dealer-edit/dealer-edit.component';
import { DealersComponent } from './dealers.component';

@NgModule({
  declarations: [
    NewDealerComponent,
    DealersListComponent,
    DealerDetailComponent,
    DealerEditComponent,
    DealersComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DealersRoutingModule,
  ],
})
export class DealersModule {}
