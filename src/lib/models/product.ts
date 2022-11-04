import { ProductGroup } from "./product-group";

export interface Product {
  productName: string;
  unitPrice: number;
  group: ProductGroup;
  isImported?: boolean;
}