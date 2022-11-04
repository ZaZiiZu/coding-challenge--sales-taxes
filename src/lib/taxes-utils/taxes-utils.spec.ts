import { Product } from "../models/product"
import { ProductGroup } from "../models/product-group"
import { calculateTaxAmounts, roundTaxes } from "./taxes-utils"

describe('calculateTaxAmounts', () => {
  it('works', () => {
    const testCases: { product: Product, expected: ReturnType<typeof calculateTaxAmounts> }[] = [
      { product: { productName: 'irrelevant', group: ProductGroup.Books, unitPrice: 100, isImported: true }, expected: { importTax: 5, salesTax: 0 } },
      { product: { productName: 'irrelevant', group: ProductGroup.Books, unitPrice: 100, isImported: false }, expected: { importTax: 0, salesTax: 0 } },
      { product: { productName: 'irrelevant', group: ProductGroup.Medical, unitPrice: 200, isImported: true }, expected: { importTax: 10, salesTax: 0 } },
      { product: { productName: 'irrelevant', group: ProductGroup.Medical, unitPrice: 200, isImported: false }, expected: { importTax: 0, salesTax: 0 } },
      { product: { productName: 'irrelevant', group: ProductGroup.GenericGood, unitPrice: 300, isImported: true }, expected: { importTax: 15, salesTax: 30 } },
      { product: { productName: 'irrelevant', group: ProductGroup.GenericGood, unitPrice: 300, isImported: false }, expected: { importTax: 0, salesTax: 30 } },
      { product: { productName: 'irrelevant', group: ProductGroup.Food, unitPrice: 400, isImported: true }, expected: { importTax: 20, salesTax: 0 } },
      { product: { productName: 'irrelevant', group: ProductGroup.Food, unitPrice: 400, isImported: false }, expected: { importTax: 0, salesTax: 0 } },
    ];

    testCases.forEach(({ expected, product }) => {
      const actual = calculateTaxAmounts(product);
      expect(actual).toEqual(expected);
    })
  })
})

describe('roundTaxes', () => {
  it('works', () => {
    const testCases: { input: Parameters<typeof roundTaxes>, expected: number }[] = [
      { input: [0.21], expected: 0.25 },
      { input: [0.86], expected: 0.90 },
      { input: [123.4482], expected: 123.45 },
    ];
    testCases.forEach(({ input, expected }) => {
      const actual = roundTaxes(...input);
      expect(actual).toEqual(expected);
    })
  })
})