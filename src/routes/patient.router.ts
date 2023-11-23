import {Router} from "express";
import { addMedicationAndReminder } from "../controllers/patientController";

const router= Router();

router.post("/add-reminder/:patientId",addMedicationAndReminder);

export default router;