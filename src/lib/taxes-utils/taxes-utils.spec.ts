import { Product } from "../models/product"
import { ProductGroup } from "../models/product-group"
import { calculateTaxAmounts } from "./taxes-utils"

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