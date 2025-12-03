import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import bcrypt from "bcrypt";
import { userValidation } from "./user.validation";
import { User } from "./user.model";
import { IUser } from "./user.interface";

// create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
// zod validation 
    const userData=userValidation.safeParse(req.body);
    if(!userData?.success)
    {
        return ReturnResponse(res, 404 , ' please fill the form');
    }

    let {name, password ,email} = userData?.data;    

    const isUserExits =await User.findOne({email:email});
    if(isUserExits){
        return ReturnResponse(res, 400, 'User is Exits')
    }
    console.log(isUserExits);

    if (!password || !name || !email) {
      return ReturnResponse(res, 400, "please fill up form");
    }
    const saltRound = parseInt( process.env.SLAT_ROUND  || "10",10 ) as  number;

    password =await bcrypt.hash(password, saltRound || 10);
    
    const payload:Partial<IUser>={
        name:name,
        email:email,
        password:password
    }
    console.log(payload);



    const result = await userServices.createUser(payload);

    return ReturnResponse(res, 201, "User Created SuccessFully", result);
  } catch (error) {
    next(error); // handle global error
  }
};
/// update user

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

// delete
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// export
export const userController = {
  createUser,
  updateUser,
  deleteUser,
};
