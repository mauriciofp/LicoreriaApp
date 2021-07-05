import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderNewComponent } from './pages/order-new/order-new.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';

@NgModule({
  declarations: [OrdersComponent, OrderNewComponent, OrderlistComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class OrdersModule {}
