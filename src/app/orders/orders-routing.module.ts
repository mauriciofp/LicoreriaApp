import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderNewGuard } from '../guards/order-new.guard';
import { OrdersComponent } from './orders.component';
import { OrderNewComponent } from './pages/order-new/order-new.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: 'new',
        component: OrderNewComponent,
        canActivate: [OrderNewGuard],
      },
      { path: 'list', component: OrderlistComponent },
      { path: ':id', component: OrderComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
