import { Product } from "../models/Product";

export const formatProduct = (product: Product): Product => {
    return {
        id: product.id as string,
        productName: product.productName as string,
        description: product.description as string,
        unitPrice: product.unitPrice as number,
        imageUrl: product.imageUrl as string,
        category: product.category as string,
      };
}