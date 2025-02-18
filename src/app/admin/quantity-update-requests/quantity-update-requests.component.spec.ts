import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityUpdateRequestsComponent } from './quantity-update-requests.component';

describe('QuantityUpdateRequestsComponent', () => {
  let component: QuantityUpdateRequestsComponent;
  let fixture: ComponentFixture<QuantityUpdateRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityUpdateRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityUpdateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
