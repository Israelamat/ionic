import { User } from "src/app/auth/interfaces/users";

export interface Comment {
  id?: number;
  text: string;
  date?: string;
  user?: User;
}