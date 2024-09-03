import { Product } from "@/types";
import { Button } from "./ui/button";
import { Card, CardHeader, CardFooter, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface ProductListProps {
    products: Product[];
    deleteProduct: (id: string) => void;
}

export function ProductList({ products, deleteProduct }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <Card key={product.id}  className="p-4" >
                    <Link to={`/product/${product.id}`}>
                        <CardHeader>
                            <h6 className="font-bold mb-2">
                                {product.name}</h6>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">
                                {product.description}</p>
                            <p className="mb-2">
                                {product.price}</p>
                        </CardContent>
                    </Link>
                    <CardFooter>
                    <Button onClick={() => deleteProduct(product.id)}>
                        Delete
                    </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}