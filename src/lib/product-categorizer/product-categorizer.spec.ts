import { ProductGroup } from "../models/product-group";
import { categorizeProduct } from "./product-categorizer";

describe('categorizeProduct', () => {
  describe('case book', () => {
    it('recognizes literal "book"', () => {
      const testCases = [
        "some book named 'regex101'",
        "book with pages",
        "imported cook book",
      ]

      testCases.forEach((testCaseProductName) => {
        const expected = ProductGroup.Books;
        const actual = categorizeProduct(testCaseProductName);
        expect(actual).toBe(expected);
      })
    })

    it('categorizes book-case as book', () => {
      const productName = "book-case"; // in case anyone complains about bad matching: "works as designed"

      expect(categorizeProduct(productName)).toBe(ProductGroup.Books);
    })
  })

  describe('case medical', () => {
    it('recognizes "pills" as medical', () => {
      const testCases = [
        "some unit of problem-solving pills",
        "pills against headache",
        "stomache fixing pills"
      ]

      testCases.forEach((testCaseProductName) => {
        const expected = ProductGroup.Medical;
        const actual = categorizeProduct(testCaseProductName);
        expect(actual).toBe(expected);
      })
    })
  })

  describe('case food', () => {
    it('recognizes "chocolate" as food', () => {
      const testCases = [
        "one plate of chocolate",
        "chocolate santa",
        "white chocolate with filling"
      ]

      testCases.forEach((testCaseProductName) => {
        const expected = ProductGroup.Food;
        const actual = categorizeProduct(testCaseProductName);
        expect(actual).toBe(expected);
      })
    })
  })

  describe('fallbacks to GenericProduct', () => {
    it('correctly', () => {
      const testCases: [string, ProductGroup][] = [
        ["some chocolate", ProductGroup.Food],
        ["uncategorizable product", ProductGroup.GenericGood],
        ["mix of pills", ProductGroup.Medical],
        ["a bundle of books", ProductGroup.Books],
        ["a bundle of misspelled boooks", ProductGroup.GenericGood],
      ]

      testCases.forEach(([productName, expectedGroup]) => {
        expect(categorizeProduct(productName)).toBe(expectedGroup);
      })
    })
  })
})