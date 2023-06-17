import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNavtabComponent } from './file-navtab.component';

describe('FileNavtabComponent', () => {
  let component: FileNavtabComponent;
  let fixture: ComponentFixture<FileNavtabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileNavtabComponent]
    });
    fixture = TestBed.createComponent(FileNavtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
