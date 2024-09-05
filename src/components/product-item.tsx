import { productProvider } from '@/provider/product-provider'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}:{id:string,image:string[],name:string,price:number}) => {
  const currency = useContext(productProvider)?.currency;
  const fallbackImage = "https://via.placeholder.com/150";
    return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer flex flex-col gap-2'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image && image.length > 0? image[0] : fallbackImage} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
