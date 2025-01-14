import express from "express";
import { AuthController } from "../controller/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const authRoute = express.Router();

authRoute.use(authMiddleware);
authRoute.post("/api/logout", AuthController.logout);
authRoute.get("/api/current-user", AuthController.getCurrentUser);
export { authRoute };
