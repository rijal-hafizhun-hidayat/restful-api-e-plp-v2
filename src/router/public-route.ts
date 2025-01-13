import express from "express";
import { RegisterController } from "../controller/register-controller";

const publicRoute = express.Router();
publicRoute.post("/api/register/student", RegisterController.storeUserStudent);
publicRoute.post("/api/register/dpl", RegisterController.storeUserDpl);

export { publicRoute };
