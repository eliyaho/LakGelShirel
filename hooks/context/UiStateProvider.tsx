"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUiApi } from "../useUiApi"; // או איפה שיש את ה-hook API שלך

// סוגים של ה-State
type UiStateType = {
  ShopingOpen: boolean;
  authOpen: boolean;
  isRegister: boolean;
  openCap: boolean;
  setShopingOpen: (val: boolean) => void;
  setAuthOpen: (val: boolean) => void;
  setIsRegister: (val: boolean) => void;
  setOpenCap: (val: boolean) => void;
  closeAuth: () => void;
};

export const UiContext = createContext<UiStateType | null>(null);

export const UiStateProvider = ({ children }: { children: React.ReactNode }) => {
  const api = useUiApi();

  const [ShopingOpen, setShopingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [openCap, setOpenCap] = useState(false);

  // useEffect(() => {
  //   api.get().then((data) => setAuthOpen(Boolean(data.open)));
  // }, []);

  const closeAuth = async () => {
    setAuthOpen(false);
    await api.set(false);
  };

  return (
    <UiContext.Provider
      value={{
        ShopingOpen,
        setShopingOpen,
        authOpen,
        isRegister,
        openCap,
        setAuthOpen,
        setIsRegister,
        setOpenCap,
        closeAuth,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

// ✅ ה-Hook שמחזיר את הקונטקסט
export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUiContext must be used inside UiStateProvider");
  return context;
};
