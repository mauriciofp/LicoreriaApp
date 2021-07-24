import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.scss'],
})
export class PromotionViewComponent implements OnInit, OnDestroy {
  promotion: Promotion;

  promotionSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionService
  ) {}

  ngOnInit() {
    this.promotionSubs = this.route.params
      .pipe(switchMap(({ id }) => this.promotionService.getOne(id)))
      .subscribe((promotion) => (this.promotion = promotion));
  }

  ngOnDestroy() {
    this.promotionSubs?.unsubscribe();
  }
}
