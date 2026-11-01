"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "./api";
import { Product, ProductVariant, User } from "@/types";

export interface CartItemModel {
  cartItemId: string;
  productId: number;
  variantId?: number | null;
  title: string;
  slug: string;
  price: number;
  image?: string;
  size: string;
  color: string;
  quantity: number;
}

export interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface StoreContextType {
  // Cart
  cart: CartItemModel[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  // Auth
  user: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: "login" | "register";
  setAuthMode: (mode: "login" | "register") => void;
  loginUser: (userData: User, accessToken: string, refreshToken?: string) => void;
  logoutUser: () => void;
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Cart State
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("void_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("void_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const token = localStorage.getItem("void_access_token");
      if (token) {
        api.getCurrentUser().then((res: any) => {
          if (res?.success && res?.data?.user) {
            setUser(res.data.user);
          }
        });
      }
    } catch (e) {
      console.warn("Storage hydration error:", e);
    }
  }, []);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("void_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Error saving cart:", e);
    }
  }, [cart]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("void_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Error saving wishlist:", e);
    }
  }, [wishlist]);

  // Toast dispatch
  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Cart actions
  const addToCart = (product: Product, variant: ProductVariant | null = null, quantity: number = 1) => {
    const selectedSize = variant?.size || product.sizes?.[0] || "Standard";
    const selectedColor = variant?.color_name || product.colors?.[0]?.name || "Default";
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            variantId: variant?.id || null,
            title: product.title,
            slug: product.slug,
            price: variant?.price_override || product.price,
            image: product.primary_image || (product.images?.[0] as any)?.url || (product.images?.[0] as any)?.image_url,
            size: selectedSize,
            color: selectedColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.title}" to your cart.`, "success");
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast("Item removed from cart.", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist actions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from wishlist.`, "info");
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.title}" to wishlist.`, "success");
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId: number) => wishlist.some((p) => p.id === productId);

  // Auth actions
  const loginUser = (userData: User, accessToken: string, refreshToken?: string) => {
    setUser(userData);
    localStorage.setItem("void_access_token", accessToken);
    if (refreshToken) localStorage.setItem("void_refresh_token", refreshToken);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.full_name || userData.email}.`, "success");
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("void_access_token");
    localStorage.removeItem("void_refresh_token");
    showToast("You have been signed out.", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        // Cart
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,
        // Auth
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        loginUser,
        logoutUser,
        // Search
        isSearchOpen,
        setIsSearchOpen,
        // Toasts
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
