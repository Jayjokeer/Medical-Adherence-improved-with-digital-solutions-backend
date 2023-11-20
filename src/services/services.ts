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