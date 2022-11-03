import { CartEntry } from "../models/cart-entry";
import { ProductGroup } from "../models/product-group";
import { parseCartInput, splitForAmountNamePrice } from "./input-parser";

describe('input-parser', () => {
  describe('parses single-line', () => {
    it('case generic good', () => {
      const cartInput = '1 bottle of something at 123.45';

      const expected: CartEntry[] = [{ amount: 1, product: { productName: 'bottle of something', group: ProductGroup.GenericGood, unitPrice: 123.45 } }]
      const actual = parseCartInput(cartInput)

      expect(actual).toEqual(expected);
    })
  })
})

describe('splitForAmountNamePrice', () => {
  it('parses single-line', () => {
    const testCases = [
      {
        input: '1 bottle of something at 123.45',
        expected: { amount: 1, name: 'bottle of something', price: 123.45 },
      },
      {
        input: '1 bottle of something 543.12',
        expected: { amount: 1, name: 'bottle of something', price: 543.12 }
      }
    ]
    testCases.forEach(({ expected, input }) => {
      const actual = splitForAmountNamePrice(input);
      expect(actual).toEqual([expected]);
    })
  })
})