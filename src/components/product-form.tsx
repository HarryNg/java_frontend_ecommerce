import { ProductCreate } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  onAddProduct: (product: ProductCreate) => void;
}

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive").or(z.literal(0)),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  color: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  stock: z.number().min(0).optional(),
});

type ProductFormInputs = z.infer<typeof productSchema>;

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const formMethods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        name: "",
        price: 0,
        description: "",
        images: [],
        color: "None",
        rating: 0,
        stock: 0,
    },
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    onAddProduct({
        ...data,
        description: data.description?.trim() || "No description",
        images: data.images ?? [],        
        color: data.color ?? "",           
        rating: data.rating ?? 0, 
        stock: data.stock ?? 0 
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex gap-4 p-1">

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

        <FormField
          control={formMethods.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input placeholder="Product images" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        </div>
        <Button type="submit" className="w-1/4 self-center m-2">Add Product</Button>
      </form>

    </FormProvider>
  );
}
