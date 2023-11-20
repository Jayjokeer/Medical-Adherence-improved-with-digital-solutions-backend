import {Types} from "mongoose"


export interface Ihealthprovider{
    firstName:string;
    lastName : string;
    email:string;
    age:string;
    hospital:string;
    password?:string
    specialization: string;
    patients: Types.ObjectId[];
}