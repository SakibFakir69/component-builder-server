import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";



const userModel = new Schema<IUser>({
    name:String,
    email:String,
    password:String,
  

},{timestamps:true , versionKey:false})

export const User = mongoose.model("user", userModel);
