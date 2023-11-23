import {Types} from "mongoose"


export interface Ihealthprovider{
    firstName:string;
    lastName : string;
    email:string;
    age:string;
    hospital:string;
    password?:string
    specialization: string;
    role:string;
    phoneNumber:string;
    address:string;
    sex:string;
    patients: Types.ObjectId[];
}