import {Types} from "mongoose"

export interface Ipatient extends Document{
    firstName:string;
    lastName : string;
    email:string;
    age:string;
    password?:string,
    medications?: {
        drug?: string;
        dosage?: string;
      }[];
    healthProvider?:Types.ObjectId;
    reminderPreferences?: {
        enableReminders?: boolean;
        reminderTime?: string;
      };
}
