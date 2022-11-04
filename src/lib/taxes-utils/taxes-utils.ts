import { Product } from "../models/product";
import { IMPORT_TAX, PRODUCT_TAX } from '../models/taxes';

export function calculateTaxAmounts(product: Product): { importTax: number, salesTax: number } {
  const salesTaxRatio = PRODUCT_TAX[product.group];
  const salesTaxAmount = salesTaxRatio * product.unitPrice;

  const importTaxAmount = product.isImported === true ? IMPORT_TAX * product.unitPrice : 0;

  return { importTax: importTaxAmount, salesTax: salesTaxAmount };
}