import { TaxedCartEntry } from "./taxed-cart-entry";

export interface Cart {
  items: TaxedCartEntry[];
  salesTaxTotal: number;
  cartValueTotal: number;
}