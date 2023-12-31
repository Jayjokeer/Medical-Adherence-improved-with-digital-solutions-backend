import { Express,Request,Response,NextFunction } from "express";
import { encryptPassword, verifyPassword } from "../utils/helpers/encryption";
import { createPatient,findPatientByEmail } from "../services/services";
import {Ipatient} from "../interface/Ipatient";
import { signedUser } from "../middlewares/jwt";
import { findByHealthProviderById,
  findPatientById,
  createHealthProvider,
  findHealthProviderByEMail } from "../services/services";

export const createPatientController = async(
    req:Request,
    res:Response
)=>{
    const {
      firstName,
      lastName,
      password,
      email,
      age, 
      phoneNumber,
      sex,
      address
    } = req.body
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
            healthProvider:healthProviderId,
            phoneNumber,
            sex,
            address
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
        email:findEmail.email,
        role:findEmail.role
    };
    const token = await signedUser(payload);

      return res.status(200).json({
        message:"Patient logged in successfully",
        token,
        user:findEmail
      })
     
    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"})
    };
};


export const signupHealthProvider = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    hospital,
    age,
    password,
    specialization,
    phoneNumber,
    sex,
    address
  } = req.body;

  try {
    
    const existingProvider = await  findHealthProviderByEMail(email);
    if (existingProvider) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  
    const hashedPwd = await encryptPassword(password); 

    const newHealthProvider = {
      firstName,
      lastName,
      email,
      hospital,
      age,
      password: hashedPwd,
      specialization,
      phoneNumber,
      sex,
      address
    };
   const healthProvider = await createHealthProvider(newHealthProvider );

    res.status(201).json({ message: 'Health provider signed up successfully', data: healthProvider });
  } catch (error) {
    console.error('Error occurred while signing up health provider:', error);
    return res.status(500).json({ error: 'An error occurred while signing up health provider' });
  }
};

export const loginHealthProviderController=async (req: Request, res: Response)=>{
  const {email,password} = req.body
    try{
        const findEmail = await findHealthProviderByEMail(email)
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
        email:findEmail.email,
        role:findEmail.role
    };
    const token = await signedUser(payload);

      return res.status(200).json({
        message:"Health Provider logged in successfully",
        token,
        user:findEmail
      })
     
    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"})
    };
};


