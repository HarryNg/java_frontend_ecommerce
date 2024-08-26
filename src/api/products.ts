import api from "@/api";
import { ProductCreate, ProductUpdate } from "@/types";

const RESOURCE_NAME = 'products';

export default {
    getAll: async () => {
        const response = await api.get(RESOURCE_NAME);
        if(response.status !== 200) {
            throw new Error('Failed to fetch products');
        }
        return response.data.data;
    },
    getOne: async (id: string) => {
        const response =  await api.get(`${RESOURCE_NAME}/${id}`);
        if(response.status !== 200) {
            throw new Error('Failed to fetch product');
        }
        return response.data.data;
    },
    createOne: async (data: ProductCreate) => {
        const response =  await api.post(RESOURCE_NAME, data);
        if(response.status !== 200) {
            throw new Error('Failed to create product');
        }
        return response.data.data;
    },
    updateOne: async (id: string, data: ProductUpdate) => {
        const response =  await api.put(`${RESOURCE_NAME}/${id}`, data);
        if(response.status !== 200) {
            throw new Error('Failed to update product');
        }
        return response.data.data;
    },
    deleteOne: async (id: string) => {
        const response =  await api.delete(`${RESOURCE_NAME}/${id}`);
        if(response.status !== 200) {
            throw new Error('Failed to delete product');
        }
        return response.data.data;
    },
};