import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSetComponent } from './profile-set/profile-set.component';

const routes: Routes = [
  { path: '', component: ProfileComponent},
  { path: 'profileset', component: ProfileSetComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule implements OnInit{
  ngOnInit(): void {
  }

  constructor(){
    
  }

}