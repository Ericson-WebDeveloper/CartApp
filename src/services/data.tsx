// import datas from "../data/items.json";
import { formatProduct } from "../helper/filter";
import { Product } from "../models/Product";

export const getCategories = async (): Promise<string[]> => {
  const categories: string[] = [];
  try {
    const response = await fetch("items.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const products = await response.json();
    products.forEach((product: Product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  } catch (error) {
    return [];
  }
};

export const fetchProducts = async (
  category: string | null,
  search: string | null,
  sort: "high" | "low" = "high"
): Promise<Product[] | []> => {
  try {
    const response = await fetch("items.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const products = await response.json();
    const newProducts: Product[] = products
      .sort((a: Product, b: Product) =>
        sort == "high" ? b.unitPrice - a.unitPrice : a.unitPrice - b.unitPrice
      )
      .filter((product: Product) => {
        if (search && search != "") {
          if (
            product.productName.match(search) ||
            product.category.match(search)
          ) {
            return formatProduct(product);
          }
        } else if (category && category != "All") {
          if (product.category.includes(category)) {
            return formatProduct(product);
          }
        } else {
          return formatProduct(product);
        }
      });
    return newProducts ? newProducts : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
