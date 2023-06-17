import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionComponent } from './auction/auction.component';
import { FormsModule } from '@angular/forms';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
import { AuctionNavtabComponent } from './auction-navtab/auction-navtab.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';

@NgModule({
  declarations: [
    AuctionComponent,
    AuctionCreateComponent,
    AuctionNavtabComponent,
    AuctionDetailComponent
  ],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule
  ]
})
export class AuctionModule { }
