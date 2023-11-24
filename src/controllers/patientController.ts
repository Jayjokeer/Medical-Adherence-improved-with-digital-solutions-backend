import { Express,Request,Response,NextFunction } from "express";
import { findByHealthProviderById,findPatientById, findPatientsByHealthProviderById } from "../services/services";


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

  export const getAllPatientsByHproviderId = async(req: Request, res: Response)=>{
    const {healthProviderId} = req.params;
    try{
      const patients = await findPatientsByHealthProviderById(healthProviderId);
      return res.status(200).json({ message: 'Patients fetched successfully', patients });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };