import { Product } from "./product"

export interface CartEntry {
  product: Product,
  amount: number
}