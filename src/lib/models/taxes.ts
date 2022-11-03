import { ProductGroup } from "./product-group";

export const IMPORT_TAX = 0.05;
export const PRODUCT_TAX: Readonly<{ [P in ProductGroup]: number }> = {
  Books: 0,
  Food: 0,
  Medical: 0,
  GenericGood: 0.1
}
