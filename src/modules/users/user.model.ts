import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";



const userModel = new Schema<IUser>({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        enum:['User', 'Admin'],
        default:"User"
    }
  

},{timestamps:true , versionKey:false})

export const User = mongoose.model("user", userModel);
