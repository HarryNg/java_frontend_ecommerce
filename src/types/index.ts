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


export interface UserContextType {
  user: User | string;
  logout: () => void;
  login: (token: string) => void;
  update: (user: User) => void;
}