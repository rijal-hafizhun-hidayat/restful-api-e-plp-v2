import express from "express";
import { RegisterController } from "../controller/register-controller";
import { AuthController } from "../controller/auth-controller";

const publicRoute = express.Router();
publicRoute.post("/api/register/student", RegisterController.storeUserStudent);
publicRoute.post("/api/register/dpl", RegisterController.storeUserDpl);
publicRoute.post("/api/login", AuthController.login);

export { publicRoute };
