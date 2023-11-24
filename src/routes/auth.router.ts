import {Router} from "express";
import { createPatientController,loginPatientController,loginHealthProviderController,signupHealthProvider } from "../controllers/authController";  


const authRouter = Router();

authRouter.post("/create-patient/:healthProviderId",createPatientController);
authRouter.post("/login-patient",loginPatientController);
authRouter.post("/create-health-provider",signupHealthProvider);
authRouter.post("/login-health-provider",loginHealthProviderController);

export default authRouter;