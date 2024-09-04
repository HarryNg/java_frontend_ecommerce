export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  color: string;
  rating: number;
  stock: number;
}

export type ProductCreate = Omit<Product, "id">
export type ProductUpdate = Partial<ProductCreate>

export type User = {
  id?: string ;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
}

export type Token = {
  sub: string;
  id: string;
  iat: number;
  exp: number;
}