import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { UtilsService } from 'src/app/utils/utils.service';
import { ProductService } from '../../../services/product.service';

import { Image } from 'src/app/interfaces/interface';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent implements OnInit {
  @Input()
  images: Image[];

  @Input()
  productId: string;

  isNew = false;

  constructor(
    private productService: ProductService,
    private utilsService: UtilsService,
    private cameraService: CameraService
  ) {}

  ngOnInit() {
    this.cameraService.isNew$.subscribe((res) => (this.isNew = res));
  }

  async removeImage(image: Image) {
    if (this.images.length === 1) {
      const alert = await this.utilsService.createAlert(
        'Tienes que tener por lo menos una imagen!'
      );
      alert.present();
      return;
    }
    this.productService.removeImageById(this.productId, image).then(() => {
      this.images = this.images.filter((i) => i.id !== image.id);
    });
  }
}
