import { User } from "src/app/auth/interfaces/users";
export interface Product {
  id?: number;
  description: string;
  imageUrl: string;
  price: number;
  rating?: number;
  creator?: User;
}