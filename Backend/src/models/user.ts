export interface User {
  id?: number;

  name: string;
  email: string;
  password: string;

  avatar?: string;
  bio?: string;
  occupation?: string;
  location?: string;
  github?: string;
  linkedin?: string

  createdAt?: Date;
}