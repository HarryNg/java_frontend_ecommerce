import { Product } from "@/types";

export function ProductList({ products, deleteProduct }: { products: Product[], deleteProduct: (id: string) => void }) {
    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}