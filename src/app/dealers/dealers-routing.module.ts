import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersListComponent } from '../dealers-list/dealers-list.component';
import { NewDealerComponent } from './new-dealer/new-dealer.component';

const routes: Routes = [
  {
    path: 'new-dealer', component: NewDealerComponent
  },
  {
    path: 'list', component: DealersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersRoutingModule { }
