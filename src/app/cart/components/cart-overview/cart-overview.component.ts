import { Component, Input } from '@angular/core';
import { parseCartOutput } from 'src/lib/output-parser/output-parser';
import { Cart } from '../../models';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent {
  cartOverview: string = '';

  private _cart: Cart | undefined;
  @Input()
  set cart(newCartData: Cart | undefined) {
    if (newCartData !== this._cart) {
      this._cart = newCartData;
      this.cartOverview = newCartData !== undefined ? parseCartOutput(newCartData) : '';
    }
  }
}
