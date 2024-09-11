import { ChangeEvent, useContext } from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProductCreate,ProductFormProps, CheckboxProps,productSchema,ProductFormInputs } from "@/types";
import { productProvider } from "@/provider/product-provider";

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    />
    <label>{label}</label>
  </div>
);

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const placeholderImages = useContext(productProvider)?.placeholderImages || [];
  const formMethods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      images: "", 
      color: "None",
      rating: 0,
      stock: 0,
    },
  });

  const getRandomImage = () => {
    if (placeholderImages.length === 0) return "https://via.placeholder.com/150";
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  };

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    const imageList = data.images
      ? data.images.split(",").map((img) => img.trim())
      : [getRandomImage()];

    onAddProduct({
      ...data,
      description: data.description?.trim() || "No description",
      category: data.category?.trim() || "No category",
      subCategory: "kids",
      images: imageList, 
      color: data.color ?? "",
      rating: data.rating ?? 0,
      stock: data.stock ?? 0,
      isBestSeller: data.bestSeller ?? false,
      isDeleted: false,
      size: "S",
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex gap-4 p-1">
          {/* Product Name */}
          <FormField
            control={formMethods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Price */}
          <FormField
            control={formMethods.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product price"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Description */}
          <FormField
            control={formMethods.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Category */}
          <FormField
            control={formMethods.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images Input (comma-separated or single) */}
          <FormField
            control={formMethods.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URLs (comma-separated for multiple)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Color */}
          <FormField
            control={formMethods.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Product color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Rating */}
          <FormField
            control={formMethods.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product rating"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Stock */}
          <FormField
            control={formMethods.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product stock"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Best Seller */}
          <FormField
            control={formMethods.control}
            name="bestSeller"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Best Seller"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-1/4 self-center m-2">
          Add Product
        </Button>
      </form>
    </FormProvider>
  );
}
