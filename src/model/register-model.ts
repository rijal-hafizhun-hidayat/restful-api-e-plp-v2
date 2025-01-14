import type { user } from "@prisma/client";

export interface RegisterStudentRequest {
  name: string;
  email: string;
  password: string;
  nim: number;
}

export interface RegisterDplRequest {
  name: string;
  email: string;
  password: string;
  nip: number;
}

export interface RegisterStudentResponse {
  id: number;
  name: string;
  email: string;
  nim: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterDplResponse {
  id: number;
  name: string;
  email: string;
  nip: number | null;
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

export function toRegisterDplUserResponse(user: user): RegisterDplResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    nip: user.nip,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
