import { Product } from "@/types";
import { Button } from "./ui/button";

interface ProductListProps {
    products: Product[];
    deleteProduct: (id: string) => void;
}

export function ProductList({ products, deleteProduct }: ProductListProps) {
    return (
        <div className="flex flex-col gap-5">
            <ul className="flex gap-5">
                {products.map(product => (
                    <li key={product.id}>
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <p>{product.id}</p>
                        <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}