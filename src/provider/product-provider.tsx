import { useGetProducts } from "@/features/use-products";
import { Product } from "@/types";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import p_img4 from "@/assets/p_img4.png";
import p_img1 from "@/assets/p_img1.png";
import p_img10 from "@/assets/p_img10.png";
import p_img8 from "@/assets/p_img8.png";
import p_img33 from "@/assets/p_img33.png";
import p_img34 from "@/assets/p_img34.png";
import p_img5 from "@/assets/p_img5.png";
import p_img19 from "@/assets/p_img19.png";
import p_img29 from "@/assets/p_img29.png";

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
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    getCartAmount: () => number;
    placeholderImages: string[];
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
    
    // Placeholder images for the product images testing
    const placeholderImages = [p_img4, p_img5, p_img19, p_img29, p_img1, p_img8, p_img10, p_img33, p_img34];

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
    const updateQuantity = async(itemId:string, size:string,quantity:number) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] = quantity;
            }
        }
        setCartItems(cartData);
    }

    const getCartAmount = (): number => {
        let amount = 0;
        
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                try {
                    const quantity = cartItems[itemId][size];
                    
                    if (quantity > 0) {
                        const product = products?.find(product => product.id === itemId);
                        
                        if (product) {
                            amount += product.price * quantity;
                        } else {
                            console.warn(`Product with ID ${itemId} not found`);
                        }
                    }
                } catch (e) {
                    console.error(`Error calculating cart amount for item ${itemId}, size ${size}:`, e);
                }
            }
        }
        
        return amount;
    };
    

    const product = {
        products, currency, deliveryCost,
        search, setSearch, showSearch, setShowSearch,
        addToCart, cartItems, getCartCount, 
        updateQuantity, getCartAmount, placeholderImages
    };
    return (
        <productProvider.Provider value={product}>
            {children}
        </productProvider.Provider>
    );
}