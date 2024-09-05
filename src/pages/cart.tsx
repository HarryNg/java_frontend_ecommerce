import { productProvider } from "@/provider/product-provider"
import { useContext, useEffect, useState } from "react"

interface CartItem {
    id: string;
    size: string;
    quantity: number;
}
function Cart() {
    const products = useContext(productProvider)?.products;
    const currency = useContext(productProvider)?.currency;
    const cartItems = useContext(productProvider)?.cartItems;

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
    <div>
      
    </div>
  )
}

export default Cart
