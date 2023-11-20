import { Schema, model, Document } from 'mongoose';
import {Ihealthprovider} from "../interface/Ihealthprovider"



const healthProviderSchema =new Schema<Ihealthprovider>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    hospital:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    patients: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient' 
  }],
})

export const healthProviderModel = model<Ihealthprovider>('HealthProvider', healthProviderSchema );