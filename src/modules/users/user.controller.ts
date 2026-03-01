import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import bcrypt from "bcrypt";
import { userValidation } from "./user.validation";
import { User } from "./user.model";
import { IUser } from "./user.interface";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate input
    const userData = userValidation.safeParse(req.body);
    console.log(userData)
    if (!userData.success) {
      return ReturnResponse(res, 400, "Please fill the form correctly");
    }

    const { name, email, password ,role} = userData.data;

    // Check if user exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return ReturnResponse(res, 400, "User already exists");
    }

    // Hash password
    const saltRounds = parseInt(process.env.SALT_ROUND || "10", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create payload
    const payload: Partial<IUser> = {
      name,
      email,
      password: hashedPassword,
      role

    };

    // Save user
    const result = await userServices.createUser(payload);

    return ReturnResponse(res, 201, "User created successfully", result);
  } catch (error) {
    next(error);
  }
};

// Delete logged-in user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const  userId = (req as any).user?.id;

    if (!userId) return ReturnResponse(res, 401, "Unauthorized");

    const result = await User.findByIdAndDelete(userId);
    if (!result) return ReturnResponse(res, 404, "User not found");

    return ReturnResponse(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Export controller
export const userController = {
  createUser,
  deleteUser,
};
