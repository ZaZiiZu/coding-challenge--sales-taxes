import { CartEntry } from ".";
import { TaxedProduct } from "./taxed-product";


export interface TaxedCartEntry extends CartEntry {
  product: TaxedProduct;
}
