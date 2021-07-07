import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() products: Product[];

  constructor() {}

  ngOnInit() {}
}
