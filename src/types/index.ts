type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    images: [string];
    color: string;
    rating: number;
    stock: number;
  }

export type ProductCreate = Omit<Product, "id">
export type ProductUpdate = Partial<ProductCreate>