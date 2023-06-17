import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentdetailComponent } from './article-commentdetail.component';

describe('ArticleCommentdetailComponent', () => {
  let component: ArticleCommentdetailComponent;
  let fixture: ComponentFixture<ArticleCommentdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCommentdetailComponent]
    });
    fixture = TestBed.createComponent(ArticleCommentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
