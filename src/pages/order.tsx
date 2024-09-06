import Title from "@/components/title";
import { productProvider } from "@/provider/product-provider";
import { useContext } from "react";

export function Order() {
    const products = useContext(productProvider)?.products;
    const currency = useContext(productProvider)?.currency;
    const cartItems = useContext(productProvider)?.cartItems; 

    if (!cartItems || !products) return <div>No items in your order.</div>;

    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Title text1={'YOUR'} text2={'ORDER'} />
            </div>
            <div>
                {
                    Object.entries(cartItems).map(([itemId, sizes], index) => {
                        const product = products.find(p => p.id === itemId); 

                        // Check if product exists
                        if (!product) return null;

                        return Object.entries(sizes).map(([size, quantity], sizeIndex) => (
                            <div key={`${index}-${sizeIndex}`} 
                                 className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-t border-b text-gray-700">
                                <div className="flex items-start gap-6 text-sm">
                                    <img 
                                        className="w-16 sm:w-20"
                                        src={product.images[0]} alt={product.name} />
                                    <div>
                                        <p className="sm:text-base font-medium">{product.name}</p>
                                        <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                            <p className="text-lg">{currency}{product.price}</p>
                                            <p>Quantity: {quantity}</p>
                                            <p>Size: {size}</p>
                                        </div>
                                        <p>Date <span className="text-gray-400">
                                            {new Date().toLocaleDateString()}</span></p>
                                    </div>
                                </div>
                                <div className="md:w-1/2 flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                        <p className="text-sm md:text-base">Ready to ship</p>
                                    </div>
                                    <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                                </div>
                            </div>
                        ));
                    })
                }
            </div>
        </div>
    );
}
