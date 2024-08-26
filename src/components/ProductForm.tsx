import { ProductCreate } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";

interface ProductFormProps {
    onAddProduct: (product: ProductCreate) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
    const [newProductName, setNewProductName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductName(e.target.value);
    };

    const addProduct = () => {
        const newProduct = {
            name: newProductName,
            price: 100,
            description: "New Product Description",
            images: ["new-product.jpg"],
            color: "blue",
            rating: 5,
            stock: 10
        };

        onAddProduct(newProduct);
        setNewProductName("");
    };

    return (
        <div className="flex flex-col gap-5">
            <input
                type="text"
                value={newProductName}
                onChange={handleInputChange}
                placeholder="Product Name"
            />
            <Button onClick={addProduct}>Add Product</Button>
        </div>
    );
}
