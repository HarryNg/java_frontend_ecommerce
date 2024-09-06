import Title from "@/components/title";
import { productProvider } from "@/provider/product-provider"
import { useContext, useEffect, useState } from "react"
import bin_icon from "@/assets/bin_icon.png"
import CartTotal from "@/components/cart-total";
import { useNavigate } from "react-router-dom";

interface CartItem {
    id: string;
    size: string;
    quantity: number;
}
export function Cart() {
    const products = useContext(productProvider)?.products;
    const currency = useContext(productProvider)?.currency;
    const cartItems = useContext(productProvider)?.cartItems;
    const updateQuantity = useContext(productProvider)?.updateQuantity;
    const navigate = useNavigate();
    

    const [cartData, setCartData] = useState<CartItem[]>([]);

    useEffect(() => {
        const tempCartData = [];
        for(const itemId in cartItems){
            for(const size in cartItems[itemId]){
                if(cartItems[itemId][size] >0){
                    tempCartData.push({
                        id: itemId,
                        size,
                        quantity: cartItems[itemId][size]
                    });
                }
            }
        }
        setCartData(tempCartData);
    }, [cartItems])
  return (
    <div className="border-t pt-14">
        <div className="text-2xl mb-3">
            <Title text1={'YOUR'} text2={'CART'} />

        </div>
        <div>
            {
                cartData.map((item, index) => {
                    const product = products?.find(product => product.id === item.id);
                    return (
                        <div 
                        key={index} 
                        className=" py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-col-[4fr_2fr_0.5fr] items-center gap-4">
                            <div className="flex items-start gap-6">
                                <img 
                                src={product?.images[0]} 
                                alt="" 
                                className="w-full sm:w-20" />
                                <div>
                                    <p className="text-xs sm:text-lg font-medium">{product?.name}</p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>{currency}{product?.price}</p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>

                                    </div>
                                </div>
                                <input 
                                onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity && updateQuantity(item.id, item.size, parseInt(e.target.value))}
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                                type="number" min={1}
                                defaultValue={item.quantity}/>
                                <img 
                                onClick={()=>updateQuantity && updateQuantity(item.id, item.size, 0)}
                                className="w-4 mr-4 sm:5 cursor-pointer"
                                src={bin_icon} alt="" />
                            </div>
                            
                        </div>
                    )
                })

            }
        </div>
        <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                    <button
                    onClick={()=>navigate('/place-order')}
                    className="bg-black text-white text-sm my-8 py-3 px-16">
                        PROCEED TO CHECKOUT
                    </button>

                </div>

            </div>

        </div>
      
    </div>
  )
}

