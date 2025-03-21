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
  };
}
