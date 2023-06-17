import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavtabComponent } from './profile-navtab.component';

describe('ProfileNavtabComponent', () => {
  let component: ProfileNavtabComponent;
  let fixture: ComponentFixture<ProfileNavtabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNavtabComponent]
    });
    fixture = TestBed.createComponent(ProfileNavtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
