import { Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/api/products";

const QUERY_KEY = 'products';
export function getQueryKey(id?: string) {
    if (id) {
        return [QUERY_KEY, id];
    }
    return [QUERY_KEY];
}

export function useGetProducts() {
    const { data: products, isError, isLoading} = useQuery<Product[]>({
        queryKey: getQueryKey(),
        queryFn: ProductService.getAll,
        initialData: []
    });
    
    return {products, isError, isLoading};
}

export function useGetOneProduct(id: string) {
    const { data: product} = useQuery<Product>({
        queryKey: getQueryKey(id),
        queryFn: () => ProductService.getOne(id)
    });

    return product;
}

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ProductService.createOne,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getQueryKey() });
        }
    });
    return mutation;
}