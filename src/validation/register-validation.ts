import { number, string, z, type ZodType } from "zod";

export class RegisterValidation {
  static readonly registerUserStudentSchema: ZodType = z.object({
    name: string().min(1).max(50),
    email: string().min(1).max(50),
    nim: number().min(1).int(),
    password: string().min(1).max(50),
  });

  static readonly registerUserDplSchema: ZodType = z.object({
    name: string().min(1).max(50),
    email: string().min(1).max(50),
    nip: number().min(1).int(),
    password: string().min(1).max(50),
  });
}
