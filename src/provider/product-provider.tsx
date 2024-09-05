import { useGetProducts } from "@/features/use-products";
import { Product } from "@/types";
import { createContext } from "react";

interface ProductContextType {
    products: Product[];
    currency: string;
    deliveryCost: number;
    // addProduct: (product: Product) => void;
    // deleteProduct: (id: string) => void;
    // updateProduct: (id: string, product: Product) => void;
}
export const productProvider = createContext<ProductContextType | null>(null);
export function ProductProvider({ children }: { children: React.ReactNode }) {
    const {products , error: fetchError, isLoading: fetchLoading } = useGetProducts();
    const currency = "€"; 
    const deliveryCost = 5;

    const product = {
        products, currency, deliveryCost
    };
    return (
        <productProvider.Provider value={product}>
            {children}
        </productProvider.Provider>
    );
}