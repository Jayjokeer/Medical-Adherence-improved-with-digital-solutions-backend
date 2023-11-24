import {Router} from "express";
import { addMedicationAndReminder, getAllPatientsByHproviderId } from "../controllers/patientController";
import { authenticateHProvider, authenticatePatient } from "../middlewares/verifyJWT";

const patientRouter= Router();

patientRouter.post("/add-reminder/:patientId",authenticatePatient,addMedicationAndReminder);
patientRouter.get("/get-all-patients/:healthProviderId",authenticateHProvider,getAllPatientsByHproviderId);
export default patientRouter;