import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Category from "./components/Category";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { fetchProducts, getCategories } from "./services/data";
import { Product as ProductModel } from "./models/Product";
import { useLocation } from "react-router-dom";

function App() {
  const [categorys, setCategory] = useState<string[]>([]);
  const [products, setProduct] = useState<ProductModel[]>([]);
  const [sort, setSort] = useState<"high" | "low">("high");
  const [search, setSearch] = useState<string>("");
  const [category, setCategoryFilter] = useState<null | string>(null);
  useLocation;

  useEffect(() => {
    fetchProducts(category, null, sort).then((products) => {
      setProduct(products);
    });
  }, [sort, category]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategory(categories);
    });
  }, []);

  const searchingProducts = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setCategoryFilter(null);
      fetchProducts(category, search, sort).then((products) => {
        setProduct(products);
      });
    }
  };

  return (
    <>
      <div className="flex max-h-max w-full">
        <div className="flex flex-col h-[100vh] w-full">
          <NavBar />
          <div className="flex flex-col md:flex-row w-full h-full">
            <div className="md:flex-none w-[250px] bg-gray-200">
              <br />
              <Category
                categorys={categorys} category={category}
                setCategoryFilter={setCategoryFilter}
              />
            </div>
            <div className="md:flex-1 w-full h-screen p-6">
              <div className="search flex w-full h-[50px]">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-[rgb(209,213,219)] rounded-lg text-black placeholder:text-black"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => searchingProducts(e)}
                />
              </div>
              {products?.length > 0 ? (
                <div className="flex w-full justify-end mt-4">
                  <span
                    className="hover:text-gray-500 cursor-pointer"
                    onClick={() => setSort(sort == "high" ? "low" : "high")}
                  >
                    Sort price to {`${sort == "high" ? "low" : "high"}`}
                  </span>
                </div>
              ) : null}

              <div
                className="product_lists flex flex-col items-center justify-start w-full 
              max-h-[75%] mt-8 space-y-4 overflow-y-auto"
              >
                {products?.length > 0
                  ? products.map((product) => {
                      return <Product product={product} key={product.id} />;
                    })
                  : null}
              </div>
            </div>
            <div className="md:flex-none w-[450px] h-full bg-gray-100">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
