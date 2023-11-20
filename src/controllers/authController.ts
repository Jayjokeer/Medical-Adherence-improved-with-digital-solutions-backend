import { Express,Request,Response,NextFunction } from "express";
import { encryptPassword, verifyPassword } from "../utils/helpers/encryption";
import { createPatient,findPatientByEmail } from "../services/services";
import {Ipatient} from "../interface/Ipatient";
import { signedUser } from "../middlewares/jwt";
import { findByHealthProviderById } from "../services/services";

export const createPatientController = async(
    req:Request,
    res:Response
)=>{
    const {firstName,lastName,password,email,age} = req.body
    const {healthProviderId} = req.params
    try{
      const healthProvider = await findByHealthProviderById(healthProviderId);
      if (!healthProvider) {
        res.status(404).json({ Error: 'Healthcare provider not found' });
        return;
      }
      const findEmail = await findPatientByEmail(email)
      if(findEmail){
        return  res.status(404).json({
            Error:"User already exists",
        })
      };
        const hashedPwd = await encryptPassword(password) 
        const patient = {
            firstName,
            lastName,
            password:hashedPwd,
            email,
            age,
            healthProvider:healthProviderId
        }
        const createdPatient = await createPatient(patient);
       
        return res.status(201).json({
            message:"Patient created successfully",
            createdPatient
        });

    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"});
    };
};


export const loginPatientController = async(
    req:Request,
    res:Response,
    
)=>{
    const {email,password} = req.body
    try{
        const findEmail = await findPatientByEmail(email)
      if(!findEmail){
        return res.status(403).json({
            Error:"Email or password is incorrect"
        })
      };
      const isVerifiedPassword = await verifyPassword(password, findEmail.password!)
      if(!isVerifiedPassword){
        return res.status(403).json({
            Error:"Email or password is incorrect"
        })
      };
      const payload ={
        firstName:findEmail.firstName,
        lastName:findEmail.lastName,
        email:findEmail.email
    };
    const token = await signedUser(payload);

      return res.status(200).json({
        message:"Patient logged in successfully",
        token
      })
     
    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"})
    };
};