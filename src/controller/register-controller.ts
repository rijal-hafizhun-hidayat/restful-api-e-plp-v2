import type { NextFunction, Request, Response } from "express";
import { RegisterService } from "../service/register-service";
import type { RegisterStudentRequest } from "../model/register-model";

export class RegisterController {
  static async storeUserStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RegisterStudentRequest =
        req.body as RegisterStudentRequest;
      const result = await RegisterService.storeUserStudent(request);
      return res.status(200).json({
        statucCode: 200,
        message: "success store user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
