import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion';

@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.scss'],
})
export class PromotionItemComponent implements OnInit {
  @Input() promotion: Promotion;

  constructor() {}

  ngOnInit() {}
}
