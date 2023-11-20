import bcrypt from "bcryptjs"

export const encryptPassword = async(password:string)=>{
    return await bcrypt.hash(password,10)
}

export const verifyPassword = async(password1:string,password2:string)=>{
    return await bcrypt.compare(password1,password2)
}