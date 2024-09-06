import CartTotal from "@/components/cart-total"
import Title from "@/components/title"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PlaceOrder = () => {
    const [method,setMethod] = useState('cod');

    const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        {/*Left Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
                <Title text1={'DELIVERY'} text2={'INFORMATION'} />

            </div>
            <div className="flex gap-3">
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="text" placeholder="First name" />
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="text" placeholder="Last name" />

            </div>
            <input 
                className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                type="text" placeholder="Email address" />
            <input 
                className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                type="text" placeholder="Street" />
            <div className="flex gap-3">
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="text" placeholder="City" />
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="text" placeholder="State" />

            </div>
            <div className="flex gap-3">
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="number" placeholder="Zipcode" />
                <input 
                    className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                    type="text" placeholder="Country" />

            </div>
            <input 
                className='border border-gray-300 w-full py-1.5 px-3.5 rounded'
                type="text" placeholder="Phone" />

        </div>
        {/*Right side */}
        <div className="mt-8">
            <div className="mt-8 min-w-80">
                <CartTotal />

            </div>
            <div className="mt-12">
                <Title text1={'PAYMENT'} text2={'METHOD'} />
                {/*Payment method select */}
                <div className="flex gap-3 flex-row lg:flex-row">
                    <div onClick={()=> setMethod('paypal')} className="flex w-1/3 items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='paypal' ? 'bg-green-400' : ''}`}></p>
                        <img 
                        className="h-9 mx-2"
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg" alt="paypal logo" />

                    </div>
                    <div onClick={()=> setMethod('card')} className="flex w-1/3 items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='card' ? 'bg-green-400' : ''}`}></p>
                        <img 
                        className="h-6 mx-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png" alt="wikimedia logo" />

                    </div>
                    <div onClick={()=> setMethod('cod')} className="flex w-1/3 items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400' : ''}`}></p>
                        <p className="text-gray-500 text-sm font-medium mx-2">CASH ON DELIVERY</p>
                    </div>

                </div>
                <div className="w-full text-end mt-8">
                    <button onClick={()=>navigate('/order')} className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>

                </div>

            </div>

        </div>
      
    </div>
  )
}

