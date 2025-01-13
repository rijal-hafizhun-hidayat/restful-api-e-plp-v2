import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { toLoginResponse, type LoginRequest } from "../model/auth-model";
import { TokenUtil } from "../utils/token-util";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest) {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "email or password not match");
    }

    const isPasswordMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ErrorResponse(404, "email or password not match");
    }

    const token: string = await TokenUtil.generateToken(user);

    return toLoginResponse(token);
  }
}
