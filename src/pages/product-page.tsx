import { useGetOneProduct } from "@/features/use-products";
import { productProvider } from "@/provider/product-provider";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import p_img4 from "@/assets/p_img4.png";
import p_img5 from "@/assets/p_img5.png";
import p_img19 from "@/assets/p_img19.png";
import p_img29 from "@/assets/p_img29.png";

export function ProductPage(){
    const {id = ""} = useParams<{id : string}>();
    const product  = useGetOneProduct(id);
    const products = useContext(productProvider)?.products;
    const[productData, setProductData] = useState(product);
    // placeholder images for the product
    // TODO: replace with actual images LINKS
    const[image, setImage] = useState([
        p_img4, p_img5, p_img19, p_img29
    ]);


    if(!product) return <p>Loading product...</p>;
    const hasImage = Array.isArray(product.images) && product.images.length > 0 ;
    const PLACEHOLDER_URL = "https://via.placeholder.com/150";
    const imageUrl = hasImage ? product.images[0] : PLACEHOLDER_URL;

    return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100 flex flex-col items-center gap-6 p-4">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            {/*Product images */}
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                    {
                        productData.images.map((image, index) => (
                            <img 
                            key={index}
                            src={image}
                            alt={productData.name}
                            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover cursor-pointer"
                            // onClick={() => setImage([image])}
                            />
                        ))
                        

                    }
                    {
                        image.map((image, index) => (
                            <img 
                            key={index}
                            src={image}
                            alt={productData.name}
                            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover cursor-pointer"
                            onClick={() => setImage([image])}
                            />
                        ))
                    }

                </div>

            </div>

        </div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {hasImage && 
            <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-64 h-64 object-cover" 
            />
        }
        <p className="text-lg">Price: ${product.price}</p>
        <p className="text-md">{product.description || "No description available."}</p>
        <p className="text-sm text-gray-500">Color: {product.color || "None"}</p>
        <p className="text-sm text-gray-500">Rating: {product.rating} / 5</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
    </div>
    ) : <div className="opacity-0"><p>Loading product...</p></div>
}