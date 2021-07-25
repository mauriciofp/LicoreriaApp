import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];

  searchText='';
  selectCat='all';

  productsSubs: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productsSubs = this.productService
      .getProductForHome()
      .subscribe((res) => {
        this.products = res;

        this.products.forEach((x, index) => {
          if(this.categories.length === 0) {
            this.categories.push(x.category);
          }
          else if(x.category !== this.products[index -1].category) {
            this.categories.push(x.category);
          }
        });
        console.log('cats', this.categories);
      });
  }

}
