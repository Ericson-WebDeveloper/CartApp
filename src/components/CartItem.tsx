// import React from "react";
import { Cart } from "../models/Cart";
import { cartStore } from "../store/cart";

type CartItemProps = {
  cart: Cart;
};
// props: Props
const CartItem = ({ cart }: CartItemProps) => {
  const { addCart, removeCart, deleteCart } = cartStore();
  return (
    <div className="flex w-full h-[75px] ">
      <div className="flex product_img w-[100px] h-full relative ">
        <div className="flex w-full h-full px-4">
          <img src={cart?.product.imageUrl} alt="" className="w-full h-full" />
        </div>
        <span onClick={() => deleteCart(cart?.product)} className="rounded-full bg-red-500 text-white h-[24px] w-5 text-center absolute cursor-pointer hover:bg-red-400">
          x
        </span>
      </div>
      <div className="product_desc flex flex-col w-full h-full py-1 justify-between">
        <span>{cart?.product.productName}</span>
        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(cart.totalPrice)}</span>
      </div>
      <div className="product_desc flex w-[120px] h-full">
        <div className="flex h-[24px] w-full mt-auto">
          <span
            className="font-semibold text-center items-center cursor-pointer h-full border-2 w-full bg-gray-200"
            onClick={() => removeCart(cart?.product)}
          >
            -
          </span>
          <input
            type="text"
            readOnly
            value={cart?.qty}
            className=" focus:outline-none bg-white h-full border w-6 rounded text-sm px-2"
          />
          <span
            className="font-semibold text-center items-center cursor-pointer h-full border-2 w-full bg-gray-200"
            onClick={() => addCart(cart?.product)}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
