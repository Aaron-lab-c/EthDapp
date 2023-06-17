import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-commentdetail',
  templateUrl: './article-commentdetail.component.html',
  styleUrls: ['./article-commentdetail.component.css']
})
export class ArticleCommentdetailComponent implements OnInit {
  ngOnInit(): void {}
  constructor(){

  }

  @Input()
  public comment!:any;
}
