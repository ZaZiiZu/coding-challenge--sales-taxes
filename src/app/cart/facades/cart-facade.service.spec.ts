import { TestBed } from '@angular/core/testing';
import { Cart, ProductGroup } from '../models';

import { CartFacadeService } from './cart-facade.service';

describe('CartFacadeService', () => {
  let service: CartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      ]
    });
    service = TestBed.inject(CartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCart', () => {
    describe('happy-flow', () => {
      it('works', () => {
        const cartInput = `1 imported bottle of perfume at 27.99
        1 bottle of perfume at 18.99
        1 packet of headache pills at 9.75
        1 box of imported chocolates at 11.25
        `;

        const expected: Cart = {
          cartValueTotal: 74.68,
          salesTaxTotal: 6.70,
          items: [
            { amount: 1, product: { group: ProductGroup.GenericGood, productName: 'bottle of perfume', unitPrice: 27.99, importTaxAmount: 1.3995, saleTaxAmount: 2.799, isImported: true } },
            { amount: 1, product: { group: ProductGroup.GenericGood, productName: 'bottle of perfume', unitPrice: 18.99, importTaxAmount: 0, saleTaxAmount: 1.899 } },
            { amount: 1, product: { group: ProductGroup.Medical, productName: 'packet of headache pills', unitPrice: 9.75, importTaxAmount: 0, saleTaxAmount: 0 } },
            { amount: 1, product: { group: ProductGroup.Food, productName: 'box of chocolates', unitPrice: 11.25, importTaxAmount: 0.5625, saleTaxAmount: 0, isImported: true } }
          ]
        }
        const actual = service.getCart(cartInput);
        expect(actual).toEqual(expected);
      })
    })
  })

});
