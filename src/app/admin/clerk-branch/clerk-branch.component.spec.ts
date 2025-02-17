import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkBranchComponent } from './clerk-branch.component';

describe('ClerkBranchComponent', () => {
  let component: ClerkBranchComponent;
  let fixture: ComponentFixture<ClerkBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClerkBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
