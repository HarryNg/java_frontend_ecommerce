import { productProvider } from "@/provider/product-provider"
import { useContext } from "react"
import Title from "./title";

function CartTotal() {

    const currency = useContext(productProvider)?.currency;
    const deliveryCost = useContext(productProvider)?.deliveryCost;
    const getCartAmount = useContext(productProvider)?.getCartAmount;

    const cartAmount = getCartAmount ? getCartAmount() : 0;


  return (
    <div className="w-full">
      <div className="text-2xl ">
        <Title  text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency} {cartAmount}</p>

        </div>
        <hr />
        <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{currency} {deliveryCost}</p>
        </div>
        <hr />
        <div className="flex justify-between">
            <p>Total</p>
            <p>{currency} {cartAmount ===0 ? 0 : cartAmount + (deliveryCost||0)}</p>

        </div>
      </div>
    </div>
  )
}

export default CartTotal
