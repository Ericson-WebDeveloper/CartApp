// import React from "react";
import { Product as ProductModel } from "../models/Product";
import { cartStore } from "../store/cart";

type ProductProps = {
  product: ProductModel
}

const Product = ({product}: ProductProps) => {
  const {addCart} = cartStore();
  return (
    <div className="flex w-full h-fit bg-gray-300 p-4 px-6 space-x-5">
      <div className="img flex w-1/5 min-h-[100px]">
        <img
          src={product.imageUrl}
          className="h-full w-full "
          alt=""
        />
      </div>
      <div className="product_description flex flex-col w-full h-fit">
        <h1 className="text-2xl font-semibold font-sans">{product.productName}</h1>
        <span className="text-green-600">{product.category}</span>
        <p>
          {product.description}
        </p>
      </div>
      <div className="flex flex-col w-1/4 justify-between">
        <h1 className="text-red-500 text-2xl">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(product.unitPrice)}</h1>
        <button type="button" className="p-2 bg-green-400 text-white hover:bg-green-500" onClick={() => addCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
