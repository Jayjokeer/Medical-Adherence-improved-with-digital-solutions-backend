import {Request, NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interface/IaunthenticatedUser"


const Jwt_secret = process.env.JWT_SECRET as string;

export const signedUser=async(user:object)=>{
   return await jwt.sign(user,Jwt_secret);
};

 const verifyJwt = async(token:string)=>{
    return jwt.verify(token,Jwt_secret)
};

export const isUser = async(
    req: AuthenticatedRequest ,
    res:Response,
    next:NextFunction
)=>{
    try{
        const headers = req.headers.authorization
        if(!headers){
            return "No token please login";
        };
        const headerToken = headers.split(" ")[1];
        const token  = await verifyJwt(headerToken);
        if(!token){
            return  "Token expired";
        };

        req.user = token 
        next()

    }catch(error){
        return res.status(500).json({
            error:error
        })
    };
};