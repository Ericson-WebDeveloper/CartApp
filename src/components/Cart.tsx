// import React from "react";
import CartItem from "./CartItem";
import { cartStore } from "../store/cart";
import Swal from "sweetalert2";

// type Props = {}
// props: Props
const Cart = () => {
  const { totalPrices, totalQtys, carts, resetCart } = cartStore();

  const checkOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want checkout now!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Checkout Complete!", "Thank you for purchasing", "success");
        resetCart();
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="cart_header flex-none h-[100px] w-full bg-gray-300">
        <div className="flex w-full h-full justify-between">
          <div className="flex basis-3/5 items-center ml-12">
            <h1 className="text-3xl">My Cart</h1>
          </div>

          <div className="flex basis-2/5 items-end mb-3 mr-3 justify-end">
            {carts?.length > 0 ? (
              <button
                type="button"
                onClick={resetCart}
                className="py-1 px-5 rounded-lg bg-red-700 hover:bg-red-500 text-white"
              >
                Clear Cart
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="cart_items flex-grow h-auto ">
        <div className="flex flex-col w-full max-h-[550px] px-12 py-6 overflow-y-auto space-y-4">
          {carts?.map((cart) => {
            return (
              <span key={cart.id} >
                <CartItem cart={cart} />
                <hr />
              </span>
            );
          })}
        </div>
      </div>
      <div className="cart_footer flex-none h-[170px] bg-gray-300 mb-[65px]">
        <div className="flex flex-col w-full px-12 py-6 ">
          <div className="flex w-full items-center justify-between">
            <h3>Total Items</h3>
            <h3>{totalQtys()}</h3>
          </div>
          <div className="flex w-full items-center justify-between">
            <h3>Total Amount</h3>
            <h3 className="text-3xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PHP",
              }).format(totalPrices())}
            </h3>
          </div>
          <br />
          {totalQtys() > 0 ? (
            <div className="footer_cart_footer flex w-full justify-center">
              <button
                type="button"
                className="bg-green-300 py-2 w-full"
                onClick={checkOut}
              >
                Check Out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
