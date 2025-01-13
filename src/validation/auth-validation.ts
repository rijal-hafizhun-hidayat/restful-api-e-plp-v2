import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly loginSchema: ZodType = z.object({
    email: string().min(1).max(50).email(),
    password: string().min(1).max(50),
  });
}
