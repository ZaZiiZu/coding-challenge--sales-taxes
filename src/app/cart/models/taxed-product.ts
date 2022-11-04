import { Product } from ".";

export interface TaxedProduct extends Product {
  importTaxAmount: number;
  saleTaxAmount: number;
}