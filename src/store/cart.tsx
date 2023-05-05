import { create } from "zustand";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

interface CartInterface {
  carts: Cart[];
  totalQtys: () => number;
  totalPrices: () => number;
  addCart: (product: Product) => void;
  removeCart: (product: Product) => void;
  deleteCart: (product: Product) => void;
  resetCart: () => void;
}

export const cartStore = create<CartInterface>((set, get) => ({
  carts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
  addCart: (product: Product) => {
    const cartsState = get().carts;
    const exists = cartsState.find((cart) => cart.id == product.id);
    if (exists) {
      const newCarts = cartsState.map((cart) => {
        if (product.id == cart.id) {
          const newQty = (cart.qty += 1);
          return {
            ...cart,
            qty: newQty,
            totalPrice: newQty * cart.product.unitPrice,
          };
        } else {
          return cart;
        }
      });
      localStorage.setItem("cart", JSON.stringify(newCarts));
      set({ carts: newCarts });
    } else {
      const newCarts = [
        ...cartsState,
        {
          id: product.id,
          product: product,
          qty: 1,
          totalPrice: product.unitPrice,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newCarts));
      set({ carts: newCarts });
    }
  },
  removeCart: (product: Product) => {
    const cartsState = get().carts;
    const exists = cartsState.find((cart) => cart.id == product.id);
    if (exists) {
      if (exists.qty == 1) {
        const newCarts = cartsState.filter((cart) => cart.id != product.id);
        localStorage.setItem("cart", JSON.stringify(newCarts));
        set({ carts: newCarts });
      } else {
        const newCarts = cartsState.map((cart) => {
          if (exists.id == cart.id) {
            const newQty = cart.qty - 1;
            return {
              ...cart,
              qty: newQty,
              totalPrice: newQty * cart.product.unitPrice,
            };
          } else {
            return cart;
          }
        });
        localStorage.setItem("cart", JSON.stringify(newCarts));
        set({ carts: newCarts });
      }
    }
  },
  deleteCart: (product: Product) => {
    const cartsState = get().carts;
    const exists = cartsState.find((cart) => cart.id == product.id);
    if (exists) {
      const newCarts = cartsState.filter((cart) => cart.id != product.id);
      localStorage.setItem("cart", JSON.stringify(newCarts));
      set({ carts: newCarts });
    }
  },
  resetCart: () => {
    localStorage.removeItem("cart");
    set({ carts: [] });
  },
  totalQtys: (): number => {
    const cartsState = get().carts;
    // return cartsState.length;
    return cartsState.reduce((total, cart) => {
      return total + cart.qty;
    }, 0  )
  },
  totalPrices: (): number => {
    const cartsState = get().carts;
    const total = cartsState.reduce((total, cart) => {
      return total + cart.totalPrice;
    }, 0);
    return parseFloat(total.toFixed(2));
  },
}));
