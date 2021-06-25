import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDealerComponent } from './new-dealer/new-dealer.component';

const routes: Routes = [
  {
    path: 'new-dealer', component: NewDealerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersRoutingModule { }
