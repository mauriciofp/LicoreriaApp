import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';

import { OrderService } from 'src/app/services/order.service';

import { User } from 'src/app/models/user.model';
import { ProductCart } from 'src/app/models/product-cart';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  detailForm: FormGroup;

  isLoading = false;

  products: ProductCart[] = [];
  cant: number;
  total: number;
  cartSubs: Subscription;

  uiSubs: Subscription;

  user: User;
  userSubs: Subscription;

  location: string;
  locationSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.createForm();
    this.cartSubs = this.store
      .select('cart')
      .subscribe(({ products, total, cant }) => {
        this.products = products;
        this.cant = cant;
        this.total = total;
      });

    this.uiSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.isLoading = isLoading));

    this.userSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.user = user));
  }

  ngOnDestroy() {
    this.cartSubs?.unsubscribe();
    this.uiSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
    this.locationSubs?.unsubscribe();
  }

  sendOrder() {
    if (this.detailForm.invalid) {
      this.detailForm.markAllAsTouched();
      return;
    }

    this.orderService.createOrder(
      this.detailForm.value,
      this.location,
      this.products,
      this.total,
      this.cant,
      this.user
    );
  }

  private createForm() {
    this.detailForm = this.fb.group({
      street1: [''],
      street2: [''],
      street3: [''],
      description: ['', Validators.required],
    });
  }

  invalidField(field: string) {
    return (
      this.detailForm.get(field).invalid && this.detailForm.get(field).touched
    );
  }

  get descriptionMessageError(): string {
    const errors = this.detailForm.get('description').errors;
    let message = '';
    if (errors?.required) {
      message = 'La descripcion del lugar de entrega es necesario';
    }
    return message;
  }
}
