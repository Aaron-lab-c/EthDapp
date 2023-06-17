import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleNavtabComponent } from './article-navtab/article-navtab.component';
import { FormsModule } from '@angular/forms';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCommentcreateComponent } from './article-commentcreate/article-commentcreate.component';
import { ArticleCommentdetailComponent } from './article-commentdetail/article-commentdetail.component';


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleCreateComponent,
    ArticleNavtabComponent,
    ArticleDetailComponent,
    ArticleCommentcreateComponent,
    ArticleCommentdetailComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule
  ]
})
export class ArticleModule { }
