import { Component } from '@angular/core';
import { CartFacadeService } from '../facades/cart-facade.service';
import { Cart } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage {

  cart: Cart | undefined;

  constructor(private cartFacade: CartFacadeService) { }

  updateCart(cartInput: string) {
    this.cart = this.cartFacade.getCart(cartInput);
  }

}
