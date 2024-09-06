import { ProductCreate } from "@/types";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useCreateProduct, useDeleteProduct, useGetProducts } from "@/features/use-products";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/product-form";
import { useContext } from "react";
import { userContext } from "@/provider/user-provider";
import { Navigate } from "react-router-dom";

// TODO: Implement pagination
// TODO: Implement Dashboard Views for Orders, Users, and Products
export function Dashboard(){
    const {user} = useContext(userContext) || {};
    const products = useGetProducts();
    if(products.isLoading){
        return <div>Loading...</div>
    }
    if(products.error != null){
        return <div>Error: {products.error.message}</div>
    }
    const productDelete = useDeleteProduct();
    const productAdd = useCreateProduct();

    const handleAddProduct = (product : ProductCreate) => {
        productAdd.mutate(product, {
          onSuccess: (data) => {
            console.log("Product created successfully:", data);
          },
          onError: (error) => {
            console.error("Error creating product:", error);
          }
        });
      }
    const handleDeleteProduct = (id: string) => {
        productDelete.mutate(id, {
        onSuccess: (data) => {
        console.log("Product deleted successfully:", data);
        },
        onError: (error) => {
        console.error("Error deleting product:", error);
        }
    });
    }
    // Check if user is authorized
    if (user === "Guest") {
        return <Navigate to="/unauthorized" replace />;
    }

    return <div>
        <ProductForm 
            onAddProduct = {handleAddProduct}
        />
        
        <Table>
            <TableCaption>A Dashboard to manage your products.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.products.map((product) => {
                    return (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell className="text-right">
                            <Button variant={"ghost"}>Edit</Button>
                            <Button 
                                onClick={
                                    () => {
                                        productDelete.mutate(product.id)
                                    }}
                                variant={"destructive"}
                                >

                                Delete
                            </Button>
                            </TableCell>
                        </TableRow>
                    )}
                )}
            </TableBody>
        </Table>

        </div>
}