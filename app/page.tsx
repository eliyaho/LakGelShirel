"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductList from "@/components/product-list";
import About from "@/components/about";
import Footer from "@/components/footer";
import NailPolishAuth from "@/components/nailPolishAuth";
import ShoppingCart from "@/components/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoginPageStatus,
  setShoppingsPageStatus,
} from "../components/redax/headerSlice";

export default function Page() {
  const dispatch = useDispatch();

  const loginPageStatus = useSelector(
    (state: any) => state.headers.loginPageStatus
  );
  const shoppingsPageStatus = useSelector(
    (state: any) => state.headers.shoppingsPageStatus
  );
  
  const closeAll = (name: string) => {
    if (name === "loginPageStatus") {
      dispatch(setLoginPageStatus(false));
    } else {
      dispatch(setShoppingsPageStatus(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Hero />
        <ProductList />
        <About />
      </main>

      <Footer />

      {loginPageStatus && (
        <div
          className="overlay"
          onClick={() => closeAll("loginPageStatus")}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <NailPolishAuth />
          </div>
        </div>
      )}

      {shoppingsPageStatus && (
        <div
          className="overlay"
          onClick={() => closeAll("ShoppingsPageStatus")}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ShoppingCart />
          </div>
        </div>
      )}
    </div>
  );
}
