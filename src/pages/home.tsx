import { useState } from "react"
import { Button } from "../components/ui/button"
import api from "@/api"
import { ProductCreate } from "@/types"



export function Home() {
  const [message, setMessage] = useState("")
  const [products, setProducts] = useState<ProductCreate[]>([])
  const [newProductName, setNewProductName] = useState("")
  
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      const productData = response.data.data;

      if (Array.isArray(productData)) {
        setProducts(productData);

        const productNames = productData.map((product: { name: string }) => product.name);
        setMessage(productNames.join(", "));
      } else {
        console.error("Expected an array but got:", productData);
        setMessage("Unexpected data format received.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Failed to fetch products.");
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductName(e.target.value);
  };
  const addProduct = async () => {
    try {
      const response = await api.post('/products', {
        name: newProductName,
        price: 100,
        description: "New Product Description",
        images: ["new-product.jpg"],
        color: "blue",
        rating: 5,
        stock: 10
      });
      const newProduct = response.data.data;
      setNewProductName("");

      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await api.delete('/products/' + id);
      const deletedProducts = response.data.data;
      setMessage("Deleted products: " + deletedProducts.name);
    } catch (error) {
      console.error("Error deleting products:", error);
      setMessage("Failed to delete products.");
    }
  }

  const handleWelcome = () => {
    fetchProducts()
  }
  const handleCleanState = () => {
    setMessage("")
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      {message && <p>{message}</p>}
      {!message ? (
        <Button onClick={handleWelcome}>Do not click me</Button>
      ) : (
        <Button onClick={handleCleanState}>Undo the damage</Button>
      )}
      <input
        type="text"
        value={newProductName}
        onChange={handleInputChange}
        placeholder="Enter product name"
      />
      <Button onClick={addProduct}>Add Product</Button>
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <div key={product.id} className="flex gap-5">
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
