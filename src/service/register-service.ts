import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRegisterUserResponse,
  type RegisterRequest,
  type RegisterResponse,
} from "../model/register-model";
import { RegisterValidation } from "../validation/register-validation";
import { Validation } from "../validation/validation";

export class RegisterService {
  static async storeUser(request: RegisterRequest): Promise<RegisterResponse> {
    const requestBody: RegisterRequest = Validation.validate(
      RegisterValidation.registerSchema,
      request
    );

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const isNimExist = await prisma.user.findUnique({
      where: {
        nim: requestBody.nim,
      },
    });

    if (isNimExist) {
      throw new ErrorResponse(404, "nim already exist");
    }

    const hashedPassword = await Bun.password.hash(requestBody.password);
    const [storedUser] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          nim: requestBody.nim,
          email: requestBody.email,
          password: hashedPassword,
        },
      }),
    ]);

    return toRegisterUserResponse(storedUser);
  }
}
