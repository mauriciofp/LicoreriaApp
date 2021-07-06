import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss'],
})
export class OrderItemListComponent implements OnInit {
  @Input() orders: Order[];

  constructor() {}

  ngOnInit() {}
}
