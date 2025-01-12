import type { NextFunction, Request, Response } from "express";
import type { RegisterRequest } from "../model/register-model";
import { RegisterService } from "../service/register-service";

export class RegisterController {
  static async storeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const result = await RegisterService.storeUser(request);
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
