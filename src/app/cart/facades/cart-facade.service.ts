import { Injectable } from '@angular/core';
import { LoggerService } from 'src/app/common/logger.service';
import { parseCartInput } from 'src/lib/input-parser/input-parser';
import { calculateTaxAmounts, roundNumber, roundTaxes } from 'src/lib/taxes-utils/taxes-utils';
import { Cart, TaxedProduct } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  constructor(private loggerService: LoggerService) { }

  public getCart(input: string): Cart {
    let cart: Cart = {
      items: [],
      salesTaxTotal: 0,
      cartValueTotal: 0
    }

    const cartEntries = parseCartInput(input);
    cartEntries.forEach(cartEntry => {
      const productTaxes = calculateTaxAmounts(cartEntry.product);
      const taxedProduct: TaxedProduct = {
        ...cartEntry.product,
        importTaxAmount: productTaxes.importTax,
        saleTaxAmount: productTaxes.salesTax
      };
      const cartEntryImportTax = cartEntry.amount * productTaxes.importTax;
      const cartEntrySalesTax = cartEntry.amount * productTaxes.salesTax;
      const cartEntryTaxTotal = roundTaxes(cartEntryImportTax + cartEntrySalesTax);
      const cartEntryValue = cartEntry.amount * cartEntry.product.unitPrice;

      cart.items.push({ amount: cartEntry.amount, product: taxedProduct });
      cart.salesTaxTotal = roundNumber(cart.salesTaxTotal + cartEntryTaxTotal, 2);
      cart.cartValueTotal = roundNumber(cart.cartValueTotal + cartEntryValue + cartEntryTaxTotal, 2);
    })
    this.loggerService.log('Successfully parsed cart', { input, cart })
    return cart;
  }

}
