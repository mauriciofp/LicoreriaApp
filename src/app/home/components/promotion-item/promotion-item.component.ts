import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.scss'],
})
export class PromotionItemComponent implements OnInit {
  @Input() promotion: string;

  constructor() {}

  ngOnInit() {}
}
