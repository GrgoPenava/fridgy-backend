import { User } from "@prisma/client";

export interface Response {
  message: string;
  code: number;
  data?: any;
}

export interface UserWithRole extends User {
  role: {
    id: number;
    name: string;
    username: string;
  };
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  username: string;
  password: string;
}
