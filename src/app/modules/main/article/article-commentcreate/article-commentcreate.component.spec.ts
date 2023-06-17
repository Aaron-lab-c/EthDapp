import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentcreateComponent } from './article-commentcreate.component';

describe('ArticleCommentcreateComponent', () => {
  let component: ArticleCommentcreateComponent;
  let fixture: ComponentFixture<ArticleCommentcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCommentcreateComponent]
    });
    fixture = TestBed.createComponent(ArticleCommentcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
