import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model";
import { AuthUser } from "../types/express.d";

export const roleChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

  
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser;

    req.user = decoded;

 
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error?.message,
    });
  }
};