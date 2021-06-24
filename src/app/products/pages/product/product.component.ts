import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { Product } from 'src/app/interfaces/interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  productId: string;

  messageMapping: { [k: string]: string } = {
    '=0': 'Agotado.',
    '=1': 'Una unidad disponible',
    other: '# unidades disponibles',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => (this.productId = id)),
        switchMap(({ id }) => this.productService.getOne(id))
      )
      .subscribe((product) => {
        this.product = product;
        this.product.id = this.productId;
      });
  }
}
