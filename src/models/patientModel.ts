import { Schema, model, Document } from 'mongoose';
import {Ipatient} from "../interface/Ipatient"



const patientSchema =new Schema<Ipatient>({
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
    age:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    sex:{
      type:String,
      required:true
    },
    role:{
      type:String,
      required:true,
      default:"patient",
    },
    phoneNumber:{
      type:String,
      required:true
    },
    address:{
        type:String,
        required:false
    },
    medications: [{
        drug: {
          type: String,

        },
        dosage: {
          type: String,
        },
      }],
      healthProvider: {
        type: Schema.Types.ObjectId,
        ref: 'HealthProvider', 
      },
    reminderPreferences: {
        enableReminders:{
            type:Boolean
        } ,
        reminderTime:{
            type:Date
        },
  },

});

export const patientModel = model<Ipatient>('Patient', patientSchema );