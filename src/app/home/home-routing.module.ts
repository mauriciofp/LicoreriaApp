import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CategoryComponent } from './pages/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':category',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
