import { useCreateProduct, useDeleteProduct, useGetProducts } from "@/features/use-products"
import { ProductList } from "@/components/product-list"
import { ProductForm } from "@/components/product-form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export function Home() {
  const {products , error: fetchError, isLoading: fetchLoading } = useGetProducts();
  const createProductMutation = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();

  if (fetchLoading) return <p>Loading products...</p>;
  if (fetchError) return <p>Error fetching products: {fetchError.message}</p>;
  const formMethods = useForm();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-2xl">Welcome!</h1>
      <ProductForm 
        onAddProduct = {(product) => {
          createProductMutation.mutate(product, {
            onSuccess: (data) => {
              console.log("Product created successfully:", data);
            },
            onError: (error) => {
              console.error("Error creating product:", error);
            }
          });
        }}
      />
      
      <ProductList 
        products={products} 
        deleteProduct={(id) => {
          deleteProductMutation.mutate(id, {
            onSuccess: (data) => {
              console.log("Product deleted successfully:", data);
            },
            onError: (error) => {
              console.error("Error deleting product:", error);
            }
          });
        }}
      />


    

    </div>
  )
}
