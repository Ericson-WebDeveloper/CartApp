import { Product } from "./Product";


export interface Cart {
    product: Product,
    qty: number,
    totalPrice: number,
    id: string
}