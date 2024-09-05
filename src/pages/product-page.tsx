import { useGetOneProduct } from "@/features/use-products";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import p_img4 from "@/assets/p_img4.png";
import p_img5 from "@/assets/p_img5.png";
import p_img19 from "@/assets/p_img19.png";
import p_img29 from "@/assets/p_img29.png";
import star_icon from "@/assets/star_icon.png";
import star_dull_icon from "@/assets/star_dull_icon.png";
import { productProvider } from "@/provider/product-provider";

export function ProductPage(){
    const {id = ""} = useParams<{id : string}>();
    const currency = useContext(productProvider)?.currency;
    const addToCart = useContext(productProvider)?.addToCart;
    const product  = useGetOneProduct(id);
    const[productData, setProductData] = useState(product);
    const[sizeSelect, setSizeSelect] = useState('');

    // placeholder images for the product
    // TODO: replace with actual images LINKS
    const[images, setImages] = useState([
        p_img4, p_img5, p_img19, p_img29
    ]);
    const[image, setImage] = useState("");


    if(!product) return <p>Loading product...</p>;

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
                            onClick={() => setImage(image)}
                            />
                        ))
                    }
                    {
                        images.map((image, index) => (
                            <img 
                            key={index}
                            src={image}
                            alt={productData.name}
                            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover cursor-pointer"
                            onClick={() => setImage(image)}
                            />
                        ))
                    }

                </div>
                <div className="w-full sm:w-[80%]">
                    <img 
                    className="w-full h-auto" 
                    src={image}
                    alt="" />

                </div>
            </div>
            {/*Product details */}
            <div className="flex-1">
                <h1 className="font-medium text-2xl mt-2">
                    {productData.name}
                </h1>
                <div className="flex items-center gap-1 mt-2">
                    <img src={star_icon} alt="" className="w-3 5" />
                    <img src={star_icon} alt="" className="w-3 5" />
                    <img src={star_icon} alt="" className="w-3 5" />
                    <img src={star_icon} alt="" className="w-3 5" />
                    <img src={star_dull_icon} alt="" className="w-3 5" />
                    <p className="pl-2">(122)</p>

                </div>
                <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                <div className="flex flex-col gap-4 my-8">
                    <p>Select-Size</p>
                    <div className="flex gap-2">
                        {['S','M','L'].map((size, index) => (
                            <button 
                            onClick={() => setSizeSelect(size)}
                            key={index} 
                            className={`w-10 h-10 border py-2 px-4 bg-gray-100  rounded-md flex items-center justify-center ${size === sizeSelect ? "border-orange-500" : ''}`}>
                                {size}
                            </button>
                        ))}
                    </div>
                    <button 
                    onClick={() => addToCart && addToCart(productData.id, sizeSelect)}
                    className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:w-4/5"/>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original product</p>
                        <p>Cash on delivery is available</p>
                        <p>Easy return and 7 days exchange</p>

                    </div>

                </div>

            </div>

        </div>
        
    </div>
    ) : <div className="opacity-0"><p>Loading product...</p></div>
}