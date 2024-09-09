import { productProvider } from "@/provider/product-provider"
import { Product } from "@/types";
import { useContext, useEffect, useState } from "react"
import Title from "./title";
import ProductItem from "./product-item";

const BestSeller = () => {
    const products = useContext(productProvider)?.products;
    const [bestSeller, setBestSeller] = useState<Product[]>([]);
    const itemsLimit = 10;

    useEffect(() => {
        if(products) {
            const bestSellerProducts = products.filter(product => product.isBestSeller);
            if(products.length >= itemsLimit) {
            setBestSeller(bestSellerProducts.slice(0, itemsLimit));
            } else {
            setBestSeller(bestSellerProducts);
            }
        }
    }, [products]);

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Shop now to discover limited-edition pieces designed to elevate your style.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {bestSeller.map((product, index) => (
                <ProductItem key={index} id={product.id} image={product.images} name={product.name} price={product.price}/>
            ))}
        </div>
      
    </div>
  )
}

export default BestSeller
