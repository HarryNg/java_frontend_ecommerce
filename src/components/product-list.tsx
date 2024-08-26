import { Product } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ProductListProps {
    products: Product[];
    deleteProduct: (id: string) => void;
}

export function ProductList({ products, deleteProduct }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <Card key={product.id}  className="p-4">
                     <h6 className="font-bold mb-2">
                        {product.name}</h6>
                     <body className="mb-2">
                        {product.description}</body>
                     <h6 className="mb-2">
                        {product.price}</h6>
                    <Button onClick={() => deleteProduct(product.id)}>
                        Delete
                    </Button>
                </Card>
            ))}
        </div>
    );
}