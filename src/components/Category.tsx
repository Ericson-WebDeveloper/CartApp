import React from "react";
// import { useLocation, useSearchParams } from "react-router-dom";

type CategoryProps = {
  categorys: string[];
  category: null|string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

const Category = ({ categorys, setCategoryFilter, category: catfilter}: CategoryProps) => {
  // const [query, setQuery] = useLocation();
  // const urlParams = new URLSearchParams(window.location.search);
  return (
    <>
      <ul className="relative">
        <li className="relative">
          <span onClick={() => setCategoryFilter('All')}
            className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis
                 whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer 
                 ${catfilter == "All" ? "text-gray-900 bg-gray-50" : ""}`}
          >
            <span className="text-xl" >All Category</span>
          </span>
        </li>
        {categorys?.length > 0 ? (
          categorys.map((category, index) => {
            return (
              <li className="relative" key={index}>
                <span onClick={() => setCategoryFilter(category)}
                  className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis
                  whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer 
                  ${category == catfilter ? "text-gray-900 bg-gray-50" : ""}`}
                >
                  <span className="text-xl" >{category}</span>
                </span>
              </li>
            );
          })
        ) : (
          <li className="relative">
            <span
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis
                 whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
            >
              <span className="text-xl">No Categories Found</span>
            </span>
          </li>
        )}
      </ul>
    </>
  );
};

export default Category;
