import express from "express";
import { RegisterController } from "../controller/register-controller";

const publicRoute = express.Router();
publicRoute.post("/api/register", RegisterController.storeUser);

export { publicRoute };
