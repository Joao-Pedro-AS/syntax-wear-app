import { useState } from "react";
import type { Product } from "../../interfaces/product";
import { CartContext } from "./CartContext";

interface CartProviderProps {
    children: React.ReactNode;
}

export interface ProductCart extends Product {
    quantity: number;
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [cart, setCart] = useState<ProductCart[]>([]);

    function add(product: Product): void {

        const productExistsInCart = cart.find(itemIncart => itemIncart.id === product.id);

        let newCart;

        if (productExistsInCart) {
            newCart = cart.map(itemIncart =>
                itemIncart.id === product.id ?
                    { ...itemIncart, quantity: itemIncart.quantity + 1 }
                    : itemIncart
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(newCart);
    }

    function remove(productId: number): void {

        setCart(cart.filter(itemInCart => itemInCart.id !== productId));
    }

    function increment(product: ProductCart): void {
        updateProductQuantity(product, product.quantity + 1)
    }

    function decrement(product: ProductCart): void {
        updateProductQuantity(product, product.quantity - 1)
    }

    function updateProductQuantity(product: ProductCart, newQuantity: number): void {
        if (newQuantity <= 0) return

        const productExistsInCart = cart.find(itemIncart => itemIncart.id === product.id);

        if (!productExistsInCart) return;

        const newCart = cart.map(itemIncart =>
            itemIncart.id === product.id
                ? { ...itemIncart, quantity: newQuantity }
                : itemIncart
        );

        setCart(newCart)
    }

    return <CartContext.Provider value={{
        cart,
        add,
        remove,
        decrement,
        increment,
    }}>
        {children}
    </CartContext.Provider>;
};