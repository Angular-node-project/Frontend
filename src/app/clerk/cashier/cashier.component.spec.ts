import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahierComponent } from './cashier.component';

describe('CahierComponent', () => {
  let component: CahierComponent;
  let fixture: ComponentFixture<CahierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CahierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CahierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
