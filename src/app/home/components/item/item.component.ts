import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit() {}
}
