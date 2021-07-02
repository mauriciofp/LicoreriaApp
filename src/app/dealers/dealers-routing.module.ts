import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersListComponent } from '../dealers-list/dealers-list.component';
import { DealerDetailComponent } from './dealer-detail/dealer-detail.component';
import { DealerEditComponent } from './dealer-edit/dealer-edit.component';
import { NewDealerComponent } from './new-dealer/new-dealer.component';

const routes: Routes = [
  {
    path: 'new-dealer', component: NewDealerComponent
  },
  {
    path: 'list', component: DealersListComponent
  },
  {
    path: ':id', component: DealerDetailComponent
  },
  {
    path: 'edit/:id', component: DealerEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersRoutingModule { }
