import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderNewComponent } from './pages/order-new/order-new.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';
import { OrderMapComponent } from './components/order-map/order-map.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderNewComponent,
    OrderlistComponent,
    OrderMapComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class OrdersModule {}
