import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { FilterPipe } from './filter.pipe';
import { FilterCategoriesPipe } from './filter-categories.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, FilterPipe, FilterCategoriesPipe],
  exports: [DomSanitizerPipe, FilterPipe, FilterCategoriesPipe],
  imports: [CommonModule],
})
export class PipesModule {}
