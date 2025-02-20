import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrdersComponent } from './branch-orders.component';

describe('BranchOrdersComponent', () => {
  let component: BranchOrdersComponent;
  let fixture: ComponentFixture<BranchOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
