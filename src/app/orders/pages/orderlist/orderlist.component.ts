import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((res) => (this.orders = res));
  }
}
