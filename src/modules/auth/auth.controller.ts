import { Request, Response } from "express"
import { User } from "../users/user.model"
import { ReturnResponse } from "../../helper/helper.returnresponse";
import jwt from "jsonwebtoken";



const loginUser =async (req:Request, res:Response)=>{
    const {email}=req.body;

    const isUserExits = await User.findOne({email:email});


    if(!isUserExits)
    {
        return ReturnResponse(res, 400, 'User not founded');
    };

    const payload = {
        id:isUserExits.id,
        email:isUserExits?.email
    }

    const accessToken = jwt.sign(payload,'secrect-key',{
        expiresIn:"5d"
    })
    const refreshToken = jwt.sign(payload, 'refresh-key',{
        expiresIn:"30d"

    })

    const user = {
        data:isUserExits,
        accessToken:accessToken,
        refreshToken:refreshToken
    }

    return ReturnResponse(res, 200, 'User login successfully', user);




}



export const authController = {


    loginUser

}