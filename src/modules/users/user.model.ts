import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { string } from "zod";



const userModel = new Schema<IUser>({
    name:String,
    email:String,
    password:String,
  

})

export const User = mongoose.model("user", userModel);
