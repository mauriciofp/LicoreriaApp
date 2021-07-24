import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PromotionViewComponent } from './pages/promotion-view/promotion-view.component';
import { PromotionEditComponent } from './pages/promotion-edit/promotion-edit.component';
import { PromotionNewComponent } from './pages/promotion-new/promotion-new.component';
import { PromotionListComponent } from './pages/promotion-list/promotion-list.component';
import { PromotionFormComponent } from './components/promotion-form/promotion-form.component';
import { PromotionsComponent } from './promotions.component';

@NgModule({
  declarations: [
    PromotionViewComponent,
    PromotionEditComponent,
    PromotionNewComponent,
    PromotionListComponent,
    PromotionFormComponent,
    PromotionsComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    PromotionsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PromotionsModule {}
