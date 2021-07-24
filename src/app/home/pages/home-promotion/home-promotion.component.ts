import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-home-promotion',
  templateUrl: './home-promotion.component.html',
  styleUrls: ['./home-promotion.component.scss'],
})
export class HomePromotionComponent implements OnInit {
  promotion: Promotion;
  promotionSubs: Subscription;

  cant: number;
  cantSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.promotionSubs = this.route.params
      .pipe(switchMap(({ id }) => this.promotionService.getOne(id)))
      .subscribe((promotion) => (this.promotion = promotion));
    this.cantSubs = this.store
      .select('cart')
      .subscribe(({ cant }) => (this.cant = cant));
  }

  ngOnDestroy() {
    this.promotionSubs?.unsubscribe();
    this.cantSubs?.unsubscribe();
  }
}
