import { getAllProducts, getProductsByCategory } from '../Pages/Api/Index';
import { Product } from '../Interfaces/Products.interface';
import { useEffect } from 'react';


import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

type GlobalContext = {
  productList: Product[];
  cart: Product[];
  isLoading: boolean;
  isDark: boolean;
  fetchbyCategory: (a: string) => void;
  addToCart: (a: Product) => void;
  removeFormCart: (a: Product) => void;

  fetch: () => void;
  toggleDark: () => void;
};
const ApplicationContext = createContext<GlobalContext>({
  productList: [],
  cart: [],
  isLoading: true, 
   isDark: false,

  fetchbyCategory: (a: string) => {},
  addToCart: (a: Product) => {},
  removeFormCart: (a: Product) => {},
  fetch: () => {},  toggleDark: () =>  {}

});
export const useAppContext = () => {
  const context = useContext(ApplicationContext);
  if (context) return context;
  throw new Error("Application context is not available");
};

export default function AppContext(props: { children: ReactElement }) {

  
  const [productList, setProductsList] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDark, setIsDark] = useState(false);


  function addToCart(newProduct: Product) {
    setCart([...cart, newProduct]);
  }
  function removeFormCart(newProduct: Product) {
    setCart(cart.filter((c) => c.id !== newProduct.id));
  }
  function toggleDark() {
    setIsDark(!isDark);
    console.log(isDark);
      if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  }
  function IsExists(newProduct: Product): boolean {
    return cart.some((c) => c.id === newProduct.id);
  }
  async function fetch() {
    setProductsList(
      await getAllProducts()
        .then((data) => data["products"])
        .finally(() => {
          setIsLoading(false);
        })
    );
  }
  async function fetchbyCategoryData(a: string) {
    setIsLoading(true);
    setProductsList(
      await getProductsByCategory(a)
        .then((data) => data["products"])
        .finally(() => {
          setIsLoading(false);
        })
    );
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        cart,isDark,
        addToCart,
        removeFormCart,
        toggleDark,
        fetchbyCategory: (a: string) => {
          fetchbyCategoryData(a);
        },
        isLoading,
        fetch,
        productList,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
}
