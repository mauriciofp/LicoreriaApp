import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductsPage } from './products.page';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductNewImagesComponent } from './components/product-new-images/product-new-images.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductImagesComponent,
    ProductNewImagesComponent,
    ProductNewComponent,
    ProductsPage,
    ProductComponent,
    ProductListComponent,
    ProductNewComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
