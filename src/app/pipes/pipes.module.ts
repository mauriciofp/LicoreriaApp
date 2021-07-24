import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, FilterPipe],
  exports: [DomSanitizerPipe, FilterPipe],
  imports: [CommonModule],
})
export class PipesModule {}
