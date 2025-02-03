import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductsComponent } from './seller-products.component';

describe('SellerProductsComponent', () => {
  let component: SellerProductsComponent;
  let fixture: ComponentFixture<SellerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
