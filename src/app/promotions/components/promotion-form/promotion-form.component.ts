import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Promotion } from 'src/app/models/promotion';
import { AppState } from 'src/app/state/app.reducer';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss'],
})
export class PromotionFormComponent implements OnInit {
  @Input() promotion: Promotion;

  isLoading = false;

  promotionForm: FormGroup;

  uiSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.createForm();
    this.uiSubs = this.store.select('ui').subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubs?.unsubscribe();
  }

  async save() {
    if (this.promotionForm.invalid) {
      this.promotionForm.markAllAsTouched();
      return;
    }
    console.log(this.promotionForm.value);
  }

  cancel() {
    this.promotionForm.reset();
    this.router.navigate(['promotions']);
  }

  private createForm() {
    this.promotionForm = this.fb.group({
      name: [
        this.promotion ? this.promotion.name : '',
        [Validators.required, Validators.minLength(2)],
      ],
      description: [
        this.promotion ? this.promotion.description : '',
        [Validators.required, Validators.minLength(2)],
      ],
      price: [
        this.promotion ? Number(this.promotion.price) : 1.0,
        [Validators.required, Validators.min(1), Validators.max(9999)],
      ],
      available: [
        this.promotion ? this.promotion.available : true,
        Validators.required,
      ],
    });
  }

  invalidField(field: string) {
    return (
      this.promotionForm.get(field).invalid &&
      this.promotionForm.get(field).touched
    );
  }

  get invalidNameMsg(): string {
    const errors = this.promotionForm.get('name').errors;
    if (errors?.required) {
      return 'Nombre es obligatorio';
    } else if (errors?.minlength) {
      return 'Nombre debe contener minimo 2 caracters';
    }
    return '';
  }

  get invalidDescriptionMsg(): string {
    const errors = this.promotionForm.get('description').errors;
    if (errors?.required) {
      return 'Descripcion es obligatorio';
    } else if (errors?.minlength) {
      return 'Descripcion debe contener minimo 2 caracters';
    }
    return '';
  }

  get invalidPriceMsg(): string {
    const errors = this.promotionForm.get('price').errors;
    if (errors?.required) {
      return 'Precio es obligatorio';
    } else if (errors?.min) {
      return 'Precio debe ser minimo de 1';
    } else if (errors?.max) {
      return 'Precio debe ser maximo de 9999';
    }
    return '';
  }

  private async createBlobImages() {
    // const images = [];
    // for (const item of this.imageList) {
    //   const blob = await fetch(item.image.webPath).then((r) => r.blob());
    //   images.push(blob);
    // }
    // return images;
  }
}
