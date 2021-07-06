import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';

import { OrderService } from 'src/app/services/order.service';

import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: string;
  order: Order;

  isLoading = false;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.router.params
      .pipe(
        tap(({ id }) => (this.orderId = id)),
        switchMap(({ id }) => this.orderService.getOne(id))
      )
      .subscribe((order) => {
        this.order = order;
        this.order.id = this.orderId;
      });
  }
}
