import { useGetProducts } from "@/features/use-products";
import { Product } from "@/types";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductContextType {
    products: Product[];
    currency: string;
    deliveryCost: number;
    search: string;
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    addToCart: (itemId: string, size: string) => void;
    cartItems: CartItems;
    getCartCount: () => number;
    // addProduct: (product: Product) => void;
    // deleteProduct: (id: string) => void;
    // updateProduct: (id: string, product: Product) => void;
}
export interface CartItems {
    [itemId: string]: {
        [size: string]: number;
    };
}
export const productProvider = createContext<ProductContextType | null>(null);
export function ProductProvider({ children }: { children: React.ReactNode }) {
    const {products , error: fetchError, isLoading: fetchLoading } = useGetProducts();
    const currency = "€"; 
    const deliveryCost = 5;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState<CartItems>({});

    const addToCart = async(itemId:string,size:string)=> {
        if( !size) {
            toast.error("Please select a size");
            return
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
            }
            else{
            cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }
    const getCartCount = () => {
        let count = 0;
        for(const item in cartItems){
            for(const size in cartItems[item]){
                try{
                    if(cartItems[item][size] > 0) {
                        count += cartItems[item][size];
                    };
                }
                catch(e){
                    console.error(e);
                }
            }
        }
        return count;
    }

    const product = {
        products, currency, deliveryCost,
        search, setSearch, showSearch, setShowSearch,
        addToCart, cartItems, getCartCount
    };
    return (
        <productProvider.Provider value={product}>
            {children}
        </productProvider.Provider>
    );
}