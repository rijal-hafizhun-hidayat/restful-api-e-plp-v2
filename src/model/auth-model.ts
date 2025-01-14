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

export function toLoginResponse(token: string): LoginResponse {
  return {
    token: token,
  };
}
