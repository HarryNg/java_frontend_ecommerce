import { z } from "zod";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  images: string[];
  color: string;
  rating: number;
  stock: number;
  isBestSeller: boolean;
  isDeleted: boolean;
  size: string;
}

export type ProductCreate = Omit<Product, "id">
export type ProductUpdate = Partial<ProductCreate>

export type BaseUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
}
export interface User extends BaseUser {
  id: string ;
}
export interface Admin extends BaseUser {
  id: string;
  role: "ADMIN";
}

export type Token = {
  sub: string;
  id: string;
  iat: number;
  exp: number;
}

/*============ User types ============== */
export interface UserContextType {
  user: User | string;
  logout: () => void;
  login: (token: string) => void;
  update: (user: User) => void;
}
export type FormData = {
  user_id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
};

/*============ Product types ============== */

export interface ProductFormProps {
  onAddProduct: (product: ProductCreate) => void;
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  category: z.string().optional(),
  images: z.string().optional(), 
  color: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  stock: z.number().min(0).optional(),
  bestSeller: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;