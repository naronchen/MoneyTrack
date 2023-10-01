import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSpendingComponent } from './recent-spending.component';

describe('RecentSpendingComponent', () => {
  let component: RecentSpendingComponent;
  let fixture: ComponentFixture<RecentSpendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentSpendingComponent]
    });
    fixture = TestBed.createComponent(RecentSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
