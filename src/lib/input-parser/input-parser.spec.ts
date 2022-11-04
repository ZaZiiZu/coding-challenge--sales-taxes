import { CartEntry } from "../models/cart-entry";
import { ProductGroup } from "../models/product-group";
import { checkIfImported, parseCartInput, splitForAmountNamePrice } from "./input-parser";

describe('parseCartInput', () => {
  describe('parses single-line', () => {
    it('case generic good', () => {
      const cartInput = '1 bottle of something at 123.45';

      const expected: CartEntry[] = [{ amount: 1, product: { productName: 'bottle of something', group: ProductGroup.GenericGood, unitPrice: 123.45 } }]
      const actual = parseCartInput(cartInput)

      expect(actual).toEqual(expected);
    })
  })

  describe('parses multi-line', () => {
    it('case several potentially different goods including some imported', () => {
      const cartInput = `
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25
      `;
      const expected: CartEntry[] = [
        { amount: 1, product: { group: ProductGroup.GenericGood, productName: 'bottle of perfume', unitPrice: 27.99, isImported: true } },
        { amount: 1, product: { group: ProductGroup.GenericGood, productName: 'bottle of perfume', unitPrice: 18.99 } },
        { amount: 1, product: { group: ProductGroup.Medical, productName: 'packet of headache pills', unitPrice: 9.75 } },
        { amount: 1, product: { group: ProductGroup.Food, productName: 'box of chocolates', unitPrice: 11.25, isImported: true } },
      ];

      const actual = parseCartInput(cartInput);
      expect(actual).toEqual(expected);
    })
  })
})

describe('splitForAmountNamePrice', () => {
  it('parses single-line', () => {
    const testCases: { input: string, expected: ReturnType<typeof splitForAmountNamePrice> }[] = [
      {
        input: '1 bottle of something at 123.45',
        expected: [{ amount: 1, name: 'bottle of something', price: 123.45 }],
      },
      {
        input: '1 bottle of something 543.12',
        expected: [{ amount: 1, name: 'bottle of something', price: 543.12 }]
      }
    ]
    testCases.forEach(({ expected, input }) => {
      const actual = splitForAmountNamePrice(input);
      expect(actual).toEqual(expected);
    })
  })
})

describe('checkIfImported', () => {
  it('case productName starts with "imported"', () => {
    const testCases: { input: string, expected: ReturnType<typeof checkIfImported> }[] = [
      {
        input: '   imported box of chocolates',
        expected: { actualProductName: 'box of chocolates', isImported: true }
      },
      {
        input: 'bottle of perfume',
        expected: { actualProductName: 'bottle of perfume', isImported: false }
      }
    ]
    testCases.forEach(({ input, expected }) => {
      const actual = checkIfImported(input);
      expect(actual).toEqual(expected);
    })
  })
  it('case productName includes "imported" somewhere in the middle', () => {
    const input = 'box of imported chocolates';
    const expected: ReturnType<typeof checkIfImported> = { isImported: true, actualProductName: 'box of chocolates' };

    const actual = checkIfImported(input);
    expect(actual).toEqual(expected);
  })
})