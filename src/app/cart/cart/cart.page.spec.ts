import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartInputComponent } from '../components/cart-input/cart-input.component';
import { CartOverviewComponent } from '../components/cart-overview/cart-overview.component';

import { CartPage } from './cart.page';
import { CartTestingModule } from './testing/cart.module.testing';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTestingModule],
      declarations: [CartPage, CartOverviewComponent, CartInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
