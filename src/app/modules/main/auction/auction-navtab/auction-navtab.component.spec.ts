import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionNavtabComponent } from './auction-navtab.component';

describe('AuctionNavtabComponent', () => {
  let component: AuctionNavtabComponent;
  let fixture: ComponentFixture<AuctionNavtabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionNavtabComponent]
    });
    fixture = TestBed.createComponent(AuctionNavtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
