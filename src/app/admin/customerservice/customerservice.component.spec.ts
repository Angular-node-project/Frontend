import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerserviceComponent } from './customerservice.component';

describe('CustomerserviceComponent', () => {
  let component: CustomerserviceComponent;
  let fixture: ComponentFixture<CustomerserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
