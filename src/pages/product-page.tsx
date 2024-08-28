import { useGetOneProduct } from "@/features/use-products";
import { useParams } from "react-router-dom";

export function ProductPage(){
    const {id = ""} = useParams<{id : string}>();
    
    const product  = useGetOneProduct(id);

    if(!product) return <p>Loading product...</p>;

    return (
    <div className="flex flex-col items-center gap-6 p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <img src={product.images[0]} alt={product.name} className="w-64 h-64 object-cover" />
        <p className="text-lg">Price: ${product.price}</p>
        <p className="text-md">{product.description || "No description available."}</p>
        <p className="text-sm text-gray-500">Color: {product.color}</p>
        <p className="text-sm text-gray-500">Rating: {product.rating} / 5</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
    </div>
    )
}