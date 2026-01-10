import { Types } from "mongoose";



export interface IPayment {
    planName:string,
    isActive:boolean,
    userId:Types.ObjectId,
    price:string,
    timeCountDown:string,
    expiresAt:Date,
      
    purchasedAt?: Date;


}