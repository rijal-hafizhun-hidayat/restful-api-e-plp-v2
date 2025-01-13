import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRegisterDplUserResponse,
  toRegisterStudentUserResponse,
  type RegisterDplRequest,
  type RegisterDplResponse,
  type RegisterStudentRequest,
  type RegisterStudentResponse,
} from "../model/register-model";
import { RegisterValidation } from "../validation/register-validation";
import { Validation } from "../validation/validation";

export class RegisterService {
  static async storeUserStudent(
    request: RegisterStudentRequest
  ): Promise<RegisterStudentResponse> {
    const requestBody: RegisterStudentRequest = Validation.validate(
      RegisterValidation.registerUserStudentSchema,
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

    const role = await prisma.role.findUnique({
      where: {
        name: "student",
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    const hashedPassword = await Bun.password.hash(requestBody.password);
    const [storedUserStudent] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          nim: requestBody.nim,
          email: requestBody.email,
          password: hashedPassword,
          user_role: {
            create: {
              role_id: role.id,
            },
          },
        },
      }),
    ]);

    return toRegisterStudentUserResponse(storedUserStudent);
  }

  static async storeUserDpl(
    request: RegisterDplRequest
  ): Promise<RegisterDplResponse> {
    const requestBody: RegisterDplRequest = Validation.validate(
      RegisterValidation.registerUserDplSchema,
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

    const isNipExist = await prisma.user.findUnique({
      where: {
        nip: requestBody.nip,
      },
    });

    if (isNipExist) {
      throw new ErrorResponse(404, "nip already exist");
    }

    const hashedPassword = await Bun.password.hash(requestBody.password);
    const role = await prisma.role.findUnique({
      where: {
        name: "dpl",
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    const [storedUserDpl] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          nip: requestBody.nip,
          password: hashedPassword,
          user_role: {
            create: {
              role_id: role.id,
            },
          },
        },
      }),
    ]);

    return toRegisterDplUserResponse(storedUserDpl);
  }
}
