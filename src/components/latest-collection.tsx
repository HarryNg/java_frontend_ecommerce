import { productProvider } from '@/provider/product-provider';
import { useContext, useEffect, useState } from 'react'
import Title from './title';
import { Product } from '@/types';
import ProductItem from './product-item';

const LatestCollection = () => {
    const products = useContext(productProvider)?.products;
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const itemsLimit = 12;

    useEffect(() => {
        if(products) {
            console.log("Product Length", products.length);
            if(products.length >= itemsLimit) {
            setLatestProducts(products.slice(0, itemsLimit));
            } else {
            setLatestProducts(products);
            }
        }
    }, [products]);

    console.log("Products", products); 

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1='LATEST' text2='COLLECTIONS' />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Explore our newest arrivals, featuring the season’s hottest trends. Shop now to discover the latest styles of the season.
            </p>
        </div>
        <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((product, index) => (
                <ProductItem key={index} id={product.id} image={product.images} name={product.name} price={product.price}/>
            ))}

        </div>
    </div>
  )
}

export default LatestCollection
