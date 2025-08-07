import React, { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  search: "",
  barcode: "",
  category: "",
  sort: "",
  hasMore: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCTS":
      return { ...state, products: [...state.products, ...action.payload] };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_BARCODE":
      return { ...state, barcode: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext); 