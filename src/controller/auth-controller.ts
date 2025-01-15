import type { NextFunction, Request, Response } from "express";
import type { CurrentUser, LoginRequest } from "../model/auth-model";
import { AuthService } from "../service/auth-service";
import type { CostumeRequest } from "../interface/request-interface";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result = await AuthService.login(request);
      return res.status(200).json({
        statucCode: 200,
        message: "success login",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const tokenHeader = req.headers.authorization as string;
      const result = await AuthService.logout(tokenHeader);
      return res.status(200).json({
        statusCode: 200,
        message: "success logout",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const auth: CurrentUser = req.currentUser as CurrentUser;
      const result = await AuthService.getCurrentUser(auth);
      return res.status(200).json({
        statusCode: 200,
        message: "success get current user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
