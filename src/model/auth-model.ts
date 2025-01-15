import type { role } from "@prisma/client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  userId: number;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: role;
}

export function toLoginResponse(token: string): LoginResponse {
  return {
    token: token,
  };
}
