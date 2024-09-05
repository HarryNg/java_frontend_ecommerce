import { useGetProducts } from "@/features/use-products";
import { Product } from "@/types";
import { createContext, useState } from "react";

interface ProductContextType {
    products: Product[];
    currency: string;
    deliveryCost: number;
    search: string;
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    // addProduct: (product: Product) => void;
    // deleteProduct: (id: string) => void;
    // updateProduct: (id: string, product: Product) => void;
}
export const productProvider = createContext<ProductContextType | null>(null);
export function ProductProvider({ children }: { children: React.ReactNode }) {
    const {products , error: fetchError, isLoading: fetchLoading } = useGetProducts();
    const currency = "€"; 
    const deliveryCost = 5;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const product = {
        products, currency, deliveryCost,
        search, setSearch, showSearch, setShowSearch
    };
    return (
        <productProvider.Provider value={product}>
            {children}
        </productProvider.Provider>
    );
}