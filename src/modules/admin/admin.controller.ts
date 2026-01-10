import { Request, Response } from "express";
import { Payment } from "../payment/payment.model";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import { User } from "../users/user.model";
import mongoose from "mongoose";

// all payment, all user 

const allPayment = async(req:Request , res:Response)=>{

    try {

        const allPayment = await Payment.find({});
        console.log(allPayment , "payment")

        return ReturnResponse(res , 200, 'Payment retrive successfull', allPayment);
        
    } catch (error) {
        console.log(error)
    }

}
const allUser =async (req:Request, res:Response)=>{

    try {

        const allUser = await User.find({});

        return ReturnResponse(res, 200, ' all user retrive sucessfull',allUser);
        
    } catch (error) {
        console.log(error)
        
    }

}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ReturnResponse(res, 400, "Invalid user ID");
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return ReturnResponse(res, 404, "User not found");
        }

        // Delete all payments associated with this user
        await Payment.deleteMany({ userId: id });

        return ReturnResponse(res, 200, "User and their payments deleted successfully");
    } catch (error) {
        console.error(error);
        return ReturnResponse(res, 500, "Failed to delete user");
    }
}
export const adminController = {
    allPayment, allUser,deleteUser
}