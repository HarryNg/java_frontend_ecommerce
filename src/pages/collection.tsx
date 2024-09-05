import { Input } from "@/components/ui/input";
import { productProvider } from "@/provider/product-provider"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import dropdown_icon from '@/assets/dropdown_icon.png'
import Title from "@/components/title";
import { Product } from "@/types";
import ProductItem from "@/components/product-item";

const Collection = () => {
    const products = useContext(productProvider)?.products;
    const itemsLimit = 25;
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [subCategory, setSubCategory] = useState<string[]>([]);

    const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory((prev) =>
            prev.includes(e.target.value.toLowerCase())
                ? prev.filter(cat => cat !== e.target.value.toLowerCase())
                : [...prev, e.target.value.toLowerCase()]
        );
    };

    const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setSubCategory((prev) => 
        prev.includes(e.target.value.toLocaleLowerCase())
            ? prev.filter(cat=> cat !== e.target.value.toLocaleLowerCase())
            : [...prev, e.target.value.toLocaleLowerCase()]);
    }

    useEffect(() => {
        let productsCopy = products ? [...products] : [];

        // Apply category filter
        if (category.length > 0) {
            productsCopy = productsCopy.filter(product => category.includes(product.category.toLowerCase()));
        }

        // Apply subcategory filter
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory?.toLowerCase()));
        }

        // Limit items
        if (productsCopy.length >= itemsLimit) {
            setFilteredProducts(productsCopy.slice(0, itemsLimit));
        } else {
            setFilteredProducts(productsCopy);
        }
    }, [products, category, subCategory]);

  return (
    <div className="flex flex-row m-auto w-full sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/*Filter options */}
        <div className="min-w-60 flex w-full">
            <div className="w-1/4 justify-items-center items-center mt-0">
                <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex flex-col items-center cursor-pointer gap-2">
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter? 'rotate-90': ''}`} src={dropdown_icon} alt="" />
                </p>
                {/*Category filter */}
                <div className={`flex-col m-auto items-center justify-items-center justify-center border border-gray-300 pl-5 py-3 mt-6 ${showFilter? "": "hidden"}`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-gray-700">
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'men'} onChange={toggleCategory}/>Men
                        </p>
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'women'} onChange={toggleCategory}/>Women
                        </p>
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'kid'} onChange={toggleCategory}/>Kids
                        </p>
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'jewelry'} onChange={toggleCategory}/>Jewelry
                        </p>
                    </div>
                </div>
                {/*Subcategory filter */}
                <div className={`flex-col border border-gray-300 pl-5 py-3 my-5 ${showFilter? "": "hidden"}`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-gray-700">
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'top'} onChange={toggleSubCategory}/>Topwear
                        </p>
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'bottom'} onChange={toggleSubCategory}/>Bottomwear
                        </p>
                        <p className="flex gap-2 items-center">
                            <Input className="w-3" type="checkbox" value={'winter'} onChange={toggleSubCategory}/>Winterwear
                        </p>
                    
                    </div>
                </div>
            </div>
            {/*Right side */}
            <div className="flex-1 mt-1 ml-8">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/*Sort by dropdown */}
                    <select className="border-2 border-gray-300 px-2 py-1 rounded-sm text-sm">
                        <option value="relevant">Sort By: Relevant</option>
                        <option value="low-hight">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to Low</option>
                    </select>
            </div>
            {/*Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {filteredProducts.map((product, index) => (
                    <ProductItem key={index} id={product.id} image={product.images} name={product.name} price={product.price}/>
                ))}

            </div>

            </div>

        </div>
            
      
    </div>
  )
}

export default Collection
