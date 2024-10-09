export interface Product {
  id: number;
  name: string;
  price: number;
  detail: string | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date | null;
}
