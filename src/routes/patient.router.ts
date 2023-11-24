import {Router} from "express";
import { addMedicationAndReminder } from "../controllers/patientController";
import { authenticatePatient } from "../middlewares/verifyJWT";

const router= Router();

router.post("/add-reminder/:patientId",authenticatePatient,addMedicationAndReminder);

export default router;