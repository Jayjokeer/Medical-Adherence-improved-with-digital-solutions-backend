import { Express,Request,Response,NextFunction } from "express";
import { findByHealthProviderById,findPatientById } from "../services/services";


export const addMedicationAndReminder = async (req: Request, res: Response) => {
    try {
      const { drug, dosage, enableReminders, reminderTime } = req.body;
      const { patientId } = req.params; 
  
      const patient = await findPatientById(patientId)
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      patient.medications!.push({ drug, dosage });
  
      if (enableReminders !== undefined && reminderTime !== undefined) {
        patient.reminderPreferences = {
          enableReminders,
          reminderTime,
        };
      }
      await patient.save();
  
      return res.status(200).json({ message: 'Medication and reminder set successfully', patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };