import type { user } from "@prisma/client";

export interface RegisterStudentRequest {
  name: string;
  email: string;
  password: string;
  nim: number;
}

export interface RegisterStudentResponse {
  id: number;
  name: string;
  email: string;
  nim: number | null;
  created_at: Date;
  updated_at: Date;
}

export function toRegisterStudentUserResponse(
  user: user
): RegisterStudentResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    nim: user.nim,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
