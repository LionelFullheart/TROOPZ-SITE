"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("troopz-cart");

    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch {
        setItems([]);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem("troopz-cart", JSON.stringify(items));
  }, [items, isHydrated]);

  const value = useMemo(() => {
    function addItem(item) {
      setItems((currentItems) => {
        const existingIndex = currentItems.findIndex(
          (currentItem) => currentItem.slug === item.slug && currentItem.size === item.size
        );

        if (existingIndex === -1) {
          return [...currentItems, item];
        }

        return currentItems.map((currentItem, index) =>
          index === existingIndex
            ? {
                ...currentItem,
                quantity: currentItem.quantity + item.quantity,
              }
            : currentItem
        );
      });
    }

    function updateQuantity(slug, size, quantity) {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.slug === slug && item.size === size
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    }

    function removeItem(slug, size) {
      setItems((currentItems) =>
        currentItems.filter((item) => !(item.slug === slug && item.size === size))
      );
    }

    function clearCart() {
      setItems([]);
    }

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
