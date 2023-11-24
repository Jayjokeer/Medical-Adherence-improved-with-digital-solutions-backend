import {patientModel } from "../models/patientModel"
import {Ipatient} from "../interface/Ipatient"
import { healthProviderModel } from "../models/healthProviderModel";


export const createPatient= async(user:any)=>{
    return await patientModel.create(user);
};

export const findPatientByEmail= async (email:string)=>{
    return  await patientModel.findOne({email:email});
};

export const findByHealthProviderById = async(id:string)=>{
    return await healthProviderModel.findById(id);
};

export const findPatientById= async(id:string)=>{
   return patientModel.findById(id);
};

export const findPatientReminder = async() =>{
    return await patientModel.find({ 'reminderPreferences.enableReminders': true });
};
export const findHealthProviderByEMail = async(email:string)=>{
    return await healthProviderModel.findOne({email:email});
};
export const createHealthProvider =async(user:any)=>{
    return await healthProviderModel.create(user);
};

export const findPatientsByHealthProviderById = async(providerId:string)=>{
    return await patientModel.find({'healthProvider':providerId});
};
