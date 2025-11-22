'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { CartContextType } from "../models/cart-context.model";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const findProduct = cartItems.find(item => item.id === product.id);
            if (findProduct) {
                return prev.map(item => {
                    if (item.id === findProduct.id) {
                        return { ...item, count: item.count + 1 }
                    } else { return item }
                })
            } else {
                return [...prev, { ...product, count: 1 }]
            }
        })
    }

    const deleteCartItem = (product: Product) => {
        setCartItems(prev => {
            const findProduct = cartItems.find(item => item.id === product.id);

            if (findProduct) {
                if (findProduct.count > 1) {
                    return prev.map(item => {
                        if (item.id === findProduct.id) {
                            return { ...item, count: item.count - 1 }
                        } else {
                            return item
                        }
                    })
                } else {
                    return prev.filter(item => item.id !== product.id)
                }
            } else {
                return prev
            }
        })
    }

    return (
        <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cartItems, deleteCartItem}}>
            {children}
        </CartContext.Provider>
    )
}