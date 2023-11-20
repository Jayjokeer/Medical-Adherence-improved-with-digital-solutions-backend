import {Router} from "express";
import { createPatientController,loginPatientController } from "../controllers/authController";  


const authRouter = Router();

authRouter.post("/create-user",createPatientController);
authRouter.post("/login-user",loginPatientController);

export default authRouter;