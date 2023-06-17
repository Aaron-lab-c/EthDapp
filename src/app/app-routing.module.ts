import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/main/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./modules/main/transaction/transaction.module').then(mod => mod.TransactionModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/main/about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./modules/main/article/article.module').then(mod => mod.ArticleModule)
  },
  {
    path: 'auction',
    loadChildren: () => import('./modules/main/auction/auction.module').then(mod => mod.AuctionModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/main/profile/profile.module').then(mod => mod.ProfileModule)
  },
  {
    path: 'file',
    loadChildren: () => import('./modules/main/file/file.module').then(mod => mod.FileModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
