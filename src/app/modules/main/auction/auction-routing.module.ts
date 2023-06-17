import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './auction/auction.component';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
const routes: Routes = [
  { path: '', component: AuctionComponent },
  { path: 'create', component: AuctionCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
