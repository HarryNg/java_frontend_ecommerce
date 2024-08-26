import { useState } from "react"
import { Button } from "../components/ui/button"
import { useCreateProduct, useDeleteProduct, useGetProducts } from "@/features/use-products"
import { ProductList } from "@/components/product-list"



export function Home() {
  const [message, setMessage] = useState("")
  // const [products, setProducts] = useState<Product[]>([])
  const [newProductName, setNewProductName] = useState("")
  
  const {products , error: fetchError, isLoading: fetchLoading } = useGetProducts();
  const createProduct = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductName(e.target.value);
  };
  const addProduct = async () => {
      const newProduct = {
        name: newProductName,
        price: 100,
        description: "New Product Description",
        images: ["new-product.jpg"],
        color: "blue",
        rating: 5,
        stock: 10
      };
      
      createProduct.mutate(newProduct, {
        onSuccess: (data) => {
          setNewProductName("");
          console.log("Product created successfully:", data);
          setMessage("Product created successfully.");
        },
        onError: (error) => {
          console.error("Error creating product:", error);
          setMessage("Failed to create product.");
        }
      });
    }
  

  const deleteProduct = async (id: string) => {
    const deletedProducts = deleteProductMutation.mutate(id, {
      onSuccess: (data) => {
        console.log("Product deleted successfully:", data);
        setMessage("Product deleted successfully.");
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
        setMessage("Failed to delete product.");
      }
    });
    
  }

  if (fetchLoading) return <p>Loading products...</p>;
  if (fetchError) return <p>Error fetching products: {fetchError.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      <input
        type="text"
        value={newProductName}
        onChange={handleInputChange}
        placeholder="Enter product name"
      />
      <Button onClick={addProduct}>Add Product</Button>
      
      <ProductList products={products} deleteProduct={deleteProduct}/>
    </div>
  )
}
