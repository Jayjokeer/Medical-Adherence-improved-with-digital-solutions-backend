import {findPatientReminder} from "../services/services"

export const sendNotificationsToPatients = async ()=> {
    try {
      const patients = await findPatientReminder()
  
      for (const patient of patients) {
  
        const reminderTime = new Date(patient.reminderPreferences!.reminderTime!);
        const currentTime = new Date();
  
        const timeDifference = reminderTime.getTime() - currentTime.getTime();
        const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
  
        if (timeDifferenceInMinutes <= 5 && timeDifferenceInMinutes >= 0) {
          // Send notification to patient
        //   sendNotificationFunction(patient);
          console.log(patient)
        }
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };
  
 

  